import React, { useEffect, useState } from 'react'
import { fetchList, getApiBase } from '../lib/api'

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({})
  const limit = 20
  const endpointUrl = `${getApiBase()}/leaderboard`

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchList('leaderboard', { page, limit })
      .then(({ items, meta }) => {
        if (!mounted) return
        setRows(items)
        setMeta(meta || {})
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [page])

  if (loading) return <div>Loading leaderboard…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!rows || rows.length === 0) return <div>No leaderboard data.</div>

  const totalPages = meta.totalPages || Math.ceil((meta.total || 0) / (meta.limit || limit)) || undefined

  return (
    <div>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>API: <a href={endpointUrl} target="_blank" rel="noreferrer">{endpointUrl}</a></div>
      <h2>Leaderboard</h2>
      <ol>
        {rows.map((r, i) => (
          <li key={r._id || r.id || i}>{r.name || r.username || r.team || JSON.stringify(r)}</li>
        ))}
      </ol>

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
