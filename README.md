# Scheduly - Event Scheduling Application

Scheduly is a modern event scheduling application that helps users manage their events, meetings, and appointments efficiently. Built with a React frontend and Node.js backend, it provides a seamless experience for creating, managing, and organizing events.

## Features

- User Authentication (Signup, Login, Logout)
- Event Management
  - Create events with title, description, start/end times
  - Set event priorities
  - All-day event support
  - Event invitations
- Interactive Calendar Interface
- Responsive Design
- Real-time Updates

## Tech Stack

### Frontend

- React.js
- FullCalendar for calendar functionality
- React Router for navigation
- Axios for API requests
- React Toastify for notifications

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- Express Session for session management
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd scheduly
```

2. Install frontend dependencies:

```bash
cd front-end
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=3003
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run start-dev
```

2. Start the frontend development server:

```bash
cd front-end
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3003

## API Documentation

The API documentation is available in the `backend/apidocs.md` file. It includes detailed information about:

- Authentication endpoints
- Event management endpoints
- Request/response formats
- Error handling

## Development

- Frontend development server runs on port 3000
- Backend server runs on port 3003
- The frontend is configured to proxy API requests to the backend

## Scripts

### Frontend

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm run deploy`: Deploy to GitHub Pages

### Backend

- `npm start`: Start production server
- `npm run start-dev`: Start development server with nodemon

## License

This project is licensed under the ISC License. See the [LICENSE.md](LICENSE.md) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
