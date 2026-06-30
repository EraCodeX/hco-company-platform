# H&O Construction Platform

![Status](https://img.shields.io/badge/status-production-green)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![PHP](https://img.shields.io/badge/php-8.x-purple)
![MySQL](https://img.shields.io/badge/mysql-database-blue)
![Firebase](https://img.shields.io/badge/firebase-authentication-yellow)
![PayPal](https://img.shields.io/badge/paypal-integration-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Production-ready construction management platform designed to streamline customer interactions, job applications, scheduling, payments, and administrative workflows through a centralized digital experience.

🌐 **Live Demo:** https://hocompany1.com/

---

# 📸 Application Preview

<div align="center">

<table>
<tr>
<td align="center">
<img src="screenshots/homepage.jpg" alt="Homepage" width="450">
<br><br>
<b>Responsive Homepage Experience</b>
</td>

<td align="center">
<img src="screenshots/dashboard.jpg" alt="Dashboard" width="450">
<br><br>
<b>Administrative Dashboard</b>
</td>
</tr>

<tr>
<td align="center">
<img src="screenshots/application.jpg" alt="Application System" width="450">
<br><br>
<b>Job Application Management</b>
</td>

<td align="center">
<img src="screenshots/payment.jpg" alt="Payment System" width="450">
<br><br>
<b>PayPal Payment Integration</b>
</td>
</tr>

<tr>
<td colspan="2" align="center">
<img src="screenshots/build.jpg" alt="Construction Services" width="450">
<br><br>
<b>Construction Service Platform</b>
</td>
</tr>
</table>

</div>

---

# 🏗 Business Problem

Construction companies often manage applications, customer communication, scheduling, and payments across multiple disconnected systems.

This approach typically results in:

- Manual administrative work
- Fragmented customer experiences
- Reduced operational visibility
- Inefficient workflow management
- Increased communication overhead

---

# 💡 Solution

H&O Construction Platform centralizes business operations into a single web application that supports both customers and administrators.

The platform enables:

- Online job applications
- Administrative workflow management
- Appointment scheduling
- Secure online payments
- Customer ratings and feedback
- Role-based user experiences

The goal is to provide a scalable and maintainable foundation for modern construction businesses.

---

# 🚀 Business Impact

- Centralized customer and administrative workflows
- Reduced manual application processing
- Improved scheduling organization
- Digital payment processing
- Enhanced user experience across all devices
- Increased operational transparency

---

# 🛠 Tech Stack

## Frontend

- React
- JavaScript
- React Router
- Axios
- CSS
- Firebase SDK

## Backend

- PHP
- MySQL
- REST API

## Integrations

- Firebase Authentication
- Google OAuth
- PayPal
- React Big Calendar

---

# ⚙️ Technical Architecture

The application follows a component-based architecture focused on maintainability, scalability, and predictable data flow.

### Key Architectural Decisions

- Modular React component structure
- RESTful API communication
- Custom React Hooks
- Context-based state management
- Reusable UI components
- Responsive-first design
- Separation of concerns

### Development Priorities

- Scalability
- Maintainability
- Performance
- User Experience
- Clean Code Practices

---

# ✨ Core Features

## Authentication

- Google OAuth Login
- Firebase Authentication
- Protected User Sessions

## Administration

- Role-Based Access Control
- Dashboard Management
- User Activity Monitoring

## Applications

- Job Application Submission
- Application Tracking
- Administrative Review Workflow

## Scheduling

- Calendar Management
- Appointment Coordination
- Event Organization

## Payments

- Secure PayPal Integration
- Payment Processing Workflow

## Feedback

- Ratings System
- Customer Reviews
- Feedback Collection

---

# 📂 Project Structure

```text
hco-construction/
│
├── api/
├── public/
├── screenshots/
│
├── src/
│   ├── assets/
│   │   ├── about/
│   │   ├── activities/
│   │   ├── branding/
│   │   ├── contact/
│   │   ├── features/
│   │   ├── flags/
│   │   ├── hero/
│   │   ├── materials/
│   │   ├── partners/
│   │   ├── payments/
│   │   └── projects/
│   │
│   ├── components/
│   │   ├── ChatbaseLoader/
│   │   ├── CookieConsent/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── LanguageSelector/
│   │   └── Notifications/
│   │
│   ├── context/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── sections/
│   ├── styles/
│   ├── utils/
│   │
│   ├── App.js
│   └── App.test.js
│
├── .env.example
├── package.json
└── README.md
```

---

# 🔒 Security

The platform incorporates multiple security-focused practices:

- Firebase Authentication
- Google OAuth Integration
- Protected Routes
- Role-Based Authorization
- Secure API Communication
- Secure Payment Processing

---

# 📱 Responsive Design

Optimized for:

- Desktop Devices
- Laptops
- Tablets
- Mobile Devices
- Large Displays

The interface adapts seamlessly across screen sizes while maintaining usability and accessibility.

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/erahidaj/hco-construction.git

cd hco-construction
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Run Development Server

```bash
npm start
```

---

# 🎯 Engineering Highlights

- Production-ready architecture
- Responsive UI implementation
- Modular React design
- REST API integration
- Authentication workflows
- Payment processing integration
- Business-oriented functionality
- Reusable component ecosystem

---

# 👨‍💻 Author

### Era Hidaj

Frontend Developer specializing in modern web applications, scalable UI architecture, and business-focused digital solutions.

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found this project useful, consider giving it a star.
