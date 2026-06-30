const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // Load root .env file

const pool = new Pool({
  user: process.env.DB_USER || 'ashokraj',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'rule_engine_db',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Setup database tables if not existing
const initDb = async () => {
  const client = await pool.connect();
  try {
    console.log('PostgreSQL connection pool initialized.');

    // Rules table
    await client.query(`
      CREATE TABLE IF NOT EXISTS rules (
        id SERIAL PRIMARY KEY,
        rule_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        team VARCHAR(255),
        terms JSONB,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Glossary table
    await client.query(`
      CREATE TABLE IF NOT EXISTS glossary (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        entity VARCHAR(255) NOT NULL,
        description TEXT,
        datasource VARCHAR(100) NOT NULL,
        business_key VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (name, entity)
      );
    `);

    console.log('PostgreSQL schema migration completed successfully.');
  } catch (err) {
    console.error('Error migrating PostgreSQL schema:', err.message);
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  initDb
};
