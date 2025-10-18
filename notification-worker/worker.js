// notification-worker/worker.js
require('dotenv').config();
const amqp = require('amqplib');

const QUEUE_NAME = 'notification_queue';

// Hàm mô phỏng gửi email
const sendNotification = (data) => {
  console.log(`[WORKER] Received task: ${data.task}`);
  console.log(`[WORKER] >>> Simulating sending email for Rental ${data.rentalId}...`);
  console.log(`[WORKER] >>> Status: ${data.status}.`);
  // (Trong dự án thực tế, bạn sẽ dùng Nodemailer hoặc SendGrid ở đây)
  console.log(`[WORKER] Done.`);
};

const connectAndConsume = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`[WORKER] Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

    channel.prefetch(1); // Chỉ xử lý 1 message một lúc

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        try {
          const data = JSON.parse(msg.content.toString());
          sendNotification(data);
          // Xác nhận đã xử lý xong message
          channel.ack(msg);
        } catch (e) {
          console.error('[WORKER] Error processing message:', e.message);
          // Gửi trả message về queue nếu xử lý lỗi
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error('[WORKER] Failed to connect to RabbitMQ:', error.message);
    // Thử kết nối lại sau 5 giây
    setTimeout(connectAndConsume, 5000);
  }
};

connectAndConsume();