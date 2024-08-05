const client = require('./db/client.cjs');
const express = require('express');
const app = express();
const { getFlavors, getSpecificFlavor, deleteSpecificFlavor, createFlavor, updateFlavor } = require('./db/flavors.cjs');

client.connect();

app.use(express.json())

app.get('/api/v1/flavors', async(req, res, next) => {
  try {
    const flavors = await getFlavors();
    res.send(flavors);
  } catch(e) {
    console.log(e);
  }
})

app.get(`/api/v1/flavors/:id`, async(req, res, next) => {
  try {
    const { id } = req.params;
    const specificFlavor = await getSpecificFlavor(id);
    res.send(specificFlavor);
  } catch(e) {
    console.log(e);
  }
})

app.delete(`/api/v1/flavors/:id`, async(req, res, next) => {
  try {
    const { id } = req.params;
    await deleteSpecificFlavor(id);
  } catch(e) {
    console.log(e);
  }
})

app.post('/api/v1/flavors', async(req, res, next) => {
  try {
    const { flavorName, isFavorite } = req.body;
    const newFlavor = await createFlavor(flavorName, isFavorite);
    res.send(newFlavor);
  } catch(e) {
    next(e);
  }
})

app.put(`/api/v1/flavors/:id`, async(req, res, next) => {
  try {
    const { id } = req.params;
    const { flavorName, isFavorite } = req.body;
    const changedFlavor = await updateFlavor(id, flavorName, isFavorite);
    res.send(changedFlavor);
  } catch(e) {
    next(e);
  }
})

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));