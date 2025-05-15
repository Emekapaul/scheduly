import React from 'react';
import '../styles/EventCalendarModal.css';

const EventCalendarModal = ({ event, onClose }) => {

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

  const extendedProps = event?.extendedProps || {};
  const timeColor = { color: '#e74c3c' };
  const paraColor = { color: '#2a2438' };

  return (
    <div className="modal_calendar">
      <div className="modal-content_calendar">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 style={{ color: '#2c3e50' }}>{event?.title}</h2>
        {event?.start && <p style={timeColor}><strong>Start:</strong> {formatDateTime(event.start)}</p>}
        {event?.end && <p style={timeColor}><strong>End:</strong> {formatDateTime(event.end)}</p>}
        {event?.allDay && <p style={paraColor}><strong>All Day Event</strong></p>}
        {extendedProps?.isPriority && <p style={paraColor}><strong>Priority Event</strong></p>}
        {extendedProps?.location && <p style={paraColor}><strong>Location:</strong> {extendedProps.location}</p>}
        {extendedProps?.description && <p style={paraColor}><strong>Description:</strong> {extendedProps.description}</p>}
      </div>
    </div>
  );
};

export default EventCalendarModal;
