import React, { useEffect, useState } from "react";
import "../../styles/ApplicationList.css";

function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/get-application.php`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setApplications(data.applications);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setError("An error occurred while fetching applications.");
      });
  }, []);
  const groupedApplications = applications.reduce((groups, app) => {
    const jobTitle = app.jobTitle || "Unknown";
    if (!groups[jobTitle]) {
      groups[jobTitle] = [];
    }
    groups[jobTitle].push(app);
    return groups;
  }, {});

  const handleFavoriteChange = (appId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(appId)) {
        return prevFavorites.filter((id) => id !== appId);
      } else {
        return [...prevFavorites, appId];
      }
    });
  };

  const handleRowClick = (app) => {
    setSelectedApp(app);
  };

  const handleSendEmail = () => {
    if (selectedApp) {
      const emailBody = `Hello,\n\nI have received the application of ${selectedApp.name} for the position of ${selectedApp.jobTitle}.\n\nYou can contact them at the email address: ${selectedApp.email}\n\nThank you!`;
      const mailtoLink = `mailto:?subject=Application for ${selectedApp.jobTitle
        }&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    }
  };

  return (
    <div className="applications-container">
      <h2>Applications List</h2>
      {error && <p className="error-message">{error}</p>}
      {selectedApp && (
        <div className="selection-container">
          <h3>
            {selectedApp.name} - {selectedApp.jobTitle}
          </h3>
          <button onClick={handleSendEmail}>Send Email</button>
        </div>
      )}
      {Object.keys(groupedApplications).map((jobTitle) => (
        <div key={jobTitle}>
          <h3>{jobTitle}</h3>
          <table>
            <thead>
              <tr>
                <th>Favorite</th>
                <th>#</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {groupedApplications[jobTitle].map((app, index) => (
                <tr
                  key={app.id}
                  onClick={() => handleRowClick(app)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedApp?.id === app.id ? "#e0f7fa" : "white",
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={favorites.includes(app.id)}
                      onChange={() => handleFavoriteChange(app.id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_API_BASE}/api/uploads/${encodeURIComponent(
                        app.resume.split("/").pop()
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ApplicationsList;