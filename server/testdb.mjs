import { pool } from './config/database.js'
try {
  const r = await pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = $1', ['public'])
  console.log('tables:', r.rows.map(r=>r.table_name).join(', '))
  const c = await pool.query('SELECT * FROM custom_items LIMIT 1')
  console.log('custom_items rows', c.rows.length)
} catch (e) {
  console.error('db error', e)
} finally {
  await pool.end()
}
