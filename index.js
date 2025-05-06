const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

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

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}
app.get('/Admin', async (req, res) => {
    try {
      const result = await Admin.find().toArray();
      res.status(200).send(result);
    } catch (err) {
      console.error("Admin fetch error:", err.message);
      res.status(500).send({ error: err.message });
    }
  });
  
run().catch(console.dir);

// 🔄 Generic CRUD functions
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

// 📌 Set up routes for each collection
setupRoutes("Admin", Admin);
setupRoutes("Appointments", Appointments);
setupRoutes("Doctors", Doctors);
setupRoutes("Medical", Medical);
setupRoutes("Patient", Patient);

// Root
app.get('/', (req, res) => {
  res.send("Welcome to DocGenie API 🚀");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
