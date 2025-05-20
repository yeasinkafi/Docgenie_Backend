const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

function createToken(user) {
  return jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }, JWT_SECRET, { expiresIn: '7d' });
}

module.exports = function setupAuthRoutes(app, Users) {
  router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const existing = await Users.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hash, role };
    const result = await Users.insertOne(newUser);
    const token = createToken({ ...newUser, _id: result.insertedId });
    res.status(201).json({ token, role });
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = createToken(user);
    res.status(200).json({ token, role: user.role });
  });

  app.use('/api/auth', router);
}