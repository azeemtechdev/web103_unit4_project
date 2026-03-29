import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import { getCar, updateCar } from '../services/carsService'
import { calculatePrice, formatPrice } from '../utilities/priceUtils'
import { getValidationError } from '../utilities/validationUtils'

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [exterior, setExterior] = useState('red')
  const [wheels, setWheels] = useState('standard')
  const [interior, setInterior] = useState('cloth')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const car = await getCar(id)
        setName(car.name || '')
        setExterior(car.options.exterior || 'red')
        setWheels(car.options.wheels || 'standard')
        setInterior(car.options.interior || 'cloth')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const options = useMemo(() => ({ exterior, wheels, interior }), [exterior, wheels, interior])
  const price = calculatePrice(options)
  const validationError = getValidationError(options)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setError('Name is required')
      return
    }
    if (validationError) {
      setError(validationError)
      return
    }

    setSaving(true)
    setError('')
    try {
      await updateCar(id, { name: name.trim(), options, price })
      navigate(`/customcars/${id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <main className='page'><p>Loading car...</p></main>
  }

  return (
    <main className='page'>
      <h2>Edit Custom Car</h2>
      <form onSubmit={handleSubmit} className='card'>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Exterior Color
          <select value={exterior} onChange={(e) => setExterior(e.target.value)}>
            <option value='red'>Red (+$250)</option>
            <option value='blue'>Blue (+$200)</option>
            <option value='black'>Black (+$220)</option>
            <option value='white'>White (+$180)</option>
          </select>
        </label>

        <label>
          Wheel Style
          <select value={wheels} onChange={(e) => setWheels(e.target.value)}>
            <option value='standard'>Standard (+$0)</option>
            <option value='sport'>Sport (+$350)</option>
            <option value='premium'>Premium (+$600)</option>
          </select>
        </label>

        <label>
          Interior
          <select value={interior} onChange={(e) => setInterior(e.target.value)}>
            <option value='cloth'>Cloth (+$0)</option>
            <option value='leather'>Leather (+$400)</option>
            <option value='vegan'>Vegan (+$500)</option>
          </select>
        </label>

        <section className='card'>
          <h3>Preview</h3>
          <p>Exterior: {exterior}</p>
          <p>Wheels: {wheels}</p>
          <p>Interior: {interior}</p>
          <p>Total price: {formatPrice(price)}</p>
        </section>

        {validationError && <div className='warning'>{validationError}</div>}
        {error && <div className='error'>{error}</div>}

        <button type='submit' disabled={saving || Boolean(validationError)}>
          {saving ? 'Updating...' : 'Update Custom Car'}
        </button>
      </form>
    </main>
  )
}

export default EditCar