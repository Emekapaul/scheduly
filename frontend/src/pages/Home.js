import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import '../styles/Home.css';

function Home() {
  const { eventData } = useContext(EventContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = eventData.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const options = {
      //year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="home">
      <h2>Upcoming Events</h2>
      <input id='searchEvent' name='searchEvent' type="text" placeholder="Search Events" value={searchQuery} onChange={handleSearch} className='searchBtn' />
      <ul className='home__ul'>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <li key={event.id ? event.id : index} className="event-item">
              <h3>{event.title}</h3>
              <p>Starts: {formatDateTime(event.start)} - Ends: {formatDateTime(event.end)}</p>
              <p>Location: {event.location}</p>
              {event.allDay && <p>All Day Event</p>}
              {event.isPriority && <p>Priority Event</p>}
              {event.description && <p>Description: {event.description}</p>}
              {event.invitedUsers.length > 0 && <p>Invited Users:</p>}
              <ul className="invited-users">
                {event.invitedUsers.map((user, userIndex) => (
                  <li key={userIndex}>{user}</li>
                ))}
              </ul>
              <p>Date Created: {formatDateTime(event.dateCreated)}</p>
            </li>
          ))
        ) : (
          <p className='no_event'>No events. Enjoy the silence.</p>
        )}
      </ul>
    </div>
  );
}

export default Home;
