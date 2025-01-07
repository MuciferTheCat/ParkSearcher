const User = require('../models/User');
const jwt = require('jsonwebtoken');
const amqp = require('amqplib');
//const JWT_SECRET = 'your_jwt_secret_key';
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'This email is already in use' });
      }

      var isAdmin = false
      const new_user = new User({ username, password, email, isAdmin });
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

    const jwtoken = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });

    console.log('Login was succesful')
    res.cookie('jwt', jwtoken, {httpOnly: true, maxAge: 12*60*60*1000}).status(200).json({ message: 'Login successful', jwtoken });
  } catch (err) {
    console.log('Server error')
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.makeAdmin = async (req, res) => {
  const { email } = req.body;
  caller = req.user.email
  try {
    const caller_data = await User.findOne({ email: caller });
    if (!caller_data.isAdmin) {
      return res.status(400).json({ message: 'Unauthorized: You do not have admin privileges.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    user.isAdmin = true;
    await user.save();

    console.log('User successfully made into an admin')
    res.status(201).json({ message: 'User successfully made into an admin' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
        return 'Invalid token.';
    } else if (error.name === 'TokenExpiredError') {
        return 'Token expired.';
    }

    // Generic error handling
    return `An error occurred: ${error.message}`;
}
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};