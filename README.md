# H&O Company — Construction Business Platform

![Status](https://img.shields.io/badge/status-production-green)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![Node](https://img.shields.io/badge/node-18.x-lightgreen)
![PHP](https://img.shields.io/badge/php-8.x-purple)
![Firebase](https://img.shields.io/badge/firebase-12.4.0-yellow)
![PayPal](https://img.shields.io/badge/PayPal-integration-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

**Production-ready web platform designed to digitalize construction company operations, customer interactions, and internal workflows.**

This project reflects a real-world business application built with **scalability, maintainability, and performance in mind** — not a demo or tutorial project.

🌐 **Live Demo:** [hocompany1.com](https://hocompany1.com/)

---

## 📸 Application Preview

<table>
  <tr>
    <td align="center">
      <img src="screenshots/homepage.jpg" alt="Homepage" width="450"/>
      <br/><br/>
      <strong>Responsive Homepage Experience</strong>
    </td>

    <td align="center">
      <img src="screenshots/dashboard.jpg" alt="Dashboard" width="450"/>
      <br/><br/>
      <strong>Administrative Dashboard</strong>
    </td>

  </tr>

  <tr>
    <td align="center">
      <img src="screenshots/application.jpg" alt="Application System" width="450"/>
      <br/><br/>
      <strong>Job Application Management</strong>
    </td>

    <td align="center">
      <img src="screenshots/payment.jpg" alt="Payment System" width="450"/>
      <br/><br/>
      <strong>PayPal Payment Integration</strong>
    </td>

  </tr>

  <tr>
    <td colspan="2" align="center">
      <img src="screenshots/build.jpg" alt="Construction Services" width="600"/>
      <br/><br/>
      <strong>Construction Service Platform</strong>
    </td>
  </tr>
</table>

## 🧩 Business Context

Construction companies typically manage job applications, scheduling, payments, and customer communication through disconnected tools or manual processes.

This fragmentation leads to:

- operational inefficiency
- lack of visibility
- poor user experience for both clients and administrators

---

## 💡 Solution Overview

H&O Company centralizes these workflows into a single web platform that enables:

- structured job application management
- role-based access and administration
- scheduling and calendar coordination
- secure online payments
- transparent ratings and feedback

The focus is on **real usability, clean UX, and long-term maintainability**, similar to production environments.

---

## ⚙️ Technical Architecture & Decisions

- **React** for a modular, component-driven frontend architecture
- **RESTful PHP API** with **MySQL** for backend data handling
- **Axios** for consistent and predictable API communication
- **React Context & custom hooks** to separate business logic from UI
- **Google OAuth** for frictionless authentication
- **PayPal integration** for real-world payment flows
- **React Big Calendar** for scheduling visualization

**Key priorities during development:**

- predictable data flow
- reusable and isolated components
- proper loading and error handling
- responsive behavior across devices

---

## ✨ Core Functionality

- User registration and Google authentication
- Job application submission and status tracking
- Role-based UI behavior (admin vs user views)
- Ratings and feedback system
- Calendar-based scheduling
- Secure payment handling

---

## 📁 Project Structure

```text
api/                → PHP REST API (auth, business logic, database access)
public/             → Static assets
src/
 ├─ components/     → Reusable UI components
 ├─ pages/          → Application pages
 ├─ features/       → Feature modules (Applications, Calendar)
 ├─ hooks/          → Custom React hooks
 ├─ context/        → Global state management
 ├─ styles/         → Component & page styles
 ├─ App.js          → Main React entry
 ├─ index.js        → ReactDOM render
 └─ firebase.js     → Firebase configuration
screenshots/        → Project screenshots
.env.example        → Environment variable template

```

## 💻 Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/EraCodeX/hco-company-platform.git
cd hco-company-platform


```

2️⃣ Install Dependencies

```
npm install
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
npm start
```
