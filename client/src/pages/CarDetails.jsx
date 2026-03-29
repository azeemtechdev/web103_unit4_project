import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import '../App.css'
import { getCar, deleteCar } from '../services/carsService'
import { formatPrice } from '../utilities/priceUtils'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCar(id)
        setCar(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Confirm delete this item?')) return
    try {
      await deleteCar(id)
      navigate('/customcars')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <main className='page'><p>Loading car...</p></main>

  if (error) return <main className='page'><p className='error'>{error}</p></main>

  if (!car) return <main className='page'><p>Car not found.</p></main>

  return (
    <main className='page'>
      <article className='card'>
        <h2>{car.name}</h2>
        <p>Exterior: {car.options.exterior}</p>
        <p>Wheels: {car.options.wheels}</p>
        <p>Interior: {car.options.interior}</p>
        <p>Price: {formatPrice(car.price)}</p>
        <p>Created at: {new Date(car.created_at).toLocaleString()}</p>

        <div className='button-group'>
          <Link to={`/edit/${car.id}`} className='button secondary'>Edit</Link>
          <button onClick={handleDelete} className='button danger'>Delete</button>
          <Link to='/customcars' className='button'>Back</Link>
        </div>
      </article>
    </main>
  )
}

export default CarDetails