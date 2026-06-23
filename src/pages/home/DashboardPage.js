import React, { useState, useEffect, useContext, useMemo } from "react";

import "../../styles/dashboard.css";

import { AuthContext } from "../../context/AuthContext";

import DashboardChart from "./DashboardChart";

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [visitors, setVisitors] = useState(0);

  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsRes, usersRes, ratingsRes, visitorsRes] =
          await Promise.all([
            fetch(`${API_BASE}/api/get-application.php`),

            fetch(`${API_BASE}/api/registeredUser.php`),

            fetch(`${API_BASE}/api/ratingsPage.php`),

            fetch(`${API_BASE}/api/pageVisit.php`),
          ]);

        const [applicationsData, usersData, ratingsData, visitorsData] =
          await Promise.all([
            applicationsRes.json(),

            usersRes.json(),

            ratingsRes.json(),

            visitorsRes.json(),
          ]);

        setApplications(applicationsData?.applications || []);

        setUsers(Number(usersData?.total) || 0);

        setRatings(ratingsData?.ratings || []);

        setVisitors(Number(visitorsData?.visitors) || 0);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE]);

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

  const recentRatings = useMemo(() => {
    return ratings.slice(0, 5);
  }, [ratings]);

  const todayDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <h2>HO Construction</h2>
        </div>

        <nav className="sidebar-nav">
          <a href="/" className="active">
            <i className="fa fa-home"></i>
            <span>Dashboard</span>
          </a>

          <a href="/">
            <i className="fa fa-users"></i>
            <span>Clients</span>
          </a>

          <a href="/">
            <i className="fa fa-briefcase"></i>
            <span>Applications</span>
          </a>

          <a href="/">
            <i className="fa fa-star"></i>
            <span>Reviews</span>
          </a>

          <a href="/">
            <i className="fa fa-chart-line"></i>
            <span>Analytics</span>
          </a>

          <a href="/">
            <i className="fa fa-cog"></i>
            <span>Settings</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="dashboard-main">
        {/* HEADER */}

        <header className="dashboard-header">
          <div className="search-box">
            <i className="fa fa-search"></i>

            <input type="text" placeholder="Search..." />
          </div>

          <div className="header-actions">
            <div className="date-badge">
              <i className="fa fa-calendar"></i>

              <span>{todayDate}</span>
            </div>

            <button className="notification-btn">
              <i className="fa fa-bell"></i>
            </button>

            <div className="profile-box">
              <img
                src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                alt=""
              />

              <span>{user?.displayName || "User"}</span>

              {user && <div className="profile-status"></div>}
            </div>
          </div>
        </header>

        {/* KPI */}

        <section className="stats-grid">
          <div className="stat-card applications">
            <div className="card-top">
              <div className="icon-circle">
                <i className="fa fa-briefcase"></i>
              </div>
            </div>

            <h3>{applications.length}</h3>

            <p>Total Applications</p>
          </div>

          <div className="stat-card clients">
            <div className="card-top">
              <div className="icon-circle">
                <i className="fa fa-users"></i>
              </div>
            </div>

            <h3>{users}</h3>

            <p>Registered Clients</p>
          </div>

          <div className="stat-card reviews">
            <div className="card-top">
              <div className="icon-circle">
                <i className="fa fa-star"></i>
              </div>
            </div>

            <h3>{averageRating}</h3>

            <p>Average Rating</p>
          </div>

          <div className="stat-card visitors">
            <div className="card-top">
              <div className="icon-circle">
                <i className="fa fa-chart-line"></i>
              </div>
            </div>

            <h3>{visitors}</h3>

            <p>Website Visitors</p>
          </div>
        </section>

        {/* CONTENT */}

        <section className="dashboard-content">
          {/* CHART */}

          <div className="chart-panel">
            <div className="panel-header">
              <h2>Business Analytics</h2>

              <span>Satisfaction Rate: {satisfactionRate}</span>
            </div>

            <div className="chart-area">
              <DashboardChart />
            </div>
          </div>

          {/* REVIEWS */}

          <div className="activity-panel">
            <h2 className="activity-title">Latest Reviews</h2>

            {recentRatings.length > 0 ? (
              recentRatings.map((item, index) => (
                <div key={index} className="activity-item">
                  <strong>{item.name}</strong>

                  <p>{item.comment}</p>

                  <span>★ {item.rating}</span>
                </div>
              ))
            ) : (
              <div className="empty-state">No Reviews</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
