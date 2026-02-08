# H&O Company — Construction Business Platform

![Status](https://img.shields.io/badge/status-production-green)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![PHP](https://img.shields.io/badge/php-8.x-purple)
![Firebase](https://img.shields.io/badge/firebase-auth-yellow)
![PayPal](https://img.shields.io/badge/paypal-live-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A production-ready web platform designed to manage construction company operations, internal workflows, and customer interactions.

This project represents a real-world business application built with a strong focus on **maintainability, scalability, and long-term usability**.

🌐 **Live Demo:** https://hocompany1.com

---

## Overview

H&O Company centralizes multiple construction-related workflows into a single platform, reducing reliance on fragmented tools and manual processes.

The system is designed to support both **public users** and **administrative roles**, with clear separation of concerns and predictable data flow.

---

## Core Capabilities

- User authentication with Google OAuth
- Job application submission and tracking
- Role-based access control (admin / user)
- Administrative dashboard
- Calendar-based scheduling
- Secure online payments
- Customer reviews and ratings
- Responsive layout for desktop and mobile devices

---

## Architecture

- **Frontend:** React (component-driven architecture)
- **Backend:** RESTful PHP API
- **Database:** MySQL
- **Authentication:** Firebase + Google OAuth
- **Payments:** PayPal
- **State Management:** React Context and custom hooks
- **API Communication:** Axios
- **Scheduling:** React Big Calendar

The architecture emphasizes modularity, separation of concerns, and ease of future extension.

---

## Development Principles

- Clean and predictable data flow
- Reusable and isolated UI components
- Explicit loading and error handling
- Responsive and accessible UI
- Configuration-driven environment setup

---

## Team Workflow

This project follows a team-oriented development workflow inspired by real-world engineering practices:

- Feature-based branching (`feature/*`, `fix/*`, `docs/*`)
- Pull Requests for all changes
- Conventional commit messages
- Stable and protected `main` branch
- Documentation treated as part of the product

### Branching Strategy

- `main` — production-ready code
- `feature/*` — new features
- `fix/*` — bug fixes
- `docs/*` — documentation changes

---

## Project Structure

```text
api/                → PHP REST API
public/             → Static assets
src/
 ├─ components/     → Reusable UI components
 ├─ pages/          → Application pages
 ├─ features/       → Feature-based modules
 ├─ hooks/          → Custom React hooks
 ├─ context/        → Global state management
 ├─ styles/         → Styling
 ├─ App.js          → Application entry point
 ├─ index.js        → ReactDOM render
 └─ firebase.js     → Firebase configuration
screenshots/        → Application screenshots
.env.example        → Environment variables template


## 💻 Installation & Setup 

### 1️⃣ Clone Repository
```
git clone https://github.com/EraCodeX/hco-company-platform.git
cd hco-company-platform


```
2️⃣ Install Dependencies
```
Using NPM:
npm install

Using Yarn:
yarn
```
3️⃣ Setup Environment Variables
```
Create a .env file at the project root:

- REACT_APP_FIREBASE_API_KEY=your_api_key
- REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
- REACT_APP_FIREBASE_PROJECT_ID=your_project_id
- REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id

```

4️⃣ Run Locally
```
Using NPM:

npm start

Using Yarn:

yarn start
```
Testing workflow will be added using Jest and React Testing Library.

