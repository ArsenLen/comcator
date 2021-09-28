import React from 'react'
import PropTypes from 'prop-types'
// import './Profile.css'

const Profile = ({ id, name }) => {
  return (
    <div className="Profile">
      <img src="/uploads/avatar-1.png" alt="" /> <a href={`/profiles/${id}`}>{name}</a>
    </div>
  )
}

Profile.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Profile
