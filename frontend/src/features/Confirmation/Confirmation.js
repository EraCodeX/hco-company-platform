import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Payments/Payments.css";
const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCost, objectType, area } = location.state || {};

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h1>Thank You for Your Payment!</h1>
        <p>Your payment has been processed successfully.</p>
        <div className="payment-details">
          <h2>Payment Details</h2>
          <ul>
            <li>
              <strong>Object Type:</strong> {objectType || "Not specified"}
            </li>
            <li>
              <strong>Area:</strong> {area ? `${area} m²` : "Not specified"}
            </li>
            <li>
              <strong>Total Cost:</strong> €{totalCost?.toFixed(2) || "0.00"}
            </li>
          </ul>
        </div>
        <button onClick={handleGoHome} className="home-button">
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
