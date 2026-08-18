import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/teams/`)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t._id ?? t.id}>
              <td>{t.name}</td>
              <td>{Array.isArray(t.members) ? t.members.join(', ') : t.members}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teams
