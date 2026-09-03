import React, { useEffect, useState } from "react";
import {
  Select,
  Button,
  Card,
  Alert,
  Empty,
  Spin,
  Typography,
  message,
} from "antd";
import api from "../services/api";

const { Title } = Typography;

function InteractionChecker() {
  const [medicines, setMedicines] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMedicines, setLoadingMedicines] = useState(true);

  // Load medicines when page opens
  useEffect(() => {
    const loadMedicines = async () => {
      console.log("Loading medicines...");

      try {
        const response = await api.get("/medicines");

        console.log("Medicines loaded:", response.data);

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
    console.log("================================");
    console.log("CHECKER FUNCTION CALLED");
    console.log("Selected medicine IDs:", selectedIds);
    console.log("================================");

    // Need at least 2 medicines
    if (selectedIds.length < 2) {
      console.log("Less than 2 medicines selected");

      message.warning(
        "Please select at least 2 medicines to check interactions"
      );

      return;
    }

    setLoading(true);

    try {
      console.log("Sending request to backend...");
      console.log("URL: /interactions/check");
      console.log("Request body:", {
        medicineIds: selectedIds,
      });

      const response = await api.post("/interactions/check", {
        medicineIds: selectedIds,
      });

      console.log("================================");
      console.log("BACKEND RESPONSE");
      console.log(response);
      console.log("RESPONSE DATA:", response.data);
      console.log("================================");

      setResults(response.data || []);
    } catch (error) {
      console.error("================================");
      console.error("INTERACTION CHECK ERROR");
      console.error("Error:", error);
      console.error("Response:", error.response);
      console.error("Response data:", error.response?.data);
      console.error("================================");

      message.error(
        error.response?.data?.message ||
          "Error checking interactions"
      );

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (severity) => {
    if (severity === "HIGH") {
      return "#f5222d";
    }

    if (severity === "MODERATE") {
      return "#fa8c16";
    }

    return "#1890ff";
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <Title level={2}>
        Drug Interaction Checker
      </Title>

      <Card>
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="Start typing medicine names..."
          loading={loadingMedicines}
          value={selectedIds}
          onChange={(values) => {
            console.log("Medicines selected:", values);
            setSelectedIds(values);
          }}
          style={{ width: "100%" }}
          optionFilterProp="label"
          options={medicines.map((medicine) => ({
            value: medicine.id,
            label: `${medicine.name} (${medicine.genericName})`,
          }))}
        />

        <Button
          type="primary"
          onClick={checkInteractions}
          loading={loading}
          disabled={selectedIds.length < 2}
          style={{ marginTop: "20px" }}
        >
          Check Interactions
        </Button>
      </Card>

      <div style={{ marginTop: "30px" }}>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
            }}
          >
            <Spin size="large" />

            <p style={{ marginTop: "15px" }}>
              Checking drug interactions...
            </p>
          </div>
        ) : results.length === 0 ? (
          <Empty description="No interaction results" />
        ) : (
          results.map((result, index) => (
            <Alert
              key={result.id || index}
              style={{
                marginBottom: "15px",
                borderLeft: `5px solid ${getColor(
                  result.severity
                )}`,
              }}
              message={
                result.severity || "Interaction"
              }
              description={
                result.warningMessage ||
                result.warning_message ||
                result.description ||
                result.message ||
                "Interaction detected"
              }
              type={
                result.severity === "HIGH"
                  ? "error"
                  : result.severity === "MODERATE"
                  ? "warning"
                  : "info"
              }
              showIcon
            />
          ))
        )}
      </div>
    </div>
  );
}

export default InteractionChecker;