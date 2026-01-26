import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import CookieConsent from "./components/CookieConsent";
import DisableBrowserBack from "./components/DisableBrowserBack";

import HomePage from "./pages/home/HomePage";
import Features from "./pages/home/Features";
import Dashboard from "./pages/home/Dashboard";

import Projects from "./pages/projects/Projects";
import CostCalculator from "./pages/projects/BuildCostPro";
import Materials from "./pages/projects/Materials";
import Calendar from "./pages/projects/Calendar";
import Payments from "./pages/projects/buildcostpro/Payments";
import Confirmation from "./pages/projects/buildcostpro/Confirmation";

import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Help from "./pages/help/Help";

import Application from "./features/Applications/Application";
import ApplicationsList from "./features/Applications/ApplicationsList";

import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

import "./styles/index.css";

function App() {
  useEffect(() => {
  if (window.AOS) {
    window.AOS.init({
      duration: 3000,
      easing: "ease-in-out",
      once: true,
    });
  }
}, []);

  return (
    <Router>
      <DisableBrowserBack />

      <LanguageProvider>
        <AuthProvider>
          <CookieConsent />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/buildcostpro" element={<CostCalculator />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/features" element={<Features />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/application" element={<Application />} />
              <Route path="/applications" element={<ApplicationsList />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/help" element={<Help />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;


