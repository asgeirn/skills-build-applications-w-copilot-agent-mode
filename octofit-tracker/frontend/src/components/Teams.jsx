import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeTeams(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items

  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchTeams() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/teams/`)

        if (!response.ok) {
          throw new Error(`Request failed for teams: ${response.status}`)
        }

        const payload = await response.json()

        if (active) {
          setTeams(normalizeTeams(payload))
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load teams')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchTeams()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="resource-section">
      <div className="section-heading">
        <div>
          <h2>Teams</h2>
          <p>Team structure, training focus, and weekly standings.</p>
        </div>
        <span className="record-count">{teams.length} records</span>
      </div>

      {loading && <div className="state-message">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">Captain</th>
                <th scope="col">Focus</th>
                <th scope="col">City</th>
                <th scope="col">Weekly points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{team.captain}</td>
                  <td>{team.focus}</td>
                  <td>{team.city}</td>
                  <td>{team.weeklyPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams