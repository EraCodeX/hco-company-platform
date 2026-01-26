import React, { useState, useEffect, useContext } from "react";
import "../../styles/Dashboard.css";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [visitors, setVisitors] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (user && user.email === "erahidaj@gmail.com") {
      setIsAdmin(true);
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetch(`${process.env.REACT_APP_API_BASE}/api/get-application.php`)
        .then((response) => response.json())
        .then((data) => {
          if (data.applications) {
            setApplications(data.applications);
          }
        })
        .catch((error) => console.error("Error fetching applications:", error));
    }
  }, [isAdmin]);

  // Fetch registered users
  useEffect(() => {
    if (isAdmin) {
      fetch(`${process.env.REACT_APP_API_BASE}/api/registeredUser.php`)
        .then((response) => response.json())
        .then((data) => {
          if (data.total) {
            setUsers(parseInt(data.total, 10));
          }
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [isAdmin]);

  // Fetch ratings and comments
  useEffect(() => {
    if (isAdmin) {
      fetch(`${process.env.REACT_APP_API_BASE}/api/ratingsPage.php`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ratings) {
            setRatings(data.ratings);
          }
        })
        .catch((error) => console.error("Error fetching ratings:", error));
    }
  }, [isAdmin]);

  // Fetch page visitors
  useEffect(() => {
    if (isAdmin) {
      fetch(`${process.env.REACT_APP_API_BASE}/api/pageVisit.php`)
        .then((response) => response.json())
        .then((data) => {
          if (data.visitors) {
            setVisitors(data.visitors);
          }
        })
        .catch((error) => console.error("Error fetching visitors:", error));
    }
  }, [isAdmin]);

  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>

      {isAdmin ? (
        <div className="stats">
          <div className="stat-card">
            <h2>Job Applicants</h2>
            <p>
              {applications && applications.length
                ? applications.length
                : "No applications"}
            </p>
          </div>

          <div className="stat-card">
            <h2>Registered Users</h2>
            <p>{users > 0 ? users : "No registered users"}</p>
          </div>

          <div className="stat-card">
            <h2>Ratings</h2>
            <p>{ratings.length}</p>
          </div>

          <div className="stat-card">
            <h2>Page Visitors</h2>
            <p>{visitors > 0 ? visitors : "No visitors yet"}</p>
          </div>
        </div>
      ) : (
        <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
          <i className="fa fa-ban" style={{ marginRight: "10px" }}></i>
          You do not have access to this dashboard
        </p>
      )}
    </div>
  );
};

export default Dashboard;