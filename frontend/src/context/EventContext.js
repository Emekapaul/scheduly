import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import handleCrudError from "../components/handleCrudError";

//Create EventContext
export const EventContext = createContext();

//Create EventProvider component to wrap around the components and provide event-related data
export const EventProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [eventData, setEventData] = useState([]); // This will store all the events

  // Load events from localStorage when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        setEventData(JSON.parse(storedEvents));
      } else {
        fetchEvents(); // Fetch events if no data is present in localStorage
      }
    }
  }, [isAuthenticated]);

  // Save events to localStorage whenever eventData changes
  useEffect(() => {
    if (isAuthenticated && eventData.length > 0) {
      localStorage.setItem('events', JSON.stringify(eventData));
    }
  }, [isAuthenticated, eventData]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('events');
      setEventData([]);
    }
  }, [isAuthenticated]);


  //localStorage.removeItem('events');
  //console.log('Events ', localStorage.getItem('events'));
  //localStorage.removeItem('user');
  console.log(localStorage.getItem('user'));

  // CRUD operations
  // Function to create a new event
  const createEvent = async (newEvent) => {
    try {
      const response = await axios.post('/events', newEvent);
      const createdEvent = response.data;
      setEventData((prevEvents) => [...prevEvents, createdEvent]);
      toast.success('Event created successfully');
    } catch (error) {
      handleCrudError(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/events');
      const events = response.data;
      setEventData(events);
    } catch (error) {
      handleCrudError(error);
    }
  };

  const updateEvent = async (updatedEvent) => {
    console.log('Updated Event ', updatedEvent);
    try {
      const response = await axios.put(`/events/${updatedEvent._id}`, updatedEvent);
      const updatedEventData = response.data;
      setEventData((prevEvents) => prevEvents.map(event => event._id === updatedEventData._id ? updatedEventData : event));
      toast.success('Event updated successfully');
    } catch (error) {
      handleCrudError(error);
    }
  };

  const deleteEvent = async (eventId) => {
    console.log('Event ID ', eventId);
    try {
      await axios.delete(`/events/${eventId}`);
      setEventData((prevEvents) => prevEvents.filter(event => event._id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      handleCrudError(error);
    }
  };

  return (
    <EventContext.Provider value={{ eventData, createEvent, fetchEvents, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  )
}