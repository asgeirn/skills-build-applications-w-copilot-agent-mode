import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/`)
      .then((res) => res.json())
      .then((data) => setEntries(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, idx) => (
            <tr key={e._id ?? e.id ?? idx}>
              <td>{idx + 1}</td>
              <td>{e.user}</td>
              <td>{e.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
