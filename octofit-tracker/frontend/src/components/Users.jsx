import React, { useEffect, useState } from 'react'
import { fetchList } from '../lib/api'

export default function Users() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchList('users')
      .then((list) => setUsers(list))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading users…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!users || users.length === 0) return <div>No users found.</div>

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id || u.id}>{u.name || u.username || JSON.stringify(u)}</li>
        ))}
      </ul>
    </div>
  )
}
