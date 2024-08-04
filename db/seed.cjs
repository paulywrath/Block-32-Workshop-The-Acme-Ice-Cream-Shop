const client = require('./client.cjs');
const { createFlavor } = require('./flavors.cjs');

const dropTables = async() => {
  try {
    await client.query(`DROP TABLE IF EXISTS flavors;`)
  } catch(e) {
    console.log(e);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE flavors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL UNIQUE,
        is_favorite BOOLEAN NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      );
    `)
  } catch(e) {
    console.log(e);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log(`connected`);

  await dropTables();
  console.log(`dropped tables`);

  await createTables();
  console.log(`created tables`);

  await createFlavor(`chocolate`, true);
  console.log(`created first flavor`);

  await createFlavor(`vanilla`, false);
  console.log(`created second flavor`);

  await client.end();
  console.log(`disconnected`);
}

syncAndSeed();