import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//👇🏻 component
import Header from './components/Header';
import Footer from './components/Footer';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home'; // Event Viewing and filtering
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import CalendarPage from './pages/CalendarPage';
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles/App.css'

export default function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <AuthProvider>
          <EventProvider>
            <Header />
            <main className="App-content">
              <Routes>
                {/* Public routes */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Signup />} />
                <Route path='/' element={<LandingPage />} />

                {/* Private routes */}
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </EventProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}