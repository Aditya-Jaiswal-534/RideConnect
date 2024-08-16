# RideConnect

RideConnect is a full-stack ride-sharing web application designed to connect travelers with companions for safe and convenient journeys. The application features user authentication, ride creation, feedback submission, and real-time communication with travel companions via SMS.

## Features

- **User Authentication:** Secure login and registration using JWT and cookie-based authentication.
- **Ride Management:** Users can create new rides, view past rides, and manage ongoing rides.
- **Feedback System:** Allows users to submit and view feedback on rides.
- **Real-Time Communication:** Share trip details with companions via SMS for enhanced safety and convenience.
- **Error Handling:** Consistent error responses with detailed messages for improved user and developer experience.

## Technology Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), Cookies
- **External APIs:** SMS API for real-time communication

## Project Structure

- **Frontend:** Contains the React application, styled using TailwindCSS for responsive and modern UI components.
- **Backend:** Node.js and Express.js manage API endpoints, user authentication, and interaction with the MongoDB database.
- **Database:** MongoDB is used for storing user data, ride details, and feedback in a flexible and scalable manner.
- **API Routes:**
  - `/auth`: Handles user authentication (login, logout, registration).
  - `/ride`: Manages ride creation, updates, and retrieval of user rides.
  - `/feedback`: Handles submission and retrieval of ride feedback.
  - `/sms`: Manages sending of SMS notifications to travel companions.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/RideConnect.git
  
2. **Navigate to the Project directory:**
   ```bash
   cd RideConnect
  
3. **Install Backend Dependencies**
   ```bash
   cd ../Rideshare-frontend
   npm install
  
4. **Install Frontend Dependencies**
   ```bash
   cd backend
   npm install
   
5. **Setting Environment Variables**
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SMS_API_KEY=your_sms_api_key
6. **Run the development servers**
   ```bash
   cd backend
   npm run dev
   cd ../frontend
   npm start
## Usage

- **User Authentication:** Users can sign up, log in, and log out. JWTs are used for authentication, and cookies are employed for session management.
- **Ride Management:** Users can view their past rides and create new rides. Ride details can be managed through the dashboard.
- **Feedback System:** Users can provide feedback on rides and view their feedback history.
- **Real-Time Communication:** Trip details can be shared with companions via SMS.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.


## Acknowledgments

- Thanks to all open-source libraries that made this project possible.






  
