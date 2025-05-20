const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const setupAuthRoutes = require("./routes/authRoutes");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// MongoDB URI
const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.3wzdkzd.mongodb.net/DocGenie_DB?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Declare collections
let db, Admin, Appointments, Doctors, Medical, Patient;

// Generic CRUD setup function
function setupRoutes(name, collection) {
  // GET all
  app.get(`/${name}`, async (req, res) => {
    try {
      const data = await collection.find().toArray();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ error: `Error fetching ${name} data` });
    }
  });

  // POST (create new)
  app.post(`/${name}`, async (req, res) => {
    try {
      const result = await collection.insertOne(req.body);
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send({ error: `Error inserting into ${name}` });
    }
  });

  // PUT (update by ID)
  app.put(`/${name}/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const updateDoc = {
        $set: req.body
      };
      const result = await collection.updateOne({ _id: new ObjectId(id) }, updateDoc);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ error: `Error updating ${name}` });
    }
  });

  // DELETE (delete by ID)
  app.delete(`/${name}/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ error: `Error deleting from ${name}` });
    }
  });
}

// Main function to connect to MongoDB and start routes
async function run() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }

    db = client.db('DocGenie_DB');
    Admin = db.collection('Admin');
    Appointments = db.collection('Appointments');
    Doctors = db.collection('Doctors');
    Medical = db.collection('Medical');
    Patient = db.collection('Patient');

    console.log("✅ Connected to MongoDB");

    // Set up auth routes (after Patient is defined)
    setupAuthRoutes(app, Patient);

    // Set up CRUD routes
    setupRoutes("Admin", Admin);
    setupRoutes("Appointments", Appointments);
    setupRoutes("Doctors", Doctors);
    setupRoutes("Medical", Medical);
    setupRoutes("Patient", Patient);

    // Custom route: Book appointment with validation
    app.post('/Appointments/book', async (req, res) => {
      const { doctorId, patientId, date, time, reason } = req.body;

      if (!doctorId || !patientId || !date || !time) {
        return res.status(400).send({ error: "Missing required fields" });
      }

      const appointment = {
        doctorId: new ObjectId(doctorId),
        patientId: new ObjectId(patientId),
        date,
        time,
        reason,
        status: 'Pending'
      };

      try {
        const result = await Appointments.insertOne(appointment);
        res.status(201).send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to book appointment" });
      }
    });

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send("Welcome to DocGenie API 🚀");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
