import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../../styles/Application.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useLanguage } from "../../context/LanguageContext";
import emailjs from "@emailjs/browser";
import { jobListings } from "../../utils/Data";

const SERVICE_ID = "service_a4kq521";
const TEMPLATE_AUTO_REPLY = "template_i17ojkq";
const PUBLIC_KEY = "tZ9j_xguc6NS2lXZJ";

function Application() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const jobTitle = location.state?.jobTitle || "job";
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const resumeInputRef = useRef(null);

  const selectedJob = jobListings.find((job) => t(job.titleKey) === jobTitle);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !validateEmail(email) || !resume) {
      setMessage(t("fillAllFields"));
      setModalVisible(true);
      document.body.classList.add("modal-open");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("jobTitle", jobTitle);

    try {
      await fetch(`${process.env.REACT_APP_API_BASE}/api/save-application.php`, {
        method: "POST",
        body: formData,
      });

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_AUTO_REPLY,
        {
          applicant_name: name,
          applicant_email: email,
          job_title: jobTitle,
        },
        PUBLIC_KEY
      );

      setMessage(t("applicationSuccess"));
      setName("");
      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      document.body.classList.add("modal-open");
      setModalVisible(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setMessage(t("applicationSuccess"));
      setModalVisible(true);
      document.body.classList.add("modal-open");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <div>
      <Header />

      <div className="back-to-jobs">
        <div onClick={() => navigate("/jobs")} className="back-btn-jobs">
          {t("backToAllJobs")}
        </div>
      </div>

      <div className="application-container">
        {/* LEFT SIDE — Job Description */}
        <div className="application-left">
          {selectedJob ? (
            <>
              <h2>{t(selectedJob.titleKey)}</h2>
              <p className="job-location">{selectedJob.location}</p>
              <p className="job-description">{t(selectedJob.descriptionKey)}</p>

              <h3>{t("responsibilities")}</h3>
              <ul>
                {selectedJob.responsibilities?.map((itemKey, i) => (
                  <li key={i}>{t(itemKey)}</li>
                ))}
              </ul>

              <h3>{t("requirements")}</h3>
              <ul>
                {selectedJob.requirements?.map((itemKey, i) => (
                  <li key={i}>{t(itemKey)}</li>
                ))}
              </ul>

              <p className="job-deadline">
                <strong>{t("deadline")}:</strong> {selectedJob.deadline}
              </p>
            </>
          ) : (
            <p>{t("jobDetailsNotFound")}.</p>
          )}
        </div>

        {/* RIGHT SIDE — Application Form */}
        <div className="application-right">
          <h3>{t(selectedJob?.titleKey || "job")}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t("name")}:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{t("email")}:</label>
              <input type="email" value={email} readOnly />
            </div>

            <div className="form-group">
              <label>{t("resume")} (.pdf):</label>
              <input
                type="file"
                ref={resumeInputRef}
                onChange={(e) => setResume(e.target.files[0])}
                accept=".pdf"
                required
              />
            </div>

            <button type="submit">{t("Submit")}</button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{t("formSubmitted")}</h2>
            <i
              className="fas fa-check-circle"
              style={{ color: "green", fontSize: "35px" }}
            ></i>
            <p>{message}</p>
          </div>
        </div>
      )}

      {/* Admin link */}
      {user?.email === "erahidaj@gmail.com" && (
        <Link to="/applications" className="admin-link">
          {t("seeApplications")}
        </Link>
      )}

      <Footer />
    </div>
  );
}

export default Application;









