const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = function setupAuthRoutes(app, Users) {
  // Register endpoint
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { name, email, password: hashedPassword, role: role || 'patient' };
      const result = await Users.insertOne(newUser);

      const token = createToken({ ...newUser, _id: result.insertedId });
      res.status(201).json({ token, role: newUser.role });
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Login endpoint
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = createToken(user);
      res.status(200).json({ token, role: user.role });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.use('/api/auth', router);
};
