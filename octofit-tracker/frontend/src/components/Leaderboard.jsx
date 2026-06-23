import React, { useEffect, useState } from 'react'
import { fetchList } from '../lib/api'

export default function Leaderboard() {
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchList('leaderboard')
      .then((list) => setRows(list))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading leaderboard…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!rows || rows.length === 0) return <div>No leaderboard data.</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {rows.map((r, i) => (
          <li key={r._id || r.id || i}>{r.name || r.username || r.team || JSON.stringify(r)}</li>
        ))}
      </ol>
    </div>
  )
}
