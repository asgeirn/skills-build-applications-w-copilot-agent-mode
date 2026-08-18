import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeLeaderboard(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items

  return []
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchLeaderboard() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/leaderboard/`)

        if (!response.ok) {
          throw new Error(`Request failed for leaderboard: ${response.status}`)
        }

        const payload = await response.json()

        if (active) {
          setLeaderboard(normalizeLeaderboard(payload))
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load leaderboard')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchLeaderboard()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="resource-section">
      <div className="section-heading">
        <div>
          <h2>Leaderboard</h2>
          <p>Competitive ranking across active Octofit members.</p>
        </div>
        <span className="record-count">{leaderboard.length} records</span>
      </div>

      {loading && <div className="state-message">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
                <th scope="col">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id ?? entry.rank}>
                  <td>{entry.rank}</td>
                  <td>{entry.userName}</td>
                  <td>{entry.teamName}</td>
                  <td>{entry.points}</td>
                  <td>{entry.streakDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard