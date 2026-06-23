import React, { useEffect, useState } from 'react'
import { fetchList } from '../lib/api'

export default function Workouts() {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchList('workouts')
      .then((list) => setItems(list))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading workouts…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!items || items.length === 0) return <div>No workouts found.</div>

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {items.map((w) => (
          <li key={w._id || w.id}>{w.name || w.title || `${w.type || ''} ${w.duration ? `${w.duration}min` : ''}`}</li>
        ))}
      </ul>
    </div>
  )
}
