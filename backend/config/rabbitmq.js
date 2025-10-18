// backend/config/rabbitmq.js
const amqp = require('amqplib');

let channel = null;
const QUEUE_NAME = 'notification_queue'; // Tên hàng đợi

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('RabbitMQ connected and channel created.');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
    // Thử kết nối lại sau 5 giây
    setTimeout(connectRabbitMQ, 5000);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel is not available.');
  }
  return channel;
};

// Hàm gửi message
const publishToQueue = (data) => {
  try {
    const channel = getChannel();
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), { persistent: true });
    console.log(`[x] Sent message to ${QUEUE_NAME}:`, data);
  } catch (error) {
    console.error('Failed to publish message:', error.message);
  }
};

module.exports = {
  connectRabbitMQ,
  publishToQueue,
  QUEUE_NAME
};