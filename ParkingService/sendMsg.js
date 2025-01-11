require('dotenv').config();
const amqp = require('amqplib');

const rabbitmqHost = process.env.RABBITMQ_HOST || 'amqp://localhost';

async function cleanExpiredEntries() {
  try {
    const connection = await amqp.connect(rabbitmqHost);
    const channel = await connection.createChannel();
    const queue = 'ended.parking';

    await channel.assertQueue(queue, { durable: true });

    // Create a structured JSON message
    const message = {
      id: "12345",                // Unique identifier for the parking event
      status: "ended",            // Event status
      timestamp: new Date().toISOString(), // ISO 8601 timestamp
      additionalInfo: {
        reason: "Time expired",   // Example of additional metadata
        location: "Lot A"         // Example of parking lot information
      }
    };

    // Send the message as a stringified JSON object
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(" [x] Sent message:", message);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

cleanExpiredEntries();