const client = require('./client.cjs')

const createFlavor = async(name, is_favorite) => {
  try {
    const { rows } = await client.query (`
      INSERT INTO flavors (name, is_favorite)
      VALUES ('${name}', '${is_favorite}')
      RETURNING *;
    `);
    return rows;
  } catch(e) {
     return e;
  }
}

const updateFlavor = async(id, name, is_favorite) => {
  try {
    const { rows } = await client.query (`
      UPDATE flavors
      SET name='${name}', is_favorite='${is_favorite}', updated_at=CURRENT_TIMESTAMP
      WHERE id=${id}
      RETURNING *;
    `);
    return rows;
  } catch(e) {
     return e;
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

const getSpecificFlavor = async(id) => {
  try {
    const { rows } = await client.query (`SELECT * FROM flavors WHERE id=${id}`);
    return rows;
  } catch(e) {
    console.log(e);
  }
}

const deleteSpecificFlavor = async(id) => {
  try {
    await client.query (`DELETE FROM flavors WHERE id=${id}`);
  } catch(e) {
    console.log(e);
  }
}

module.exports = { createFlavor, getFlavors, getSpecificFlavor, deleteSpecificFlavor, updateFlavor }