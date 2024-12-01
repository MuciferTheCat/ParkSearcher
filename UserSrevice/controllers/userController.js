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