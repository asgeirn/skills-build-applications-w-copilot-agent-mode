import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/workouts/`)
      .then((res) => res.json())
      .then((data) => setWorkouts(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w._id ?? w.id}>
              <td>{w.name}</td>
              <td>{w.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Workouts
