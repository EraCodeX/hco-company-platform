import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@fortawesome/fontawesome-free/css/all.min.css";

import CookieConsentBanner from "./components/CookieConsent/CookieConsentBanner";
import Home from "./pages/Home/Home";
import Features from "./pages/Features/Features";
import Dashboard from "./pages/Dashboard/Dashboard";

import ProjectsPage from "./pages/Projects/Projects";
import BuildCostCalculator from "./features/BuildCost/BuildCostCalculator";
import Materials from "./pages/Materials/Materials";
import EventCalendar from "./features/EventCalendar/EventCalendar";
import Payments from "./features/Payments/Payments";
import Confirmation from "./features/Confirmation/Confirmation";

import Jobs from "./pages/Jobs/Jobs";
import Contact from "./pages/Contact/Contact";
import Reviews from "./pages/Reviews/Reviews";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";

import ApplicationForm from "./features/Applications/ApplicationForm";
import ApplicationsList from "./features/Applications/ApplicationsList";

import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

import "./styles/global.css";

function App() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (window.AOS && !isMobile) {
      window.AOS.init({
        duration: 700,
        easing: "ease-out",
        once: true,
        offset: 80,
      });
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <LanguageProvider>
          <AuthProvider>
            <CookieConsentBanner />

            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/buildcostpro" element={<BuildCostCalculator />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/dashboard/calendar" element={<EventCalendar />} />
                <Route path="/features" element={<Features />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/application" element={<ApplicationForm />} />
                <Route
                  path="/dashboard/applications"
                  element={<ApplicationsList />}
                />
                <Route path="/payments" element={<Payments />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/help" element={<Help />} />
                <Route path="/confirmation" element={<Confirmation />} />
              </Routes>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
