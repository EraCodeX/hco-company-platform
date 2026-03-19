# 🧱 H&O Company — Business Platform

> Production-ready web application built with a strong focus on frontend architecture, scalability, and real-world workflows

🌐 **Live Demo:** https://hocompany1.com  
📦 **Repository:** https://github.com/EraCodeX/hco-company-platform

---

## 📌 Overview

H&O Company is a full-featured business platform designed to manage construction company operations, including job applications, scheduling, customer interactions, and payments.

The application follows a frontend-first engineering approach, focusing on scalable architecture, reusable components, and maintainable code, while integrating seamlessly with backend services.

> This project reflects how I approach frontend engineering at an enterprise level: building scalable, maintainable, and user-focused applications — not just UI.

---

## 🎯 Key Features

- Google Authentication (Firebase OAuth)
- Job application submission & tracking
- Role-based access (Admin / User)
- Admin dashboard
- Calendar scheduling system
- Secure payments (PayPal)
- Reviews & ratings system
- Fully responsive across all devices

---

## 🧠 Frontend Engineering Focus

This project emphasizes modern frontend engineering practices:

- Component-driven architecture using React
- Reusable and isolated UI components
- Feature-based folder structure
- Custom hooks for logic reuse
- Global state management with Context API
- Predictable and clean data flow
- Clear separation of concerns
- Explicit loading and error handling
- Responsive and accessible UI

---

## 🏗️ Architecture

| Layer             | Technology                   |
| ----------------- | ---------------------------- |
| Frontend          | React                        |
| Backend           | PHP (REST API)               |
| Database          | MySQL                        |
| Authentication    | Firebase + Google OAuth      |
| Payments          | PayPal                       |
| State Management  | React Context + Custom Hooks |
| API Communication | Axios                        |
| Scheduling        | React Big Calendar           |

---

## 📁 Project Structure

```bash
api/                # PHP REST API
public/             # Static assets

src/
 ├── components/    # Reusable UI components
 ├── pages/         # Application pages
 ├── features/      # Feature-based modules
 ├── hooks/         # Custom React hooks
 ├── context/       # Global state management
 ├── styles/        # Styling
 ├── App.js
 ├── index.js
 └── firebase.js

screenshots/        # UI previews


```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/EraCodeX/hco-company-platform.git
cd hco-company-platform

```

2. Install dependencies
   npm install

# or

yarn install

3. Setup environment variables

Create a .env file in the root directory:

REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_id

4. Run locally
   npm start

🧪 Engineering Workflow

Feature-based branching (feature/_, fix/_, docs/\*)

Pull request workflow

Clean and conventional commit messages

Stable production-ready main branch

Documentation treated as part of the product

💡 Design Decisions

Used React Context + custom hooks instead of Redux for simpler and scalable state management

Applied feature-based architecture to improve maintainability and scalability

Separated frontend and backend using REST API

Focused on reusable components for long-term scalability

Integrated third-party services (authentication and payments) to simulate real-world production systems

🚀 What This Project Demonstrates

Ability to build production-ready applications

Strong understanding of frontend architecture

Experience with real-world integrations

Clean, scalable, and maintainable code practices

Thinking like an engineer, not just implementing UI

## 📸 Screenshots

![Dashboard](screenshots/dashboard.png)
![Application](screenshots/application.png)
![Payment](screenshots/payment.png)
