import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Tag,
  Button,
  Spin,
  message,
  Space,
} from "antd";
import {
  ArrowLeftOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../services/api";

const { Title } = Typography;

function MedicineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useSelector(
    (state) => state.auth
  );

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedicine = async () => {
      try {
        const response = await api.get(
          `/medicines/${id}`
        );

        setMedicine(response.data);
      } catch (error) {
        message.error(
          "Failed to load medicine details"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMedicine();
  }, [id]);

  const addFavorite = async () => {
    if (!token) {
      message.warning(
        "Please login to add favorites"
      );
      return;
    }

    try {
      await api.post(`/favorites/${id}`);

      message.success("Added to favorites!");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Error adding favorite"
      );
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!medicine) {
    return (
      <div style={{ textAlign: "center" }}>
        Medicine not found
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        Back to Search
      </Button>

      <Card>
        <Title level={2}>
          {medicine.name}
        </Title>

        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%" }}
        >
          <p>
            <strong>Generic Name:</strong>{" "}
            {medicine.genericName}
          </p>

          <p>
            <strong>Manufacturer:</strong>{" "}
            {medicine.manufacturer}
          </p>

          <p>
            <strong>Dosage Form:</strong>{" "}
            {medicine.dosageForm}
          </p>

          <p>
            <strong>Strength:</strong>{" "}
            {medicine.strength}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {medicine.inStock ? (
              <Tag color="green">
                In Stock
              </Tag>
            ) : (
              <Tag color="red">
                Out of Stock
              </Tag>
            )}
          </p>

          <Button
            type="primary"
            icon={<HeartOutlined />}
            onClick={addFavorite}
          >
            Add to Favorites
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default MedicineDetails;