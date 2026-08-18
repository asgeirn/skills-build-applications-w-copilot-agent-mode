import ResourceView from './ResourceView.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'userName', label: 'User' },
  { key: 'teamName', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'streakDays', label: 'Streak' },
]

function Leaderboard() {
  return (
    <ResourceView
      title="Leaderboard"
      description="Competitive ranking across active Octofit members."
      resource="leaderboard"
      columns={columns}
    />
  )
}

export default Leaderboard