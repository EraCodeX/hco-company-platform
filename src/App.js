import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@fortawesome/fontawesome-free/css/all.min.css";

import CookieConsentBanner from "./components/CookieConsentBanner";
import HomePage from "./pages/home/HomePage";
import FeaturesSection from "./pages/home/FeaturesSection";
import DashboardPage from "./pages/home/DashboardPage";

import ProjectsPage from "./pages/projects/ProjectsPage";
import BuildCostCalculator from "./pages/projects/BuildCostCalculator";
import MaterialsPage from "./pages/projects/MaterialsPage";
import ProjectCalendar from "./pages/projects/ProjectCalendar";
import Payments from "./pages/projects/buildcostpro/Payments";
import Confirmation from "./pages/projects/buildcostpro/Confirmation";

import JobsPage from "./pages/JobsPage";
import ContactPage from "./pages/ContactPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/help/HelpPage";

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
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/buildcostpro" element={<BuildCostCalculator />} />
                <Route path="/materials" element={<MaterialsPage />} />
                <Route path="/calendar" element={<ProjectCalendar />} />
                <Route path="/features" element={<FeaturesSection />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/application" element={<ApplicationForm />} />
                <Route path="/applications" element={<ApplicationsList />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/help" element={<HelpPage />} />
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
