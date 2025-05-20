const { ObjectId } = require('mongodb');

function setupRoutes(app, name, collection) {
  const base = `/${name}`;

  app.get(base, async (req, res) => {
    try {
      const data = await collection.find().toArray();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ error: `Error fetching ${name}` });
    }
  });

  app.post(base, async (req, res) => {
    try {
      const result = await collection.insertOne(req.body);
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send({ error: `Error inserting into ${name}` });
    }
  });

  app.put(`${base}/:id`, async (req, res) => {
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ error: `Error updating ${name}` });
    }
  });

  app.delete(`${base}/:id`, async (req, res) => {
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ error: `Error deleting from ${name}` });
    }
  });
}

module.exports = setupRoutes;