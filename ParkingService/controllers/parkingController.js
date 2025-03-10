const Parking = require('../models/Parking');

exports.addParking = async (request, result) => {
  const { parkplaceID, carRegistration, duration, price } = request.body;
  email = request.user.email

  try {
    if (await Parking.findOne({ email })) {
      console.log('Parking failed')
      return result.status(400).json({ message: 'This user is already parked somewhere' });
    }

    if (await Parking.findOne({ carRegistration })) {
      console.log('Parking failed')
      return result.status(400).json({ message: 'This car is already parked somewhere' });
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60000)

    const new_parking = new Parking({ parkplaceID, email, carRegistration, duration, startTime, endTime, price });
    await new_parking.save();

    console.log('New parkig session created successfully')
    result.status(201).json({ message: 'New parkig session created successfully' });
  } catch (err) {
    console.log('Server error')
    result.status(500).json({ message: 'Server error:', error: err });
  }
};

exports.updateParking = async (request, result) => {
  const { duration } = request.body;
  email = request.user.email

  try {
    const parkingEntry = await Parking.findOne({ email });

    //console.log('First part');
    if (!parkingEntry) {
      console.log('Parking update failed: No parking session found for this email');
      return result.status(404).json({ message: 'No parking session found for this email' });
    }

    //console.log('Second part');
    const currentTime = new Date();
    //console.log('Time part');
    const newEndTime = new Date(currentTime.getTime() + duration * 60000);

    if (newEndTime <= currentTime) {
      console.log('Parking update failed: New end time cannot be in the past');
      return result.status(400).json({ message: 'New end time cannot be in the past' });
    }

    //console.log('Third part');
    parkingEntry.duration = duration;
    parkingEntry.endTime = newEndTime;
    await parkingEntry.save();

    console.log('Parking session updated successfully');
    result.status(200).json({ message: 'Parking session updated successfully' });
  } catch (err) {
    console.log('Server error');
    result.status(500).json({ message: 'Server error:', error: err });
  }
};

exports.getParking = async (request, result) => {
  //const { email } = request.body;
  email = request.user.email

  try {
    const parkingEntry = await Parking.findOne({ email });

    if (!parkingEntry) {
      console.log('No parking session found for this email');
      return result.status(404).json({ message: 'No parking session found for this email' });
    }

    console.log('Parking session found successfully');
    return result.status(200).json(parkingEntry);
  } catch (err) {
    console.log('Server error');
    result.status(500).json({ message: 'Server error:', error: err });
  }
};

exports.concludeParking = async (request, result) => {
  const email = request.user.email;

  try {
    const parkingEntry = await Parking.findOne({ email });

    if (!parkingEntry) {
      console.log('No parking session found for email:', email);
      return result.status(404).json({ message: 'Parking session not found' });
    }

    const expiredEntries = [parkingEntry]

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

    const deletedParking = await Parking.findOneAndDelete({ email });

    if (!deletedParking) {
      return result.status(404).json({ message: 'Parking session not found' });
    }

    return result.status(200).json({ message: 'Parking session deleted successfully', deletedParking });
  } catch (err) {
    result.status(500).json({ message: 'Server error', error: err });
  }
};
