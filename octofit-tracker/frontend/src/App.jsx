import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBase } from './lib/api'

const activeStyle = { fontWeight: 'bold', textDecoration: 'underline' }

export default function App() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME || 'local'
  const apiBase = getApiBase()

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <header>
        <h1>OctoFit Tracker</h1>
        <nav style={{ marginBottom: 16 }}>
          <NavLink to="/users" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Users</NavLink>
          {' | '}
          <NavLink to="/activities" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Activities</NavLink>
          {' | '}
          <NavLink to="/workouts" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Workouts</NavLink>
          {' | '}
          <NavLink to="/teams" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Teams</NavLink>
          {' | '}
          <NavLink to="/leaderboard" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Leaderboard</NavLink>
        </nav>
        <div style={{ fontSize: 13, color: '#666' }}>
          API: <a href={apiBase} target="_blank" rel="noreferrer">{apiBase}</a> — Environment: {codespace}
        </div>
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
