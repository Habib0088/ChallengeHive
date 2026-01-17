# Website Name:- ChallengeHive

**Live Site:** https://zip-shift-26ca3.web.app/

## Overview

ChallengeHive is a modern contest management web application designed for users, contest creators, and admins. It offers a fully responsive experience on mobile, tablet, and desktop devices. Users can participate in contests, submit tasks, view winners, and track their performance, while creators can manage their contests and admins oversee the platform.

## Features

- 1**Responsive Design:** Fully responsive UI for Home, Dashboard, and all pages across devices.
- 2**Private Routes:** Users remain logged in after page refresh with secure JWT authentication.
- 3**Environment Variables:** Firebase and MongoDB secrets are securely hidden using environment variables.
- 4**Sweet Alerts & Toasts:** Used for login, signup, CRUD actions, and notifications.
- 5**TanStack Query:** All data fetching is managed with TanStack Query for efficiency and caching.
- 6**Home Page:** Includes Navbar, Banner , Popular Contests, Winner Advertisement, Road map Section, and Footer.
- 7**Contest Management:** Admin-approved contests with detailed views, registration, payment, and task submission features.
- 8**Role-Based Access:** Three roles - Admin, Contest Creator, and Normal User - each with specific dashboard functionalities.
- 9**Dashboard Pages:**
  - User: Participated Contests, Winning Contests, Profile with win percentage chart.
  - Creator: Add/Edit contests, view submissions, declare winners.
  - Admin: Manage Users, Manage Contests, approve/reject contests.
-
- 10**Pagination:** Implemented on tables (10 items per page) for better usability.
-
- 11**Extra Features:** Google Sign-in, React Hook Form in all forms, secure JWT-protected APIs, meaningful additional routes for extended functionality.
- 12**404 Not Found Page:** User-friendly error page with navigation back to home.

## Tech Stack

- React.js
- Firebase Authentication
- MongoDB & Node.js (Backend)
- React Router DOM
- TanStack Query
- SweetAlert2 , Toast
- React Hook Form
- JWT Authentication
- React Datepicker
- Tailwind CSS
- 
=>Steps to Run Locally:

1.Clone the repo:
2.Install dependencies:

3.Set up environment variables:
Create a .env file with your Firebase config.

Start the app:
npm start
Open in browser:
http://localhost:3000
<img width="1366" height="601" alt="ChallangeHive" src="https://github.com/user-attachments/assets/c89541b8-0e24-4ed6-8eed-1ec4aba1e835" />
