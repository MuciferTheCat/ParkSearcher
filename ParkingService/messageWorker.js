// messageWorker.js
const amqp = require('amqplib');

const rabbitmqHost = process.env.RABBITMQ_HOST || 'amqp://localhost';

console.log(rabbitmqHost)

async function listenForUserEvents() {
    try {
        const connection = await amqp.connect(rabbitmqHost);
        const channel = await connection.createChannel();
        const queue = 'user.registered';
        //const queue = 'parking.ended';

        await channel.assertQueue(queue, { durable: true });
        console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const user = JSON.parse(msg.content.toString());
                console.log(" [x] Received %s", JSON.stringify(user));

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error receiving message:', error);
    }
}

listenForUserEvents();
