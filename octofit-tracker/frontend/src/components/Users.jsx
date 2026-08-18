import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeUsers(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items

  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchUsers() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/users/`)

        if (!response.ok) {
          throw new Error(`Request failed for users: ${response.status}`)
        }

        const payload = await response.json()

        if (active) {
          setUsers(normalizeUsers(payload))
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load users')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchUsers()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="resource-section">
      <div className="section-heading">
        <div>
          <h2>Users</h2>
          <p>Member profiles and current fitness goals.</p>
        </div>
        <span className="record-count">{users.length} records</span>
      </div>

      {loading && <div className="state-message">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">Goal</th>
                <th scope="col">Weekly minutes</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.teamName}</td>
                  <td>{user.fitnessGoal}</td>
                  <td>{user.weeklyActiveMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users