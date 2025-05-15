import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import CreateAndEditEvent from '../components/CreateAndEditEvent';
import { AuthContext } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { eventData, createEvent, updateEvent, deleteEvent } = useContext(EventContext);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsCreating(true);
  };

  const handleDelete = (eventId) => {
    deleteEvent(eventId);
    setIsCreating(false);
    setEditingEvent(null);
  };

  const handleSubmit = (event) => {
    if (editingEvent) {
      updateEvent(event);
    } else {
      createEvent(event);
    }
    setIsCreating(false);
    setEditingEvent(null);
  };

  const handleClose = () => {
    setIsCreating(false);
    setEditingEvent(null);
  };

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

  const userEvents = eventData.filter(event => event.createdBy === user.id);

  return (
    <div className="profile">
      <h2 className='email'>{user.email}</h2>
      <p>@{user.name}</p>
      <h2>My Events</h2>
      <button className="createBtn" onClick={handleCreate}>Create Event</button>
      {isCreating && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <CreateAndEditEvent
              isEditMode={!!editingEvent}
              event={editingEvent}
              onSubmit={handleSubmit}
              onCancel={handleClose}
              onDelete={() => handleDelete(editingEvent._id)}
            />
          </div>
        </div>
      )}
      <ul className="event-list">
        {userEvents.length > 0 ? (
          userEvents.map((event, index) => (
            <li key={event.id ? event.id : index} className="event-item">
              <h3>{event.title}</h3>
              <p>Starts: {formatDateTime(event.start)} {" - "} Ends: {formatDateTime(event.end)}</p>
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
              <button className="editBtn" onClick={() => handleEdit(event)}>Edit</button>
              <button className="deleteBtn" onClick={() => handleDelete(event._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p className='no_event'>No events. Enjoy the Silence</p>
        )}
      </ul>
    </div>
  );
};

export default Profile;