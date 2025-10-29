require('dotenv').config();
const amqp = require('amqplib');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// --- 1. CONFIGURATION ---
const QUEUE_NAME = 'notification_queue';
const RABBITMQ_URI = process.env.RABBITMQ_URI || 'amqp://rabbitmq';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/p2p_rental';

// Khai báo User model ở phạm vi toàn cục
let User;

// --- 2. DATABASE & SERVICES CONNECTION ---
const connectDB = async () => {
  // Nếu đã kết nối thì không cần kết nối lại
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[WORKER] MongoDB Connected...');
    // Sau khi kết nối thành công, mới require model để tránh lỗi
    User = require('./User.model.js');
  } catch (err) {
    console.error('[WORKER] MongoDB connection error:', err.message);
    throw err; // Ném lỗi để logic retry ở startWorker bắt được
  }
};

// Cấu hình Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 3. NOTIFICATION LOGIC ---
const sendNotification = async (data) => {
  if (!User) {
    console.error('[WORKER] User model is not initialized. Cannot process task.');
    throw new Error('User model not available. Requeuing task.');
  }

  try {
    if (data.task === 'new_rental_request') {
      console.log(`[WORKER] Received task: ${data.task} for rental ${data.rentalId}`);
      
      const owner = await User.findById(data.ownerId).lean();
      if (!owner) {
        console.error(`[WORKER] Owner with ID ${data.ownerId} not found. Task cannot be completed.`);
        return; // Không tìm thấy user, message sẽ được ack và không xử lý lại
      }

      const mailOptions = {
        from: `"P2P Rental" <${process.env.EMAIL_USER}>`,
        to: owner.email,
        subject: 'Bạn có một yêu cầu thuê mới!',
        html: `
          <h3>Xin chào ${owner.fullName},</h3>
          <p>Bạn vừa nhận được một yêu cầu thuê mới cho một trong các vật phẩm của mình.</p>
          <p>Vui lòng đăng nhập vào hệ thống để xem chi tiết và xác nhận yêu cầu.</p>
          <p>Mã đơn thuê: ${data.rentalId}</p>
          <br>
          <p>Trân trọng,</p>
          <p>Đội ngũ P2P Rental.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[WORKER] >>> Email sent successfully to ${owner.email}`);

    } else if (data.task === 'rental_status_changed') {
      console.log(`[WORKER] Received task: ${data.task}. Status: ${data.status} for rental ${data.rentalId}`);
      // Nâng cao: Tương tự, tìm email của renter và gửi thông báo trạng thái
    } else {
      console.warn(`[WORKER] Received unknown task: ${data.task}`);
    }
  } catch (error) {
    console.error('[WORKER] Error sending notification:', error.message);
    throw error; // Ném lỗi để message được nack và xử lý lại
  }
};

// --- 4. RABBITMQ CONSUMER LOGIC ---
const startWorker = async () => {
  try {
    await connectDB();
    const connection = await amqp.connect(RABBITMQ_URI);
    const channel = await connection.createChannel();

    connection.on("error", (err) => {
      console.error("[WORKER] RabbitMQ connection error", err.message);
      // Dừng tiến trình để Docker/orchestrator có thể khởi động lại
      process.exit(1); 
    });
    connection.on("close", () => {
      console.error("[WORKER] RabbitMQ connection closed. Attempting to reconnect...");
      setTimeout(startWorker, 5000);
    });

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`[WORKER] Waiting for messages in queue: "${QUEUE_NAME}".`);
    channel.prefetch(1);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        try {
          const data = JSON.parse(msg.content.toString());
          await sendNotification(data);
          channel.ack(msg); // Xác nhận đã xử lý xong
        } catch (e) {
          console.error('[WORKER] Failed to process message. It will be returned to the queue.', e.message);
          // Trả message về lại queue để thử lại sau một khoảng thời gian
          setTimeout(() => channel.nack(msg, false, true), 3000); 
        }
      }
    });

  } catch (error) {
    console.error('[WORKER] Failed to start worker:', error.message);
    console.log('[WORKER] Retrying in 5 seconds...');
    setTimeout(startWorker, 5000);
  }
};

startWorker();