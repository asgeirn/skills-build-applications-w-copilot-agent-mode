import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const isCodespacesApiConfigured = Boolean(codespaceName)
const apiBaseUrl = isCodespacesApiConfigured
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const navigationItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1>Fitness teams, activity, and coaching data</h1>
        </div>
        <div className="api-status" aria-live="polite">
          <span className={isCodespacesApiConfigured ? 'status-dot online' : 'status-dot fallback'}></span>
          <span>{apiBaseUrl}</span>
        </div>
      </header>

      <nav className="app-nav" aria-label="Octofit sections">
        {navigationItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {!isCodespacesApiConfigured && (
        <section className="alert alert-warning config-alert" role="status">
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces API URL.
          Localhost fallback is active.
        </section>
      )}

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App