import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { jobListings } from "../utils/Data";
import "../styles/Jobs.css";
import { Search } from "lucide-react";

function Jobs() {
  const { t } = useLanguage();
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const navigate = useNavigate();

  const filteredJobs = jobListings.filter((job) =>
    t(job.titleKey).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setShowMessage(filteredJobs.length === 0);
  }, [filteredJobs]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || user.email === "erahidaj@gmail.com") {
        setApplications([]);
        setLoadingApplications(false);
        return;
      }

      try {
        setLoadingApplications(true);

        const response = await fetch(
          `${process.env.REACT_APP_API_BASE}/api/get-application.php?email=${encodeURIComponent(user.email)}`,
        );
        const data = await response.json();

        if (data.success) {
          setApplications(data.applications);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoadingApplications(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleApplyNow = (jobTitle) => {
    navigate("/application", { state: { jobTitle } });
  };

  const ApplicationSkeleton = () => {
    return (
      <div className="application-card skeleton-card">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-status"></div>
      </div>
    );
  };

  return (
    <div>
      <Header />

      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>

      <h2>{t("OpenPositions")}</h2>

      <div className="job-listings">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{t(job.titleKey)}</h3>
            <p>{job.location}</p>
            <p>{t(job.descriptionKey)}</p>
            <button
              onClick={() => handleApplyNow(t(job.titleKey))}
              className="apply-button"
            >
              {t("applyNow")}
            </button>
          </div>
        ))}
      </div>

      {showMessage && (
        <div className="no-jobs-message">
          <p>{t("noJobsFound")}</p>
        </div>
      )}

      <div className="applications-section">
        <h2>{t("yourApplications")}:</h2>

        {!user ? (
          <div className="login-prompt-wrapper">
            <p>
              {t(
                "You have not applied to any jobs yet. Please log in to apply.",
              )}
            </p>
          </div>
        ) : loadingApplications ? (
          <>
            <ApplicationSkeleton />
            <ApplicationSkeleton />
            <ApplicationSkeleton />
          </>
        ) : applications.length === 0 ? (
          <div className="no-applications-wrapper">
            <p>
              {t("noApplicationsYet") ||
                "You have not applied to any jobs yet."}
            </p>
          </div>
        ) : (
          applications.map((app, index) => {
            const differenceInDays = Math.floor(
              (new Date() - new Date(app.created_at)) / (1000 * 3600 * 24),
            );
            const status = differenceInDays <= 30 ? t("pending") : t("closed");
            const statusClass = differenceInDays <= 30 ? "pending" : "closed";

            return (
              <div key={index} className="application-card">
                <h3>
                  <strong>{app.name || "N/A"}</strong>
                </h3>
                <p>
                  <strong>{t("jobTitle")}:</strong> {app.jobTitle || "N/A"}
                </p>
                <p>
                  <strong>{t("appliedOn")}:</strong>{" "}
                  {app.created_at
                    ? new Date(app.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className={`status ${statusClass}`}>
                  <strong>{t("status")}:</strong> {status}
                </p>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Jobs;
