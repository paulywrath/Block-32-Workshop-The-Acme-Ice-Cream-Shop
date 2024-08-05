const client = require('./db/client.cjs');
const express = require('express');
const app = express();
const { getFlavors, getSpecificFlavor, deleteSpecificFlavor } = require('./db/flavors.cjs');

client.connect();

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


const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));