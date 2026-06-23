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
      .then((res) => {
        if (!mounted) return
        const { items = [], meta = {} } = Array.isArray(res) ? { items: res, meta: {} } : (res || {})
        setItems(Array.isArray(items) ? items : [])
        setMeta(meta || {})
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [page])

  if (loading) return <div className="d-flex align-items-center"><div className="spinner-border text-primary me-2" role="status" /><div>Loading activities…</div></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>
  if (!items || items.length === 0) return <div className="text-muted">No activities found.</div>

  const totalPages = meta.totalPages || Math.ceil((meta.total || 0) / (meta.limit || limit)) || undefined

  return (
    <div>
      <div className="small text-muted mb-2">API: <a href={endpointUrl} target="_blank" rel="noreferrer">{endpointUrl}</a></div>
      <h2 className="h5">Activities</h2>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>When</th>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
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

      {totalPages ? (
        <div className="d-flex align-items-center gap-2 mt-3">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
          <div className="small">Page {page} of {totalPages}</div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
        </div>
      ) : null}
    </div>
  )
}
