import ResourceView from './ResourceView.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'level', label: 'Level' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'goal', label: 'Goal' },
  { key: 'recommendedFor', label: 'Recommended for' },
]

function Workouts() {
  return (
    <ResourceView
      title="Workouts"
      description="Personalized workout suggestions for teams and members."
      resource="workouts"
      columns={columns}
    />
  )
}

export default Workouts