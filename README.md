# Anything AI - React Native

This is a React Native application that serves as the frontend for the Anything AI platform. It is a full-blown mobile application that communicates with a backend service to provide AI-powered features.

## Project Overview

The project is structured as a monorepo with a `backend` directory and a React Native frontend at the root level.

- **Frontend**: A React Native application for iOS and Android.
- **Backend**: An Express.js server that handles API requests, user authentication, and interaction with the database.

## Getting Started

### Prerequisites

- Node.js and npm
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- A running instance of the backend server.

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the backend server:**
   ```bash
   npm start
   ```
The backend server will be running at `http://localhost:3000`.

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the application:**

   - **For iOS:**
     ```bash
     npm run ios
     ```
   - **For Android:**
     ```bash
     npm run android
     ```

## Available Scripts

- `npm run ios`: Runs the app on the iOS simulator.
- `npm run android`: Runs the app on an Android emulator or connected device.
- `npm start`: Starts the Metro bundler.
- `npm test`: Runs the test suite.
- `npm run lint`: Lints the code.