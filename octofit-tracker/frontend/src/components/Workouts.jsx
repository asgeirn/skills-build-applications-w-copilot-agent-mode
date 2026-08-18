import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeWorkouts(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items

  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchWorkouts() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/workouts/`)

        if (!response.ok) {
          throw new Error(`Request failed for workouts: ${response.status}`)
        }

        const payload = await response.json()

        if (active) {
          setWorkouts(normalizeWorkouts(payload))
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load workouts')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchWorkouts()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="resource-section">
      <div className="section-heading">
        <div>
          <h2>Workouts</h2>
          <p>Personalized workout suggestions for teams and members.</p>
        </div>
        <span className="record-count">{workouts.length} records</span>
      </div>

      {loading && <div className="state-message">Loading workouts...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                <th scope="col">Workout</th>
                <th scope="col">Level</th>
                <th scope="col">Minutes</th>
                <th scope="col">Goal</th>
                <th scope="col">Recommended for</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.level}</td>
                  <td>{workout.durationMinutes}</td>
                  <td>{workout.goal}</td>
                  <td>{Array.isArray(workout.recommendedFor) ? workout.recommendedFor.join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts