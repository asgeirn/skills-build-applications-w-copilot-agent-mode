import ResourceView from './ResourceView.jsx'

const columns = [
  { key: 'userName', label: 'User' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'caloriesBurned', label: 'Calories' },
  { key: 'distanceMiles', label: 'Miles' },
]

function Activities() {
  return (
    <ResourceView
      title="Activities"
      description="Recent logged workouts and activity metrics."
      resource="activities"
      columns={columns}
    />
  )
}

export default Activities