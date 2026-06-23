import React, { useEffect, useState } from 'react'
import { fetchList } from '../lib/api'

export default function Teams() {
  const [teams, setTeams] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchList('teams')
      .then((list) => setTeams(list))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading teams…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!teams || teams.length === 0) return <div>No teams found.</div>

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t._id || t.id}>{t.name || t.title || JSON.stringify(t)}</li>
        ))}
      </ul>
    </div>
  )
}
