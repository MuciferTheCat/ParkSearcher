const amqp = require('amqplib');
const connectDB = require('./config/db');
const Payment = require('./models/Payment'); // Correct model name

const rabbitmqHost = process.env.RABBITMQ_HOST || 'amqp://localhost';

async function listenForUserEvents() {
    try {
        const connection = await amqp.connect(rabbitmqHost);
        const channel = await connection.createChannel();
        const queue = 'ended.parking';

        await channel.assertQueue(queue, { durable: true });
        console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                try {
                    const receivedMessages = JSON.parse(msg.content.toString());
                    console.log(" [x] Received %s", JSON.stringify(receivedMessages));

                    await connectDB();

                    const paymentEntries = receivedMessages.map(entry => {
                        const amount = (entry.price / 60) * entry.duration;
                        return {
                            email: entry.email,
                            amount: amount,
                            isActive: amount > 0,
                        };
                    });

                    const insertedPayments = await Payment.insertMany(paymentEntries);
                    console.log('Payments added successfully:', insertedPayments);

                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            }
        });
    } catch (error) {
        console.error('Error setting up RabbitMQ listener:', error);
    }
}

listenForUserEvents();
