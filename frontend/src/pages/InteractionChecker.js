import React, { useEffect, useState } from "react";
import {
  Select,
  Button,
  Empty,
  Spin,
  Typography,
  message,
} from "antd";
import {
  SafetyOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import api from "../services/api";
import "./InteractionChecker.css";

const { Title } = Typography;

function InteractionChecker() {
  const [medicines, setMedicines] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMedicines, setLoadingMedicines] = useState(true);

  // Load medicines
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const response = await api.get("/medicines");
        setMedicines(response.data);
      } catch (error) {
        console.error("Failed to load medicines:", error);
        message.error("Failed to load medicines");
      } finally {
        setLoadingMedicines(false);
      }
    };

    loadMedicines();
  }, []);

  // Check interactions
  const checkInteractions = async () => {
    if (selectedIds.length < 2) {
      message.warning(
        "Please select at least 2 medicines to check interactions"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/interactions/check", {
        medicineIds: selectedIds,
      });

      setResults(response.data || []);
    } catch (error) {
      console.error("Interaction check error:", error);

      message.error(
        error.response?.data?.message ||
          "Error checking interactions"
      );

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityInfo = (severity) => {
    if (severity === "HIGH") {
      return {
        className: "severity-high",
        icon: <ExclamationCircleOutlined />,
        label: "High Risk",
      };
    }

    if (severity === "MODERATE") {
      return {
        className: "severity-moderate",
        icon: <WarningOutlined />,
        label: "Moderate Risk",
      };
    }

    return {
      className: "severity-low",
      icon: <CheckCircleOutlined />,
      label: "Low Risk",
    };
  };

  const getMedicineName = (id) => {
    const medicine = medicines.find(
      (item) => item.id === id
    );

    return medicine?.name || `Medicine ${id}`;
  };

  const selectedMedicines = selectedIds.map((id) =>
    medicines.find((medicine) => medicine.id === id)
  );

  return (
    <div className="interaction-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="interaction-hero">

        <div className="interaction-hero-content">

          <div className="interaction-badge">
            <SafetyOutlined />
            <span>MEDICATION SAFETY</span>
          </div>

          <Title>
            Check your medicines
            <br />
            <span>before you take them.</span>
          </Title>

          <p>
            Select two or more medicines and MedMatch will
            check whether they have any known interactions.
          </p>

        </div>

        <div className="interaction-hero-icon">
          <SafetyOutlined />
        </div>

      </section>


      {/* =====================================
          CHECKER
      ===================================== */}

      <section className="checker-section">

        <div className="checker-header">

          <div>
            <span className="section-label">
              INTERACTION CHECKER
            </span>

            <h2>
              Select your medicines
            </h2>

            <p>
              Add the medicines you are currently taking
              to check for possible interactions.
            </p>
          </div>

          <div className="step-indicator">
            <span>01</span>
            <div></div>
            <span>02</span>
          </div>

        </div>


        <div className="medicine-selector-area">

          <div className="selector-label">
            <MedicineBoxOutlined />
            <span>Medicines</span>
          </div>

          <Select
            mode="multiple"
            allowClear
            showSearch
            loading={loadingMedicines}
            placeholder="Search and select medicines..."
            value={selectedIds}
            onChange={(values) => {
              setSelectedIds(values);
              setResults([]);
            }}
            style={{ width: "100%" }}
            optionFilterProp="label"
            className="interaction-select"
            options={medicines.map((medicine) => ({
              value: medicine.id,
              label: `${medicine.name} (${medicine.genericName})`,
            }))}
          />

          <div className="selection-hint">

            <span>
              {selectedIds.length === 0
                ? "Select at least 2 medicines"
                : selectedIds.length === 1
                ? "Select one more medicine"
                : `${selectedIds.length} medicines selected`}
            </span>

            {selectedIds.length >= 2 && (
              <span className="ready-text">
                <CheckCircleOutlined />
                Ready to check
              </span>
            )}

          </div>


          {/* Selected medicine preview */}

          {selectedMedicines.length > 0 && (
            <div className="selected-medicines">

              {selectedMedicines.map(
                (medicine) =>
                  medicine && (
                    <div
                      className="selected-medicine"
                      key={medicine.id}
                    >
                      <div className="selected-medicine-icon">
                        <MedicineBoxOutlined />
                      </div>

                      <div>
                        <strong>{medicine.name}</strong>
                        <span>
                          {medicine.genericName}
                        </span>
                      </div>
                    </div>
                  )
              )}

            </div>
          )}


          <Button
            type="primary"
            size="large"
            loading={loading}
            disabled={selectedIds.length < 2}
            onClick={checkInteractions}
            className="check-button"
          >
            <SafetyOutlined />
            Check Interactions
            <ArrowRightOutlined />
          </Button>

        </div>

      </section>


      {/* =====================================
          RESULTS
      ===================================== */}

      <section className="results-section">

        <div className="results-heading">

          <div>
            <span className="section-label">
              SAFETY REPORT
            </span>

            <h2>
              Interaction results
            </h2>
          </div>

          {results.length > 0 && (
            <Button
              icon={<ReloadOutlined />}
              onClick={() => setResults([])}
            >
              Clear Results
            </Button>
          )}

        </div>


        {loading ? (

          <div className="interaction-loading">

            <div className="loading-icon">
              <SafetyOutlined />
            </div>

            <Spin size="large" />

            <h3>
              Checking your medicines...
            </h3>

            <p>
              We're reviewing the selected medicines
              for possible interactions.
            </p>

          </div>

        ) : results.length === 0 ? (

          <div className="empty-results">

            <div className="empty-icon">
              <SafetyOutlined />
            </div>

            <h3>
              No interaction report yet
            </h3>

            <p>
              Select at least two medicines above and
              click <strong>Check Interactions</strong>.
            </p>

          </div>

        ) : (

          <div className="results-list">

            {results.map((result, index) => {

              const severity = getSeverityInfo(
                result.severity
              );

              const medicineOne =
                result.medicineOne?.name ||
                result.medicine1?.name ||
                result.medicineOneName;

              const medicineTwo =
                result.medicineTwo?.name ||
                result.medicine2?.name ||
                result.medicineTwoName;

              return (
                <div
                  className={`interaction-result ${severity.className}`}
                  key={result.id || index}
                >

                  <div className="result-top">

                    <div className="severity-icon">
                      {severity.icon}
                    </div>

                    <div className="result-title">

                      <span className="result-label">
                        {severity.label}
                      </span>

                      <h3>
                        {medicineOne && medicineTwo
                          ? `${medicineOne} + ${medicineTwo}`
                          : "Drug Interaction Detected"}
                      </h3>

                    </div>

                  </div>


                  <div className="result-message">

                    <p>
                      {result.warningMessage ||
                        result.warning_message ||
                        result.description ||
                        result.message ||
                        "Interaction detected between the selected medicines."}
                    </p>

                  </div>


                  <div className="result-footer">

                    <span>
                      <SafetyOutlined />
                      Medication safety information
                    </span>

                    <span>
                      Review with a healthcare professional
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </section>


      {/* =====================================
          SAFETY NOTE
      ===================================== */}

      <section className="safety-note">

        <div className="safety-note-icon">
          <WarningOutlined />
        </div>

        <div>
          <h3>
            Important safety information
          </h3>

          <p>
            This interaction checker is intended to provide
            general medication information and should not
            replace advice from a doctor or pharmacist.
            Always consult a healthcare professional before
            changing your medication.
          </p>
        </div>

      </section>

    </div>
  );
}

export default InteractionChecker;