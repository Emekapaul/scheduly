import React, { useState } from 'react';
import '../styles/CreateAndEditEvent.css';

const CreateAndEditEvent = ({ isEditMode, event, onSubmit, onCancel, onDelete, clickedDate }) => {
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
  };

  // If editing, pre-fill the values with the event data
  const [title, setTitle] = useState(isEditMode && event ? event.title : '');
  const [start, setStart] = useState(isEditMode && event ? formatDateForInput(event.start) : clickedDate || '');
  const [end, setEnd] = useState(isEditMode && event ? formatDateForInput(event.end) : clickedDate || '');
  const [allDay, setAllDay] = useState(isEditMode && event ? event.allDay : false);
  const [isPriority, setIsPriority] = useState(isEditMode && event ? event.isPriority : false);
  const [location, setLocation] = useState(isEditMode && event ? event.location : '');
  const [invitedUsers, setInvitedUsers] = useState(isEditMode && event ? event.invitedUsers : []);
  const [description, setDescription] = useState(isEditMode && event ? event.description : '');
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState('');

  console.log(start);

  const addUser = () => {
    if (userInput.trim() && !invitedUsers.includes(userInput.trim())) {
      setInvitedUsers([...invitedUsers, userInput.trim()]);
    }
    setUserInput('');
  };

  const removeUser = (user) => {
    setInvitedUsers(invitedUsers.filter(u => u !== user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');
    if (!start) return setError('Start date and time is required');
    if (!end) return setError('End date and time is required');
    if (new Date(start) >= new Date(end)) return setError('End date and time must be after start date and time');
    setError(null);
    const newEvent = { title, start, end, allDay, isPriority, location, invitedUsers, description };
    if (isEditMode && event) {
      newEvent._id = event._id; // Include the event ID if in edit mode
      newEvent.createdBy = event.createdBy;
      newEvent.dateCreated = event.dateCreated;
    }
    onSubmit(newEvent);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="event-modal">
      <div className="form-container">
        <button type="button" onClick={onCancel} className="close">&times;</button>
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>{isEditMode ? 'Edit Event' : 'Create Event'}</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor='title'>Title</label>
              <input
                id='title'
                name='title'
                type="text"
                value={title}
                onChange={handleInputChange(setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor='location'>Location</label>
              <input
                id='location'
                name='location'
                type="text"
                value={location}
                onChange={handleInputChange(setLocation)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor='start'>Start Date and Time</label>
              <input
                id='start'
                name='start'
                type="datetime-local"
                value={start}
                onChange={handleInputChange(setStart)}
              />
            </div>
            <div className="form-group">
              <label htmlFor='end'>End Date and Time</label>
              <input
                id='end'
                name='end'
                type="datetime-local"
                value={end}
                onChange={handleInputChange(setEnd)}
              />
            </div>
          </div>

          <div className="form-row checkboxes">
            <label>
              <input
                name='allDay'
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
              All Day Event
            </label>
            <label>
              <input
                name='isPriority'
                type="checkbox"
                checked={isPriority}
                onChange={(e) => setIsPriority(e.target.checked)}
              />
              Priority Event
            </label>
          </div>

          <div className="form-group">
            <label htmlFor='invitedUsers'>Invited Users</label>
            <div className="user-invite">
              <input
                id='invitedUsers'
                name='invitedUsers'
                type="text"
                value={userInput}
                onChange={handleInputChange(setUserInput)}
                placeholder="Enter email"
              />
              <button type="button" onClick={addUser}>Add</button>
            </div>
            <ul className="invited-list">
              {invitedUsers.map((user, index) => (
                <li key={index}>
                  {user}
                  <button type="button" onClick={() => removeUser(user)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-group">
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={description}
              onChange={handleInputChange(setDescription)}
            ></textarea>
          </div>

          <div className="form-buttons">
            {isEditMode ? (
              <>
                <button type="submit" className="save-button">Save</button>
                <button type="button" onClick={onDelete} className="delete-button">Delete</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
              </>
            ) : (
              <button type="submit" className="save-button">Create</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAndEditEvent;
