import React, { useEffect, useState } from 'react'
import { fetchList, getApiBase } from '../lib/api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({})
  const limit = 20
  const endpointUrl = `${getApiBase()}/teams/`

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchList('teams', { page, limit })
      .then(({ items, meta }) => {
        if (!mounted) return
        setTeams(items)
        setMeta(meta || {})
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [page])

  if (loading) return <div>Loading teams…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!teams || teams.length === 0) return <div>No teams found.</div>

  const totalPages = meta.totalPages || Math.ceil((meta.total || 0) / (meta.limit || limit)) || undefined

  return (
    <div>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>API: <a href={endpointUrl} target="_blank" rel="noreferrer">{endpointUrl}</a></div>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t._id || t.id}>{t.name || t.title || JSON.stringify(t)}</li>
        ))}
      </ul>

      {totalPages ? (
        <div style={{ marginTop: 12 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
          <span style={{ margin: '0 8px' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
        </div>
      ) : null}
    </div>
  )
}
