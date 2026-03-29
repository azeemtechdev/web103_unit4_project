import { pool } from '../config/database.js'

export const getAllCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_items ORDER BY id DESC')
    res.json(result.rows)
  } catch (error) {
    console.error('getAllCars error', error)
    res.status(500).json({ error: 'Unable to fetch cars' })
  }
}

export const getCarById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('getCarById error', error)
    res.status(500).json({ error: 'Unable to fetch car' })
  }
}

export const createCar = async (req, res) => {
  const { name, options, price } = req.body

  if (!name || !options || price == null) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      'INSERT INTO custom_items (name, options, price) VALUES ($1, $2, $3) RETURNING *',
      [name, options, price]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('createCar error', error)
    res.status(500).json({ error: 'Unable to create car' })
  }
}

export const updateCar = async (req, res) => {
  const { id } = req.params
  const { name, options, price } = req.body

  if (!name || !options || price == null) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      'UPDATE custom_items SET name=$1, options=$2, price=$3 WHERE id=$4 RETURNING *',
      [name, options, price, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('updateCar error', error)
    res.status(500).json({ error: 'Unable to update car' })
  }
}

export const deleteCar = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query('DELETE FROM custom_items WHERE id=$1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json({ message: 'Car deleted' })
  } catch (error) {
    console.error('deleteCar error', error)
    res.status(500).json({ error: 'Unable to delete car' })
  }
}
