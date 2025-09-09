import React from 'react';

const TeamMember = ({ name, photoUrl }) => {
  return (
    <div className="team-member">
      <div className="member-photo-container">
        <div className="member-photo">
          <img src={photoUrl} alt={name} />
        </div>
      </div>
      <h3 className="member-name">{name}</h3>
    </div>
  );
};

export default TeamMember;
