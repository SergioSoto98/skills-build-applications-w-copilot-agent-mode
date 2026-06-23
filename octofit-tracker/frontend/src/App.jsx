import React, { useMemo } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBase } from './lib/api'

export default function App() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME || null
  const apiBase = useMemo(() => getApiBase(), [])

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h3">OctoFit Tracker</h1>

        <nav className="nav nav-pills mb-2">
          <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Users</NavLink>
          <NavLink to="/activities" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Activities</NavLink>
          <NavLink to="/workouts" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Workouts</NavLink>
          <NavLink to="/teams" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Teams</NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Leaderboard</NavLink>
        </nav>

        <div className="small text-muted">API: <a href={apiBase} target="_blank" rel="noreferrer">{apiBase}</a> — Environment: {codespace || '(local)'}</div>
        { !codespace ? <div className="mt-1 small text-warning">Note: <strong>VITE_CODESPACE_NAME</strong> is not defined — using local backend fallback.</div> : null }
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}
