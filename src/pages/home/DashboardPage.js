import React, { useState, useEffect, useContext, useMemo } from "react";
import "../../styles/dashboard.css";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [visitors, setVisitors] = useState(0);

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    if (user?.email === "erahidaj@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [applicationsRes, usersRes, ratingsRes, visitorsRes] =
          await Promise.all([
            fetch(`${API_BASE}/api/get-application.php`),
            fetch(`${API_BASE}/api/registeredUser.php`),
            fetch(`${API_BASE}/api/ratingsPage.php`),
            fetch(`${API_BASE}/api/pageVisit.php`),
          ]);

        if (
          !applicationsRes.ok ||
          !usersRes.ok ||
          !ratingsRes.ok ||
          !visitorsRes.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }

        const [applicationsData, usersData, ratingsData, visitorsData] =
          await Promise.all([
            applicationsRes.json(),
            usersRes.json(),
            ratingsRes.json(),
            visitorsRes.json(),
          ]);

        setApplications(applicationsData.applications || []);
        setUsers(Number(usersData.total) || 0);
        setRatings(ratingsData.ratings || []);
        setVisitors(Number(visitorsData.visitors) || 0);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE, isAdmin]);

  const averageRating = useMemo(() => {
    if (!ratings.length) return "0.0";
    const total = ratings.reduce(
      (sum, item) => sum + Number(item.rating || 0),
      0,
    );
    return (total / ratings.length).toFixed(1);
  }, [ratings]);

  const satisfactionRate = useMemo(() => {
    if (!ratings.length) return "0%";
    const positive = ratings.filter((item) => Number(item.rating) >= 4).length;
    return `${Math.round((positive / ratings.length) * 100)}%`;
  }, [ratings]);

  const recentApplications = useMemo(() => {
    return [...applications].slice(0, 6);
  }, [applications]);

  const recentRatings = useMemo(() => {
    return [...ratings].slice(0, 4);
  }, [ratings]);

  const todayDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (!isAdmin && !loading) {
    return (
      <div className="dashboard dashboard-center">
        <div className="access-card">
          <div className="access-icon">
            <i className="fa fa-lock"></i>
          </div>
          <h2>Access Restricted</h2>
          <p>You do not have permission to access the HOCompany dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard dashboard-center">
        <div className="loader-card">
          <div className="loader"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-shell">
        <div className="dashboard-topbar">
          <div className="topbar-left">
            <h1>HOCompany Management Dashboard</h1>
            <p className="dashboard-desc">
              Welcome back, {user?.displayName || "Administrator"}
            </p>
          </div>

          <div className="topbar-right">
            <div className="date-badge">
              <i className="fa fa-calendar"></i>
              <span>{todayDate}</span>
            </div>

            <div className="admin-badge">
              <i className="fa fa-shield"></i>
              <span>Admin Access</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="dashboard-error">
            <i className="fa fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-briefcase"></i>
            </div>
            <div className="stat-content">
              <h3>Job Applications</h3>
              <p>{applications.length}</p>
              <span>Total submitted applications</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-users"></i>
            </div>
            <div className="stat-content">
              <h3>Registered Clients</h3>
              <p>{users}</p>
              <span>Active platform members</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-star"></i>
            </div>
            <div className="stat-content">
              <h3>Customer Feedback</h3>
              <p>{averageRating}</p>
              <span>Based on {ratings.length} reviews</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <h3>Website Traffic</h3>
              <p>{visitors}</p>
              <span>Total visitors tracked</span>
            </div>
          </div>
        </div>

        <div className="analytics-grid">
          <div className="panel-card">
            <div className="panel-header">
              <div>
                <h2>Business Overview</h2>
                <p className="panel-subtext">
                  Performance summary for HOCompany
                </p>
              </div>
              <span className="panel-chip">This month</span>
            </div>

            <p className="business-text">
              HOCompany continues to grow through increased website traffic,
              steady client registrations, and active job applications. The
              platform is helping users discover services and connect with the
              company in a more structured and professional way.
            </p>

            <div className="mini-metrics">
              <div className="mini-metric">
                <span>Satisfaction</span>
                <h4>{satisfactionRate}</h4>
              </div>
              <div className="mini-metric">
                <span>Total Reviews</span>
                <h4>{ratings.length}</h4>
              </div>
              <div className="mini-metric">
                <span>Applications</span>
                <h4>{applications.length}</h4>
              </div>
              <div className="mini-metric">
                <span>Active Clients</span>
                <h4>{users}</h4>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-header">
              <div>
                <h2>Quick Actions</h2>
                <p className="panel-subtext">Management shortcuts</p>
              </div>
            </div>

            <div className="actions-grid">
              <button className="action-btn">
                <i className="fa fa-folder-open"></i>
                <span>Manage Applications</span>
              </button>

              <button className="action-btn">
                <i className="fa fa-user-circle"></i>
                <span>View Clients</span>
              </button>

              <button className="action-btn">
                <i className="fa fa-comments"></i>
                <span>Review Feedback</span>
              </button>

              <button className="action-btn">
                <i className="fa fa-bar-chart"></i>
                <span>View Analytics</span>
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="panel-card wide-card">
            <div className="panel-header">
              <div>
                <h2>Recent Applications</h2>
                <p className="panel-subtext">
                  Latest candidates and submissions
                </p>
              </div>
              <span className="panel-chip">{applications.length} total</span>
            </div>

            {recentApplications.length > 0 ? (
              <div className="table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Email</th>
                      <th>Position</th>
                      <th>CV</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app, index) => (
                      <tr key={app.id || index}>
                        <td>
                          <div className="table-user">
                            <div className="avatar-circle">
                              {(app.name || "A").charAt(0).toUpperCase()}
                            </div>
                            <span>{app.name || "Unknown Applicant"}</span>
                          </div>
                        </td>
                        <td>{app.email || "No email"}</td>
                        <td>{app.position || "Frontend Developer"}</td>
                        <td>
                          {app.cv || app.cv_link || app.resume ? (
                            <a
                              href={app.cv || app.cv_link || app.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="view-btn"
                            >
                              View CV
                            </a>
                          ) : (
                            <span className="no-cv">No CV</span>
                          )}
                        </td>
                        <td>
                          <span className="status-chip">New</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa fa-folder-open"></i>
                <p>No applications found</p>
              </div>
            )}
          </div>

          <div className="side-panels">
            <div className="panel-card">
              <div className="panel-header">
                <div>
                  <h2>Latest Feedback</h2>
                  <p className="panel-subtext">
                    Recent client reviews and comments
                  </p>
                </div>
                <span className="panel-chip">{ratings.length} total</span>
              </div>

              {recentRatings.length > 0 ? (
                <div className="reviews-list">
                  {recentRatings.map((item, index) => (
                    <div className="review-card" key={item.id || index}>
                      <div className="review-top">
                        <div className="table-user">
                          <div className="avatar-circle">
                            {(item.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4>{item.name || "Anonymous"}</h4>
                            <p>{item.email || "Customer review"}</p>
                          </div>
                        </div>

                        <div className="rating-badge">
                          <i className="fa fa-star"></i>
                          <span>{item.rating || 0}</span>
                        </div>
                      </div>

                      <p className="review-comment">
                        {item.comment || "No comment provided."}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fa fa-star-o"></i>
                  <p>No feedback available</p>
                </div>
              )}
            </div>

            <div className="panel-card">
              <div className="panel-header">
                <div>
                  <h2>System Status</h2>
                  <p className="panel-subtext">Core services and operations</p>
                </div>
              </div>

              <div className="system-status">
                <div className="system-item">
                  <div className="status-left">
                    <div className="status-dot green"></div>
                    <span>Database Status</span>
                  </div>
                  <strong>Online</strong>
                </div>

                <div className="system-item">
                  <div className="status-left">
                    <div className="status-dot green"></div>
                    <span>Server Status</span>
                  </div>
                  <strong>Online</strong>
                </div>

                <div className="system-item">
                  <div className="status-left">
                    <div className="status-dot green"></div>
                    <span>API Status</span>
                  </div>
                  <strong>Online</strong>
                </div>

                <div className="system-item">
                  <div className="status-left">
                    <div className="status-dot green"></div>
                    <span>Visitor Tracking</span>
                  </div>
                  <strong>Online</strong>
                </div>
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-header">
                <div>
                  <h2>Recent Activity</h2>
                  <p className="panel-subtext">
                    Latest actions across the platform
                  </p>
                </div>
              </div>

              <div className="activity-list">
                <div className="activity-item">
                  <i className="fa fa-file-text-o"></i>
                  <span>New job application submitted</span>
                </div>
                <div className="activity-item">
                  <i className="fa fa-user-plus"></i>
                  <span>New client registered on the platform</span>
                </div>
                <div className="activity-item">
                  <i className="fa fa-star-half-o"></i>
                  <span>Customer feedback received</span>
                </div>
                <div className="activity-item">
                  <i className="fa fa-line-chart"></i>
                  <span>Website traffic updated successfully</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
