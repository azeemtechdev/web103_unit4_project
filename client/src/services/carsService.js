const BASE_URL = '/api/cars'

const parseResponse = async (response) => {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.error || 'API request failed')
  }
  return data
}

export const getAllCars = () => fetch(BASE_URL).then(parseResponse)
export const getCar = (id) => fetch(`${BASE_URL}/${id}`).then(parseResponse)
export const createCar = (car) => fetch(BASE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(car), }).then(parseResponse)
export const updateCar = (id, car) => fetch(`${BASE_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(car), }).then(parseResponse)
export const deleteCar = (id) => fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(parseResponse)
