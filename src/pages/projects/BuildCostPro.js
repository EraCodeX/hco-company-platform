import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/BuildCostPro.css";
import { useLanguage } from "../../context/LanguageContext";
import { objectTypes } from "../../utils/Data";
import BuildCostImage from "../../assets/images/buildcostimage.png";

const BuildCostPro = () => {
  const { t } = useLanguage();
  const [objectType, setObjectType] = useState("");
  const [area, setArea] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("first");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Options for react-select
  const objectOptions = objectTypes.map(obj => ({ value: obj.type, label: obj.type }));
  const qualityOptions = [
    { value: "first", label: t("firstQuality") },
    { value: "second", label: t("secondQuality") },
    { value: "third", label: t("thirdQuality") },
  ];

  const selectedObject = objectTypes.find(obj => obj.type === objectType);
  const selectedPrice = selectedObject ? selectedObject.qualityPrices[selectedQuality] : 0;
  const workerCost = selectedObject ? selectedObject.workerCost * Number(area || 0) : 0;
  const transportCost = selectedObject ? selectedObject.transportCost * Number(area || 0) : 0;
  const discount = selectedObject ? selectedObject.discount : 0;
  const tax = selectedObject ? selectedObject.tax : 0;

  const totalCost = useMemo(() => {
    if (!selectedObject || !area || area <= 0) return null;
    let subtotal = Number(area) * selectedPrice + workerCost + transportCost;
    subtotal += (subtotal * tax) / 100;
    subtotal -= (subtotal * discount) / 100;
    return subtotal;
  }, [selectedPrice, workerCost, transportCost, discount, tax, area, selectedObject]);

  const handlePurchase = () => {
    if (!localStorage.getItem("user")) {
      setErrorMessage(t("errorMessage"));
      return;
    }
    localStorage.setItem("totalCost", totalCost);
    localStorage.setItem("objectType", objectType);
    localStorage.setItem("area", area);
    navigate("/payments", { state: { totalCost, objectType, area } });
  };

  return (
    <div className="page-wrap">
      <Header />
      <main className="container-section">
        <section className="intro-section" aria-labelledby="intro-title">
          <div className="intro-tagline">
            <h2 id="intro-title">{t("introTitle")}</h2>
            <p>{t("introText")}</p>
          </div>

          <div className="fact-card">
            <div className="fact-box">
              <h4>{t("factTitle")}</h4>
              <p>{t("factText")}</p>
            </div>

            <div className="card">
              <h3>{t("welcome")}</h3>
              <ul>
                <li>{t("step1")}</li>
                <li>{t("step2")}</li>
                <li>{t("step3")}</li>
                <li>{t("step4")}</li>
              </ul>
            </div>
          </div>

          <img src={BuildCostImage} alt="Project example" className="buildcostimage" />
        </section>

        <aside className="container-cost" aria-labelledby="calc-title">
          <h2 id="calc-title" className="title">BuildCostPro</h2>

          <div className="formGroup">
            <label className="label">{t("objectType")}:</label>
            <Select
              value={objectOptions.find(opt => opt.value === objectType)}
              onChange={option => setObjectType(option.value)}
              options={objectOptions}
              menuPlacement="auto"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                control: base => ({ ...base, borderRadius: 8, borderColor: "#e6e7ea" }),
              }}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="area" className="label">{t("area")}:</label>
            <input
              type="number"
              id="area"
              className="input"
              value={area}
              onChange={e => setArea(e.target.value)}
              placeholder={t("enterArea")}
              min="0"
            />
          </div>

          <div className="formGroup">
            <label className="label">{t("quality")}:</label>
            <Select
              value={qualityOptions.find(opt => opt.value === selectedQuality)}
              onChange={option => setSelectedQuality(option.value)}
              options={qualityOptions}
              menuPlacement="auto"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                control: base => ({ ...base, borderRadius: 8, borderColor: "#e6e7ea", background: "#f5f5f5" }),
              }}
            />
          </div>

          <div className="grid-2">
            <div className="formGroup small">
              <label>{t("pricePerM2")}:</label>
              <input type="number" className="input" value={selectedPrice} readOnly />
            </div>
            <div className="formGroup small">
              <label>{t("workerPerM2")}:</label>
              <input type="number" className="input" value={selectedObject?.workerCost || 0} readOnly />
            </div>
          </div>

          <div className="grid-2">
            <div className="formGroup small">
              <label>{t("transportPerM2")}:</label>
              <input type="number" className="input" value={selectedObject?.transportCost || 0} readOnly />
            </div>
            <div className="formGroup small">
              <label>{t("discount")}:</label>
              <input type="number" className="input" value={discount} readOnly />
            </div>
          </div>

          <div className="formGroup">
            <label>{t("tax")}:</label>
            <input type="number" className="input" value={tax} readOnly />
          </div>

          {totalCost !== null && (
            <div className="result">
              <h3>{t("totalCost")}</h3>
              <p className="big">€{totalCost.toFixed(2)}</p>
              <button onClick={handlePurchase} className="button primary">{t("buyProject")}</button>
              {errorMessage && (<p className="error-message">{errorMessage}</p>)}
            </div>
          )}
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default BuildCostPro;

