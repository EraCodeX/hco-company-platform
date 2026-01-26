import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/Payments.css";
import paypalLogo from "../../../assets/images/paypal-logo.png";
import stripeLogo from "../../../assets/images/stripe-logo.png";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCost, objectType, area } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState("paypal");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);

  const savePaymentToBackend = useCallback(
    (paymentData) => {
      fetch(`${process.env.REACT_APP_API_BASE}/api/payments.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: selectedMethod,
          paymentId: paymentData.id,
          amount: totalCost?.toFixed(2),
          objectType,
          area,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Payment saved:", data);
        })
        .catch((error) => {
          console.error("Error saving payment:", error);
        });
    },
    [selectedMethod, totalCost, objectType, area]
  );

  const renderPayPalButton = useCallback(() => {
    if (window.paypal && selectedMethod === "paypal" && paypalScriptLoaded) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalCost?.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              setPaymentSuccess(true);
              navigate("/confirmation");
              savePaymentToBackend(details);
              console.log(data);
            });
          },
          onError: (err) => {
            alert("Something went wrong with the PayPal payment.");
            console.error(err);
          },
        })
        .render("#paypal-button-container");
    }
  }, [
    navigate,
    selectedMethod,
    totalCost,
    paypalScriptLoaded,
    savePaymentToBackend,
  ]);

  useEffect(() => {
    if (selectedMethod === "paypal" && !paypalScriptLoaded) {
      const script = document.createElement("script");
      script.src =
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=${process.env.REACT_APP_PAYPAL_CURRENCY}`;
      script.onload = () => {
        setPaypalScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else if (selectedMethod === "paypal" && paypalScriptLoaded) {
      renderPayPalButton();
    }

    if (selectedMethod !== "paypal") {
      setPaypalScriptLoaded(false);
    }
  }, [selectedMethod, renderPayPalButton, paypalScriptLoaded]);

  // Function to handle Stripe Payment
  const handleStripePayment = () => {
    alert("Payment processed through Stripe.");
    setPaymentSuccess(true);
    navigate("/confirmation", {
      state: {
        totalCost,
        objectType,
        area,
      },
    });
    savePaymentToBackend();
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="payments-page">
      <div onClick={handleGoBack} className="back-button-payments">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </div>
      <div className="payment-container">
        <div className="payment-summary">
          <h2>Payment Summary</h2>
          <ul>
            <li>
              <strong>Object Type:</strong> {objectType}
            </li>
            <li>
              <strong>Area:</strong> {area} m²
            </li>
            <li>
              <strong>Total Cost:</strong> <span>€{totalCost?.toFixed(2)}</span>
            </li>
          </ul>

          {/* Conditionally render PayPal button */}
          {selectedMethod === "paypal" && paypalScriptLoaded && (
            <div id="paypal-button-container"></div>
          )}
          {/* Conditionally render Stripe button */}
          {selectedMethod === "stripe" && (
            <div className="stripe-form">
              <button onClick={handleStripePayment} className="button">
                Proceed with Stripe
              </button>
            </div>
          )}
        </div>

        <div className="payment-methods">
          <h2>Choose Payment Method</h2>
          <div className="form-group">
            <label className="payment-option">
              <input
                type="radio"
                value="paypal"
                checked={selectedMethod === "paypal"}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              <img src={paypalLogo} alt="PayPal" className="payment-logo" />
              <span>PayPal</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                value="stripe"
                checked={selectedMethod === "stripe"}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              <img src={stripeLogo} alt="Stripe" className="payment-logo" />
              <span>Stripe</span>
            </label>
          </div>
        </div>
        {/* Payment Success Modal */}
        {paymentSuccess && (
          <div className="modal">
            <div className="modal-content">
              <h2>Payment Successful!</h2>
              <p>Thank you for your payment.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;





