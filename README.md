# Anything AI - Expo

This is an Expo application that serves as the frontend for the Anything AI platform. It is a full-blown mobile application that communicates with a backend service to provide AI-powered features.

## Project Overview

The project is structured as a monorepo with a `backend` directory and an Expo-based frontend at the root level.

- **Frontend**: An Expo application for iOS, Android, and web.
- **Backend**: An Express.js server that handles API requests, user authentication, and interaction with the database.

## Features

- **AI-Powered Chat**: Engage in conversations with an AI, powered by a robust backend.
- **User Authentication**: Secure sign-up and login functionality with persistent sessions.
- **Subscription Management**: View and manage your subscription plan directly within the app.
- **Cross-Platform**: Built with Expo for a consistent experience on iOS, Android, and the web.

**Note on Voice Input:** The voice input feature was temporarily removed to resolve a library compatibility issue that was preventing the application from starting. This feature can be revisited in the future with a more stable, Expo-compatible solution.

## Getting Started

### Prerequisites

- Node.js and npm
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

1. **Navigate to the project root and install dependencies:**
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
   - **For Web:**
     ```bash
     npm run web
     ```

## Available Scripts

- `npm start`: Starts the Expo development server.
- `npm run ios`: Runs the app on the iOS simulator.
- `npm run android`: Runs the app on an Android emulator or connected device.
- `npm run web`: Runs the app in a web browser.