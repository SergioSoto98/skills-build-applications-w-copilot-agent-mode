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
      .then((res) => {
        if (!mounted) return
        const { items = [], meta = {} } = Array.isArray(res) ? { items: res, meta: {} } : (res || {})
        setTeams(Array.isArray(items) ? items : [])
        setMeta(meta || {})
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [page])

  if (loading) return <div className="d-flex align-items-center"><div className="spinner-border text-primary me-2" role="status" /><div>Loading teams…</div></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>
  if (!teams || teams.length === 0) return <div className="text-muted">No teams found.</div>

  const totalPages = meta.totalPages || Math.ceil((meta.total || 0) / (meta.limit || limit)) || undefined

  return (
    <div>
      <div className="small text-muted mb-2">API: <a href={endpointUrl} target="_blank" rel="noreferrer">{endpointUrl}</a></div>
      <h2 className="h5">Teams</h2>
      <ul className="list-group mb-2">
        {teams.map((t) => (
          <li key={t._id || t.id} className="list-group-item">{t.name || t.title || JSON.stringify(t)}</li>
        ))}
      </ul>

      {totalPages ? (
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
          <div className="small">Page {page} of {totalPages}</div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
        </div>
      ) : null}
    </div>
  )
}
