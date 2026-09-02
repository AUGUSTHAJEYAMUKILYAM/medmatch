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
  const [loadingMedicines, setLoadingMedicines] =
    useState(true);

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const response = await api.get("/medicines");
        setMedicines(response.data);
      } catch (error) {
        message.error(
          "Failed to load medicines"
        );
      } finally {
        setLoadingMedicines(false);
      }
    };

    loadMedicines();
  }, []);

  const checkInteractions = async () => {
    if (selectedIds.length < 2) {
      message.warning(
        "Please select at least 2 medicines to check interactions"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/interactions/check",
        {
          medicineIds: selectedIds,
        }
      );

      setResults(response.data);
    } catch (error) {
      message.error(
        "Error checking interactions"
      );
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
          onChange={setSelectedIds}
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
          style={{ marginTop: "20px" }}
        >
          Check Interactions
        </Button>
      </Card>

      <div style={{ marginTop: "30px" }}>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
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
                result.severity ||
                "Interaction"
              }
              description={
                result.description ||
                result.message ||
                JSON.stringify(result)
              }
              type="warning"
              showIcon
            />
          ))
        )}
      </div>
    </div>
  );
}

export default InteractionChecker;