const User = require('../models/User');
const jwt = require('jsonwebtoken');
const amqp = require('amqplib');
const JWT_SECRET = 'your_jwt_secret_key';

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'This email is already in use' });
      }

      const new_user = new User({ username, password, email });
      await new_user.save();
  
      res.status(201).json({ message: 'User registered successfully' });

      try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'user.registered';

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(new_user)));

        console.log(" [x] Sent %s", JSON.stringify(new_user));
        await channel.close();
        await connection.close();
      } catch (error) {
          console.error('Error sending message:', error);
      }

    } catch (err) {
      res.status(500).json({ message: 'Server error:', error: err });
    }
}; 

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('The user does not exist')
      return res.status(400).json({ message: 'This user does not exist' });
    }

    const matchingPass = await user.comparePassword(password);
    if (!matchingPass) {
      console.log('The provided password is invalid')
      return res.status(400).json({ message: 'Invalid password' });
    }

    const jwtoken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    console.log('Login was succesful')
    res.status(200).json({ message: 'Login successful', jwtoken });
  } catch (err) {
    console.log('Server error')
    res.status(500).json({ message: 'Server error', error: err });
  }
};