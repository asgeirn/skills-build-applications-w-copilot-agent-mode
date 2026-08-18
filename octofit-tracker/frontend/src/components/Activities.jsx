import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeActivities(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items

  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchActivities() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/activities/`)

        if (!response.ok) {
          throw new Error(`Request failed for activities: ${response.status}`)
        }

        const payload = await response.json()

        if (active) {
          setActivities(normalizeActivities(payload))
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load activities')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchActivities()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="resource-section">
      <div className="section-heading">
        <div>
          <h2>Activities</h2>
          <p>Recent logged workouts and activity metrics.</p>
        </div>
        <span className="record-count">{activities.length} records</span>
      </div>

      {loading && <div className="state-message">Loading activities...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Activity</th>
                <th scope="col">Minutes</th>
                <th scope="col">Calories</th>
                <th scope="col">Miles</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.userName}-${activity.performedAt}`}>
                  <td>{activity.userName}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.distanceMiles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities