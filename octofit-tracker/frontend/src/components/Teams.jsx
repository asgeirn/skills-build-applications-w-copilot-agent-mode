import ResourceView from './ResourceView.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'captain', label: 'Captain' },
  { key: 'focus', label: 'Focus' },
  { key: 'city', label: 'City' },
  { key: 'weeklyPoints', label: 'Weekly points' },
]

function Teams() {
  return (
    <ResourceView
      title="Teams"
      description="Team structure, training focus, and weekly standings."
      resource="teams"
      columns={columns}
    />
  )
}

export default Teams