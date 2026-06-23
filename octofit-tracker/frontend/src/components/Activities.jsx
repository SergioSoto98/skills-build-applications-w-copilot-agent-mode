import React, { useEffect, useState } from 'react'
import { fetchList, getApiBase } from '../lib/api'

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({})
  const limit = 20
  const endpointUrl = `${getApiBase()}/activities/`

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchList('activities', { page, limit })
      .then(({ items, meta }) => {
        if (!mounted) return
        setItems(items)
        setMeta(meta || {})
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [page])

  if (loading) return <div>Loading activities…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!items || items.length === 0) return <div>No activities found.</div>

  const totalPages = meta.totalPages || Math.ceil((meta.total || 0) / (meta.limit || limit)) || undefined

  return (
    <div>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>API: <a href={endpointUrl} target="_blank" rel="noreferrer">{endpointUrl}</a></div>
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
