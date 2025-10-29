// backend/config/rabbitmq.js
const amqp = require('amqplib');

const QUEUE_NAME = 'notification_queue';
const RABBITMQ_URI = process.env.RABBITMQ_URI || 'amqp://rabbitmq';

let channel = null; // Biến để giữ channel kết nối

// Hàm kết nối chính, có retry logic
const connectRabbitMQ = async () => {
  let attempt = 0;
  const maxAttempts = 10;
  const retryDelay = 5000; // 5 giây

  while (attempt < maxAttempts) {
    try {
      console.log('[BACKEND] Attempting to connect to RabbitMQ...');
      const connection = await amqp.connect(RABBITMQ_URI);
      channel = await connection.createChannel(); // Gán vào biến channel toàn cục
      
      await channel.assertQueue(QUEUE_NAME, { durable: true });
      
      console.log('[BACKEND] RabbitMQ Connected successfully.');

      connection.on('error', (err) => {
        console.error('[BACKEND] RabbitMQ connection error:', err.message);
        channel = null; // Reset channel
      });
      connection.on('close', () => {
        console.error('[BACKEND] RabbitMQ connection closed. Attempting to reconnect...');
        channel = null; // Reset channel
        setTimeout(connectRabbitMQ, retryDelay); // Cố gắng kết nối lại
      });

      return; // Kết nối thành công, thoát khỏi vòng lặp
    } catch (error) {
      attempt++;
      console.error(`[BACKEND] RabbitMQ connection failed. Attempt ${attempt} of ${maxAttempts}. Retrying in ${retryDelay / 1000}s...`);
      if (attempt >= maxAttempts) {
        throw new Error('Could not connect to RabbitMQ after multiple attempts.');
      }
      // Chờ trước khi thử lại
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// Hàm publish, bây giờ sẽ kiểm tra channel trước khi gửi
const publishToQueue = (data) => {
  if (channel) {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), { persistent: true });
  } else {
    // Ném lỗi để controller có thể log lại
    throw new Error('RabbitMQ channel is not available.');
  }
};

module.exports = { connectRabbitMQ, publishToQueue };