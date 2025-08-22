# Twilio Event Reminder

A full-stack application that integrates **Google Calendar** and **Twilio** to send event reminders.
The backend is built with **Node.js** and **Express**, and the frontend uses **Next.js**.

---

## Features

* Google OAuth 2.0 authentication
* Fetch upcoming events from Google Calendar
* Send SMS reminders via Twilio
* User management and JWT-based authentication

---

## Technologies Used

* **Backend:** Node.js, Express, MongoDB, Mongoose
* **Frontend:** Next.js, React
* **Authentication:** Google OAuth 2.0, JWT
* **Messaging:** Twilio API

---

## Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or Atlas)
* Google Cloud Project for Calendar API
* Twilio Account

---

## Environment Variables

### Backend `.env`

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
PORT=5000
DB_CONNECTION_STRING=mongodb://localhost:27017/google-events
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
JWT_SECRET=your_jwt_secret
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

> **Note:** Replace all placeholder values with your own credentials.

---

## Installation & Running

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend development server:

```bash
npm run dev
```

The backend server will run on: `http://localhost:5000`.

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend server will run on: `http://localhost:3000`.

---

## Usage

1. Open the frontend app in your browser: `http://localhost:3000`.
2. Login with Google.
3. The app will fetch your upcoming Google Calendar events.
4. Twilio will send Call reminders for your events automatically.

---
