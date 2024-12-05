const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

exports.registerUser = async (request, result) => {
    const { username, email, password } = request.body;
  
    try {
      if (await User.findOne({ email })) {
        return result.status(400).json({ message: 'This email is already in use' });
      }

      const new_user = new User({ username, password, email });
      await new_user.save();
  
      result.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        result.status(500).json({ message: 'Server error:', error: err });
    }
}; 

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'This user does not exist' });
    }

    const matchingPass = await user.comparePassword(password);
    if (!matchingPass) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const jwtoken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', jwtoken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};