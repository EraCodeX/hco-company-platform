# H&O Construction Platform

![Status](https://img.shields.io/badge/status-production-green)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![PHP](https://img.shields.io/badge/php-8.x-purple)
![MySQL](https://img.shields.io/badge/mysql-database-blue)
![Firebase](https://img.shields.io/badge/firebase-authentication-yellow)
![PayPal](https://img.shields.io/badge/paypal-integration-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

**Production-oriented full-stack construction business platform designed to centralize customer interactions, job applications, payments, reviews, analytics, and administrative workflows.**

H&O Construction combines a modern React frontend with a PHP/MySQL backend and third-party integrations to provide a responsive digital experience for both customers and administrators.

🌐 **Live Website:** [hocompany1.com](https://hocompany1.com/)

---

## 📸 Application Preview

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="screenshots/homepage.jpg" alt="H&O Construction Homepage" width="450"/>
      <br/><br/>
      <strong>Responsive Homepage Experience</strong>
    </td>
    <td align="center">
      <img src="screenshots/dashboard.jpg" alt="H&O Construction Dashboard" width="450"/>
      <br/><br/>
      <strong>Administrative Dashboard</strong>
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="screenshots/application.jpg" alt="Job Application System" width="450"/>
      <br/><br/>
      <strong>Job Application Workflow</strong>
    </td>
    <td align="center">
      <img src="screenshots/payment.jpg" alt="PayPal Payment System" width="450"/>
      <br/><br/>
      <strong>Payment Workflow</strong>
    </td>
  </tr>

  <tr>
    <td colspan="2" align="center">
      <img src="screenshots/build.jpg" alt="Construction Services Platform" width="600"/>
      <br/><br/>
      <strong>Construction Services Platform</strong>
    </td>
  </tr>
</table>

</div>

---

## 🏗 Business Context

Construction businesses often manage customer communication, job applications, project inquiries, payments, reviews, and administrative processes through multiple disconnected systems.

This can lead to:

- Repetitive administrative work
- Fragmented customer experiences
- Limited visibility into business activity
- Inefficient workflow management
- Increased communication overhead
- Difficulty maintaining and scaling digital operations

H&O Construction addresses these challenges by bringing key business workflows together in one centralized web platform.

---

## 💡 Solution

H&O Construction provides a unified digital environment for customers, authenticated users, and administrators.

The platform supports:

- Online job applications
- User authentication
- Administrative workflows
- Construction cost estimation
- Online payments
- Customer ratings and reviews
- Business analytics
- Website activity monitoring
- Multilingual experiences
- Responsive navigation and interfaces

The goal is to provide a maintainable and scalable foundation for a modern construction business while delivering a consistent user experience across devices.

---

## 🚀 Business Value

The platform helps digitalize core construction business operations by providing:

- Centralized customer and administrative workflows
- Reduced manual application processing
- Structured customer interactions
- Digital payment processing
- Improved visibility into business activity
- Customer feedback collection
- Business analytics
- Consistent experiences across desktop, tablet, and mobile

---

## 🛠 Tech Stack

### Frontend

- React 18
- JavaScript
- React Router
- Fetch API
- React Context
- Custom React Hooks
- Firebase SDK
- Google OAuth
- Chart.js
- React Chart.js 2
- React Select
- React Toastify
- Lucide React
- Font Awesome
- Bootstrap
- EmailJS

### Backend

- PHP 8.x
- MySQL
- REST-style API endpoints

### Integrations

- Firebase Authentication
- Google OAuth
- PayPal
- EmailJS

### Development & Deployment

- npm
- Git
- GitHub
- XAMPP
- Apache
- Production web hosting

---

## ⚙️ Technical Architecture

The project follows a separated frontend/backend architecture.

```text
                         ┌──────────────────────┐
                         │        User          │
                         │       Browser        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │                      │
                         │ Components / Pages   │
                         │ Context / Hooks      │
                         │ Responsive UI        │
                         └──────────┬───────────┘
                                    │
                               HTTP / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    PHP Backend API   │
                         │                      │
                         │ Business Logic       │
                         │ Data Processing      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │        MySQL         │
                         │      Database        │
                         └──────────────────────┘


                    External Services / Integrations
                    ────────────────────────────────
                    Firebase Authentication
                    Google OAuth
                    PayPal
                    EmailJS
```

### Key Architectural Decisions

- Component-based React architecture
- Clear frontend/backend separation
- REST-style API communication
- Context-based shared state management
- Reusable React components
- Custom hooks for reusable frontend logic
- Environment-based configuration
- Responsive-first UI implementation
- Separation of UI and business logic
- Server-side database access

### Development Priorities

- Maintainability
- Reusability
- Predictable data flow
- Responsive behavior
- Performance
- User experience
- Separation of concerns
- Clean project organization

---

## ✨ Core Features

### 🔐 Authentication

- Firebase Authentication
- Google OAuth sign-in
- Authenticated user sessions
- User profile integration
- Protected application experiences

### 📋 Job Applications

- Online job application submission
- Structured application forms
- Backend application processing
- Administrative application visibility
- Application workflow management

### 📊 Administrative Dashboard

The dashboard provides an overview of important business activity, including:

- Total applications
- Registered clients
- Customer ratings
- Website visitors
- Business analytics
- Latest customer reviews

### 🏗 Construction Cost Estimation

The platform includes a construction cost estimation workflow that allows users to configure project-related information and receive calculated estimates.

Depending on the selected configuration, the estimator can work with values such as:

- Object type
- Construction area
- Quality level
- Material costs
- Labor costs
- Transportation costs
- Discounts

### 💳 Payments

- PayPal integration
- Online payment workflow
- Frontend payment interaction
- Backend payment-related processing

### ⭐ Ratings & Reviews

- Customer rating submission
- Written customer reviews
- Average rating calculation
- Review visualization
- Dashboard review overview

### 📈 Business Analytics

- Application statistics
- Registered user statistics
- Rating information
- Website visitor information
- Chart-based analytics visualization

### 🌍 Multilingual Interface

The application provides multilingual UI support through reusable translation utilities and language-selection components.

### 🍪 Cookie Preferences

The platform includes a cookie preference interface for managing supported cookie categories and user consent choices.

### 📱 Responsive Navigation

The navigation system adapts across:

- Desktop
- Laptop
- Tablet
- iPad
- iPhone
- Android mobile devices

---

## 📂 Project Structure

The repository is organized into two primary application layers: `frontend` and `backend`.

```text
hco-construction/
│
├── frontend/
│   │
│   ├── public/
│   │   └── Static frontend assets
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── about/
│   │   │   ├── activities/
│   │   │   ├── branding/
│   │   │   ├── contact/
│   │   │   ├── features/
│   │   │   ├── flags/
│   │   │   ├── hero/
│   │   │   ├── materials/
│   │   │   ├── partners/
│   │   │   ├── payments/
│   │   │   └── projects/
│   │   │
│   │   ├── components/
│   │   │   ├── ChatbaseLoader/
│   │   │   ├── CookieConsent/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── LanguageSelector/
│   │   │   └── Notifications/
│   │   │
│   │   ├── context/
│   │   │   └── Shared application state
│   │   │
│   │   ├── features/
│   │   │   └── Feature-specific modules
│   │   │
│   │   ├── hooks/
│   │   │   └── Custom React hooks
│   │   │
│   │   ├── pages/
│   │   │   └── Application pages
│   │   │
│   │   ├── sections/
│   │   │   └── Reusable page sections
│   │   │
│   │   ├── styles/
│   │   │   └── Shared and global styles
│   │   │
│   │   ├── utils/
│   │   │   └── Utilities and translations
│   │   │
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── firebase.js
│   │   └── index.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   │
│   ├── get-application.php
│   ├── registeredUser.php
│   ├── ratingsPage.php
│   ├── pageVisit.php
│   ├── save-application.php
│   ├── payments.php
│   ├── config.php
│   └── ...
│
├── screenshots/
│   └── Project screenshots used in this README
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🏛 Frontend / Backend Separation

### Frontend

The `frontend/` directory contains the React application and is responsible for:

- UI rendering
- Navigation and routing
- Authentication state
- Forms
- User interactions
- Responsive behavior
- API requests
- Dashboard visualization
- Language selection
- Client-side application logic

### Backend

The `backend/` directory contains the PHP server-side layer and is responsible for:

- Database communication
- Data processing
- Application-related operations
- Rating and review data
- Registered user statistics
- Website visitor statistics
- Payment-related operations
- Backend configuration

This separation provides clearer responsibility boundaries and makes the application easier to maintain and extend.

---

## 🔒 Security

The project follows several security-oriented practices:

- Firebase-based authentication
- Google OAuth integration
- Protected authenticated experiences
- Environment-based frontend configuration
- Server-side database access
- Separation between frontend and backend code
- Production credentials excluded from source control
- Private database credentials kept outside frontend code

> **Important:** Variables prefixed with `REACT_APP_` are included in the compiled React frontend. They should never contain database passwords, private server credentials, or other backend secrets.

---

## 🌍 Environment Variables

Create a `.env` file inside:

```text
frontend/.env
```

Example configuration:

```env
REACT_APP_API_BASE=http://localhost/kompani-ndertimi

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id

REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_AUTO_REPLY=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Do not commit the real `.env` file.

Instead, maintain a `.env.example` file containing placeholder values for the configuration required to run the project.

---

## 💻 Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/erahidaj/hco-construction.git
cd hco-construction
```

### 2. Install Frontend Dependencies

Enter the frontend directory:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create:

```text
frontend/.env
```

Add the required environment variables for:

- Backend API
- Firebase
- Google OAuth
- PayPal
- EmailJS

### 4. Configure the Backend

For local development with XAMPP, place the repository inside the XAMPP `htdocs` directory.

Example:

```text
C:\xampp\htdocs\hco-construction\
```

The local project structure should look like:

```text
C:\xampp\htdocs\hco-construction\
│
├── frontend\
└── backend\
```

Start the required local services from XAMPP:

- Apache
- MySQL

Configure the PHP backend with the appropriate local database credentials.

### 5. Start the React Application

From:

```text
hco-construction/frontend/
```

run:

```bash
npm start
```

The development application will normally be available at:

```text
http://localhost:3000
```

---

## 📦 Production Build

Create an optimized React production build from the frontend directory:

```bash
cd frontend
npm run build
```

The generated production files will be created inside:

```text
frontend/build/
```

The contents of the generated build directory should not be manually edited.

---

## 🌐 Production Deployment

The application is deployed as a live construction business platform.

**Production Website:** [hocompany1.com](https://hocompany1.com/)

In production, the React frontend communicates with PHP backend endpoints deployed on the server.

Private deployment configuration, credentials, and environment-specific secrets are intentionally excluded from the public repository.

---

## 📱 Responsive Design

The user interface is designed to adapt across multiple screen sizes and device categories:

- Desktop monitors
- Laptops
- Tablets
- iPads
- iPhones
- Android smartphones
- Large displays

Responsive behavior is implemented across navigation, content sections, forms, dashboard components, dropdowns, and interactive elements.

---

## 🧠 Engineering Principles

### Separation of Concerns

Frontend UI, shared state, API communication, backend processing, utilities, and styling are separated into dedicated areas.

### Component Reusability

Common interface elements are implemented as reusable React components to reduce duplication.

### Predictable State Management

React Context is used for application state that needs to be shared across multiple components.

### Custom Hooks

Reusable frontend behavior can be extracted into custom hooks to keep components focused on presentation and interaction.

### Environment-Based Configuration

Environment-dependent configuration is kept outside the main source code.

### Responsive Architecture

The interface is designed to maintain usability across desktop, tablet, and mobile layouts.

### Maintainable Styling

Shared styles and component-level CSS help keep UI behavior organized and easier to maintain.

---

## 🔄 Development Workflow

A feature-based Git workflow can be used for development.

```text
main
│
├── feature/*
├── fix/*
├── refactor/*
└── docs/*
```

Create a feature branch:

```bash
git checkout main
git pull
git checkout -b feature/feature-name
```

After completing and testing the changes:

```bash
git add .
git commit -m "feat: describe the change"
git push -u origin feature/feature-name
```

Changes can then be reviewed through a Pull Request before being merged into `main`.

---

## 📝 Commit Convention

Example commit messages:

```text
feat: add new application workflow
fix: improve mobile navigation
fix: correct profile menu layout
refactor: separate frontend and backend
style: improve responsive header
docs: update project documentation
chore: update dependencies
```

---

## 🎯 Engineering Highlights

- Full-stack construction business application
- Separated frontend/backend architecture
- React component-driven frontend
- PHP/MySQL backend
- REST-style frontend/backend communication
- Firebase Authentication
- Google OAuth integration
- PayPal payment workflow
- EmailJS integration
- Administrative dashboard
- Job application workflow
- Construction cost estimation
- Customer ratings and reviews
- Business analytics
- Website visitor tracking
- Multilingual interface
- Cookie preference management
- Responsive navigation
- Reusable React components
- React Context architecture
- Custom hooks
- Environment-based configuration
- Production deployment

---

## 🔮 Future Improvements

Potential future improvements include:

- Advanced dashboard filtering
- Expanded administrative workflows
- More granular role-based permissions
- Enhanced reporting and analytics
- Automated frontend and backend testing
- API standardization
- Improved accessibility coverage
- CI/CD automation
- Production monitoring
- Centralized error reporting

---

## 👩‍💻 Author

### Era Hidaj

Frontend Developer focused on modern React applications, responsive user interfaces, maintainable frontend architecture, and business-oriented digital solutions.

---

## 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for additional information.

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a star.
