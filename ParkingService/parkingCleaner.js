require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const amqp = require('amqplib');

const rabbitmqHost = process.env.RABBITMQ_HOST || 'amqp://localhost';

async function cleanExpiredEntries() {
  try {
    await connectDB();

    console.log(rabbitmqHost)

    const database = mongoose.connection.db;
    const collection = database.collection('parkings');

    const currentTime = new Date();

    const expiredEntries = await collection.find({ endTime: { $lte: currentTime } }).toArray();

    console.log(expiredEntries)

    if (expiredEntries.length > 0) {
      console.log(`Found ${expiredEntries.length} expired entries.`);

      for (const entry of expiredEntries) {
        const receiptData = {
          parkingId: entry._id,
          email: entry.email,
          startTime: entry.startTime,
          endTime: entry.endTime,
          price: entry.price,
          duration: Math.ceil((new Date(entry.endTime) - new Date(entry.startTime)) / (1000 * 60)) // Duration in minutes
        };

        console.log('Sending receipt data to payment microservice:', receiptData);

        try {
          const connection = await amqp.connect(rabbitmqHost);
          const channel = await connection.createChannel();
          const queue = 'ended.parking';
  
          await channel.assertQueue(queue, { durable: true });
          channel.sendToQueue(queue, Buffer.from(JSON.stringify(receiptData)));
  
          console.log(" [x] Sent %s", JSON.stringify(receiptData));
          await channel.close();
          await connection.close();
        } catch (error) {
            console.error('Error sending message:', error);
        }
      }

      const result = await collection.deleteMany({ endTime: { $lte: currentTime } });
      console.log(`Deleted ${result.deletedCount} expired entries.`);
    } else {
      console.log('No expired entries found.');
    }
  } catch (error) {
    console.error('Error cleaning expired entries:', error);
  } finally {
    mongoose.connection.close();
  }
}

cleanExpiredEntries();
