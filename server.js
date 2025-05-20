const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const setupRoutes = require('./genericRoutes');
const setupAuthRoutes = require('./authRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@docgenie.hqiovos.mongodb.net/?retryWrites=true&w=majority&tls=true`;


if (!uri) {
  console.error('❌ Missing MONGODB_URI in environment variables');
  process.exit(1);
}

const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true, // ⚠ Use for debugging only
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true},
});

async function run() {
  try {
    await client.connect();
    const db = client.db('DocGenie');

    const Admin = db.collection('Admin');
    const Appointments = db.collection('Appointments');
    const Doctors = db.collection('Doctors');
    const Medical = db.collection('Medical');
    const Patient = db.collection('Patient');
    const Users = db.collection('Users');

    setupAuthRoutes(app, Users);
    setupRoutes(app, 'Admin', Admin);
    setupRoutes(app, 'Appointments', Appointments);
    setupRoutes(app, 'Doctors', Doctors);
    setupRoutes(app, 'Medical', Medical);
    setupRoutes(app, 'Patient', Patient);

    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

run().catch(console.dir);

// Serve frontend static files (if you have built frontend static export)
app.use(express.static(path.join(__dirname, '../frontend/out')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
