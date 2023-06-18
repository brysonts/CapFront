import '../styles/activities-card.css'

function ActivityCard({ activity }) {
  return (
    <div>
      <div className="activity">
        <h1>{activity.name}</h1>
        <h2>{activity.id}</h2>
        <h3>{activity.description}</h3>
      </div>
    </div>
  )
}

export default ActivityCard
