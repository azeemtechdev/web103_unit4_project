import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { getAllCars, deleteCar } from '../services/carsService'
import { formatPrice } from '../utilities/priceUtils'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadCars = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllCars()
        console.log('ViewCars loaded data:', Array.isArray(data) ? data.length : typeof data, data)
      setCars(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this custom car?')) return
    try {
      await deleteCar(id)
      setCars((prev) => prev.filter((car) => car.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className='page'>
      <h2>My Custom Cars</h2>

      {loading && <p>Loading cars...</p>}
      {error && <p className='error'>{error}</p>}

      {!loading && cars.length === 0 && <p>No cars created yet.</p>}

      <section className='car-grid'>
        {cars.map((car) => (
          <article key={car.id} className='card'>
            <h3>🚗 {car.name}</h3>
            <div className='content-row'>
              <div className='left-col'>
                <p>🖌️ <strong>Exterior:</strong> {car.options.exterior}</p>
                <p>🛞 <strong>Wheels:</strong> {car.options.wheels}</p>
                <p>💺 <strong>Interior:</strong> {car.options.interior}</p>
              </div>

              <div className='right-col'>
                <div className='price'>💰 {formatPrice(car.price)}</div>
                <div className='button-group'>
                  <Link to={`/customcars/${car.id}`} className='button'>DETAILS</Link>
                  <Link to={`/edit/${car.id}`} className='button secondary'>EDIT</Link>
                  <button onClick={() => handleDelete(car.id)} className='button danger'>DELETE</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default ViewCars