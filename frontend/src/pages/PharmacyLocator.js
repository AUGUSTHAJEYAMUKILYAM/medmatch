import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  Row,
  Col,
  Empty,
  Typography,
  message,
  Button,
  Space,
} from "antd";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { EnvironmentOutlined } from "@ant-design/icons";
import "leaflet/dist/leaflet.css";
import api from "../services/api";

const { Title, Text } = Typography;

const defaultCenter = [20.5937, 78.9629];
const defaultZoom = 5;

function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function PharmacyLocator() {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPharmacies();
  }, []);

  const loadPharmacies = async () => {
    try {
      setLoading(true);

      const response = await api.get("/pharmacies");
      const data = response.data || [];

      setPharmacies(data);

      const firstValidPharmacy = data.find(
        (pharmacy) =>
          typeof pharmacy.latitude === "number" &&
          typeof pharmacy.longitude === "number" &&
          pharmacy.latitude !== 0 &&
          pharmacy.longitude !== 0
      );

      if (firstValidPharmacy) {
        setCenter([
          firstValidPharmacy.latitude,
          firstValidPharmacy.longitude,
        ]);

        setZoom(13);
      }
    } catch (error) {
      console.error("Failed to load pharmacies:", error);
      message.error("Failed to load pharmacies");
    } finally {
      setLoading(false);
    }
  };

  const searchPharmacies = async (value) => {
    const query = value.trim();

    setSearchQuery(value);

    if (!query) {
      loadPharmacies();
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/pharmacies/search/${encodeURIComponent(query)}`
      );

      const data = response.data || [];

      setPharmacies(data);

      if (data.length === 0) {
        message.info("No pharmacies found");
        setCenter(defaultCenter);
        setZoom(defaultZoom);
        return;
      }

      const firstValidPharmacy = data.find(
        (pharmacy) =>
          typeof pharmacy.latitude === "number" &&
          typeof pharmacy.longitude === "number" &&
          pharmacy.latitude !== 0 &&
          pharmacy.longitude !== 0
      );

      if (firstValidPharmacy) {
        setCenter([
          firstValidPharmacy.latitude,
          firstValidPharmacy.longitude,
        ]);

        setZoom(13);
      }
    } catch (error) {
      console.error("Search failed:", error);
      message.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const showOnMap = (pharmacy) => {
    if (
      typeof pharmacy.latitude !== "number" ||
      typeof pharmacy.longitude !== "number" ||
      pharmacy.latitude === 0 ||
      pharmacy.longitude === 0
    ) {
      message.warning(
        "Location is not available for this pharmacy"
      );
      return;
    }

    setCenter([
      pharmacy.latitude,
      pharmacy.longitude,
    ]);

    setZoom(15);
  };

  return (
    <div>
      <Title level={2}>
        Pharmacy Locator
      </Title>

      <Text type="secondary">
        Search pharmacies by city or pincode and view
        their locations on the map.
      </Text>

      <br />
      <br />

      <Input.Search
        placeholder="Search by City or Pincode..."
        size="large"
        allowClear
        loading={loading}
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        onSearch={searchPharmacies}
        style={{
          maxWidth: "600px",
          marginBottom: "20px",
        }}
      />

      <MapContainer
        center={center}
        zoom={zoom}
        style={{
          height: "500px",
          width: "100%",
          marginBottom: "30px",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater
          center={center}
          zoom={zoom}
        />

        {pharmacies.map((pharmacy) => {
          if (
            typeof pharmacy.latitude !== "number" ||
            typeof pharmacy.longitude !== "number" ||
            pharmacy.latitude === 0 ||
            pharmacy.longitude === 0
          ) {
            return null;
          }

          return (
            <Marker
              key={pharmacy.id}
              position={[
                pharmacy.latitude,
                pharmacy.longitude,
              ]}
            >
              <Popup>
                <div>
                  <strong>{pharmacy.name}</strong>

                  <br />

                  {pharmacy.address}

                  <br />

                  {pharmacy.city}

                  <br />

                  <strong>Phone:</strong>{" "}
                  {pharmacy.phone || "Not available"}

                  <br />

                  <strong>Hours:</strong>{" "}
                  {pharmacy.openingHours ||
                    "Not available"}

                  <br />

                  <strong>Pincode:</strong>{" "}
                  {pharmacy.pincode ||
                    "Not available"}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {pharmacies.length === 0 ? (
        <Empty description="No pharmacies found" />
      ) : (
        <Row gutter={[20, 20]}>
          {pharmacies.map((pharmacy) => (
            <Col
              xs={24}
              sm={12}
              lg={8}
              key={pharmacy.id}
            >
              <Card
                title={pharmacy.name}
                hoverable
              >
                <Space
                  direction="vertical"
                  size="small"
                  style={{
                    width: "100%",
                  }}
                >
                  <Text>
                    <strong>City:</strong>{" "}
                    {pharmacy.city}
                  </Text>

                  <Text>
                    <strong>Phone:</strong>{" "}
                    {pharmacy.phone ||
                      "Not available"}
                  </Text>

                  <Text>
                    <strong>Address:</strong>{" "}
                    {pharmacy.address}
                  </Text>

                  <Text>
                    <strong>Hours:</strong>{" "}
                    {pharmacy.openingHours ||
                      "Not available"}
                  </Text>

                  <Text>
                    <strong>Pincode:</strong>{" "}
                    {pharmacy.pincode ||
                      "Not available"}
                  </Text>

                  <Button
                    type="primary"
                    icon={<EnvironmentOutlined />}
                    onClick={() =>
                      showOnMap(pharmacy)
                    }
                    block
                  >
                    View on Map
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default PharmacyLocator;