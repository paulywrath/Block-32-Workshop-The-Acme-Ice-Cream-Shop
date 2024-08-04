const client = require('./client.cjs');

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
        is_favorite BOOLEAN,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
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

  await client.end();
  console.log(`disconnected`);
}

syncAndSeed();