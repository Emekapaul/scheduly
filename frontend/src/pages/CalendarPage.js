import React, { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventContext } from '../context/EventContext';
import CreateAndEditEvent from '../components/CreateAndEditEvent';
import EventCalendarModal from '../components/EventCalendarModal';
import '../styles/CalendarPage.css';

export default function CalendarPage() {
  const { eventData, createEvent } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle event click in FullCalendar
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setShowModal(true); // Show modal when event is clicked
  };

  // Handle date click for creating new event
  const handleDateClick = (info) => {
    const clickedDateTime = `${info.dateStr}T00:00`;
    setSelectedEvent(null);
    setClickedDate(clickedDateTime);
    setIsCreating(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setClickedDate(null);
    setIsCreating(false);
  };

  const handleSubmit = (event) => {
    createEvent(event);
    handleCloseModal(); // Close modal after submission
  };


  return (
    <div className='calendar'>
      <h1>My Planning</h1>
      <div className='calendar-wrapper'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]} //  Add desired plugins
          initialView='dayGridMonth' // Default view (e.g., month view)
          events={eventData} // Events to display
          dateClick={handleDateClick} // Handle clicks on dates
          eventClick={handleEventClick} // Handle clicks on events
          //eventDrop={handleEventDrop} // Handle event drops
          editable={true} // Allows drag and drop
          selectable={true} // Allows selection of dates
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}  // Add buttons to change view
        />


        {showModal && (
          isCreating ? (
            <CreateAndEditEvent
              isEditMode={false}
              clickedDate={clickedDate}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          ) : (
            <EventCalendarModal
              event={selectedEvent}
              onClose={handleCloseModal}
            />
          )
        )}
      </div>
    </div>
  );
}