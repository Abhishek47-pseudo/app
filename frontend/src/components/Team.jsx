import React from 'react';
import TeamMember from './TeamMember';

const Team = () => {
  const teamMembers = [
    { name: 'Aaditya Arya', photoUrl: 'imgs/Aaditya.jpg' },
    { name: 'Abhishek Kumar', photoUrl: 'imgs/Abhishek.jpg' },
    { name: 'Parth Mehta', photoUrl: 'imgs/Parth.jpg' },
    { name: 'Sydney Sweeny', photoUrl: 'imgs/Sydney.jpg' },
  ];

  return (
    <section id="team" className="team-section hidden-section">
      <div className="container">
        <h2 className="section-title text-center">Meet the Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} name={member.name} photoUrl={member.photoUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
