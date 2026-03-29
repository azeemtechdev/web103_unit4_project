import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Use env variable to disable SSL (useful for local dev)
const sslOption = process.env.PGSSLMODE === 'disable'
  ? false
  : process.env.PGHOST && process.env.PGHOST.includes('render.com')
    ? { rejectUnauthorized: false }
    : false

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: sslOption
}

export const pool = new pg.Pool(config)