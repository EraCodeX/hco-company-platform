# H&O Company — Construction Business Platform

![Status](https://img.shields.io/badge/status-production-green)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![Node](https://img.shields.io/badge/node-18.x-lightgreen)
![PHP](https://img.shields.io/badge/php-8.x-purple)
![Firebase](https://img.shields.io/badge/firebase-12.4.0-yellow)
![PayPal](https://img.shields.io/badge/PayPal-integration-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

**Production-ready web platform designed to digitalize construction company operations, customer interactions, and internal workflows.**

🌐 **Live Demo:** [hocompany1.com](https://hocompany1.com/)

---

# 📸 Application Preview

<div align="center">

<table>
<tr>
<td align="center">
<img src="screenshots/homepage.jpg" alt="Homepage" width="450">
<br/><br/>
<b>Responsive Homepage Interface</b>
</td>

<td align="center">
<img src="screenshots/dashboard.jpg" alt="Dashboard" width="450">
<br/><br/>
<b>Admin Dashboard System</b>
</td>
</tr>

<tr>
<td align="center">
<img src="screenshots/application.jpg" alt="Application" width="450">
<br/><br/>
<b>Job Application Workflow</b>
</td>

<td align="center">
<img src="screenshots/payment.jpg" alt="Payment" width="450">
<br/><br/>
<b>Secure Payment Integration</b>
</td>
</tr>

<tr>
<td colspan="2" align="center">
<img src="screenshots/build.jpg" alt="Build Feature" width="450">
<br/><br/>
<b>Construction Service Platform</b>
</td>
</tr>
</table>

</div>

---

# 🧩 Business Context

Construction companies typically manage job applications, scheduling, payments, and customer communication through disconnected tools or manual processes.

This fragmentation leads to:

- operational inefficiency
- lack of visibility
- poor user experience for both clients and administrators

---

# 💡 Solution Overview

H&O Company centralizes these workflows into a single web platform that enables:

- Structured job application management
- Role-based access and administration
- Scheduling and calendar coordination
- Secure online payments
- Transparent ratings and feedback

The focus is on **real usability, clean UX, and long-term maintainability**, similar to production environments.

---

# ⚙️ Technical Architecture & Decisions

- **React** for a modular, component-driven frontend architecture
- **RESTful PHP API** with **MySQL** for backend data handling
- **Axios** for API communication
- **React Context + custom hooks** for state management
- **Google OAuth** for authentication
- **PayPal integration** for payments
- **React Big Calendar** for scheduling

## Development Priorities

- Predictable data flow
- Reusable and isolated components
- Proper loading and error handling
- Responsive design across devices

---

# ✨ Core Functionality

- Google authentication
- Job application submission & tracking
- Role-based UI (Admin / User)
- Ratings & feedback system
- Calendar scheduling
- Secure payment handling

---

# 📁 Project Structure

```text
api/                # PHP REST API
public/             # Static assets

src/
 ├─ components/
 ├─ pages/
 ├─ features/
 ├─ hooks/
 ├─ context/
 ├─ styles/
 ├─ App.js
 ├─ index.js
 └─ firebase.js

screenshots/
.env.example
```

---

# 💻 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/erahidaj/hco-company.git

cd company-platform
```

---

## 2. Install Dependencies

### Using npm

```bash
npm install
```

### Using yarn

```bash
yarn install
```

---

## 3. Setup Environment Variables

Create a `.env` file at the project root:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key

REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain

REACT_APP_FIREBASE_PROJECT_ID=your_project_id

REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

# ▶️ Run Locally

### Using npm

```bash
npm start
```

### Using yarn

```bash
yarn start
```

---

# 📱 Responsive Design

The platform is optimized for:

- Desktop Devices
- Tablets
- Mobile Devices
- Large Screens

The UI adapts seamlessly across different resolutions while maintaining accessibility and performance.

---

# 🔒 Authentication & Security

- Firebase Authentication
- Google OAuth Login
- Protected User Sessions
- Secure Payment Processing
- Role-Based Access Control

---

# 🚀 Engineering Focus

This project was developed with emphasis on:

- Scalable frontend architecture
- Reusable UI components
- Clean project organization
- Maintainable code structure
- Real-world business workflows
- Responsive user experience

---

# 👩‍💻 Developer

### Era Hidaj

Frontend Developer focused on building scalable, responsive, and production-ready web applications with modern UI architecture and real-world functionality.

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
