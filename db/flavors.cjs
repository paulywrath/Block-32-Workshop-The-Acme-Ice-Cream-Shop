const client = require('./client.cjs')

const createFlavor = async(name, is_favorite) => {
  try {
    await client.query (`
      INSERT INTO flavors (name, is_favorite)
      VALUES ('${name}', '${is_favorite}');
    `);
  } catch(e) {
    console.log(e);
  }
}

const getFlavors = async() => {
  try {
    const { rows } = await client.query (`SELECT * FROM flavors;`);
    return rows;
  } catch(e) {
    console.log(e);
  }
}

module.exports = { createFlavor, getFlavors }