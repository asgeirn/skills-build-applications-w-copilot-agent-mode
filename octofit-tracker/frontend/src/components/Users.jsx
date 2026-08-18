import ResourceView from './ResourceView.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'teamName', label: 'Team' },
  { key: 'fitnessGoal', label: 'Goal' },
  { key: 'weeklyActiveMinutes', label: 'Weekly minutes' },
]

function Users() {
  return (
    <ResourceView
      title="Users"
      description="Member profiles and current fitness goals."
      resource="users"
      columns={columns}
    />
  )
}

export default Users