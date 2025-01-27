import './index.css'

const Profile = props => {
  const {details} = props
  const {name, profileImageurl, shortBio} = details
  return (
    <div className="profile-bg-container">
      <img src={profileImageurl} className="profileImage" alt="profile" />
      <h1>{name}</h1>
      <p>{shortBio}</p>
    </div>
  )
}

export default Profile
