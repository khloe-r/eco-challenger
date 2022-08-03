# Eco Challenger

Full Stack MERN Project incentivizing eco-friendly actions with friendly competition!

Built using `React`, `Node.js`, `Express`, `MongoDB`, `Chakra-UI` and authentication using `Passport.js`

## Features

- Users can create or join teams from any other user using uniquely generated invite codes
- Secure login using Passport.js username and password
- Team owners generate goals from their chosen categories each cycle and users can submit their progress once each cycle before the goals get reset
- View any user's public profile and see their worldwide ranking and total points
- Team owners can archive old teams to prevent activity but keep progress and points accessible to users

## Preview

## How to Run Locally

1. `npm install`
2. `cd frontend && npm install`
3. `cd ../backend && npm install`
4. In `backend/` create a .env folder with the following variables:
   ECOCHALLENGE_DB_URI - your MongoDB connection URI
   ECOCHALLENGE_NS - your database name
   ECOCHALLENGE_SESSION_HASH - a random secure string for saving your user sessions

In `frontend/` run `npm start` and in `backend/` run `nodemon server`
