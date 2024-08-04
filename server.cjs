const client = require('./db/client.cjs');
const express = require('express');
const app = express();
const { getFlavors } = require('./db/flavors.cjs');

client.connect();

app.get('/api/v1/flavors', async(req, res, next) => {
  try {
    const flavors = await getFlavors();
    res.send(flavors);
  } catch(e) {
    console.log(e);
  }
})


const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));