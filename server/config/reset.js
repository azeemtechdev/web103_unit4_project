import dotenv from 'dotenv'
import { pool } from './database.js'

dotenv.config()

const createSchema = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS custom_items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        options JSONB NOT NULL,
        price NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('Database schema created/ensured')
  } catch (error) {
    console.error('Error creating schema', error)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

createSchema()
