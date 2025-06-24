# SheShield – Women Safety Web App

## Overview
SheShield is a women's safety application that sends real-time SOS alerts via email, SMS, and automated voice calls with location data to emergency contacts.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **APIs:** Twilio (SMS, Voice), Nodemailer (Email), Geolocation API

## Features
- JWT-based authentication (register/login)
- Add/manage emergency contacts
- Shake-to-activate SOS (DeviceMotion API)
- Sends SOS alerts via Email, SMS, and Voice Call (with live GPS coordinates)
- Secure REST APIs for all actions

## Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB Atlas account
- Twilio account (for SMS/Voice)
- Gmail account (for Email)

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/sheshield.git
cd sheshield
```

### 2. Backend Setup
```sh
cd backend
npm install
# Add your .env file with MongoDB, Twilio, and Email credentials
node server.js
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm start
```

### 4. Deployment
- Deploy frontend and backend separately (e.g., Render, Vercel)
- Update API URLs in frontend as needed

## License
MIT 