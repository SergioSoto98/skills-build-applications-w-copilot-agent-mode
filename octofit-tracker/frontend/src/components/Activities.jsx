import React, { useEffect, useState } from 'react'
import { fetchList } from '../lib/api'

export default function Activities() {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchList('activities')
      .then((list) => setItems(list))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading activities…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!items || items.length === 0) return <div>No activities found.</div>

  return (
    <div>
      <h2>Activities</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>When</th>
            <th style={{ textAlign: 'left' }}>User</th>
            <th style={{ textAlign: 'left' }}>Type</th>
            <th style={{ textAlign: 'left' }}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a, idx) => (
            <tr key={a._id || a.id || idx}>
              <td>{new Date(a.date || a.createdAt || a.when || Date.now()).toLocaleString()}</td>
              <td>{a.userName || a.user?.name || a.user || '—'}</td>
              <td>{a.type || a.activity || '—'}</td>
              <td>{a.duration ? `${a.duration} min` : a.distance || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
