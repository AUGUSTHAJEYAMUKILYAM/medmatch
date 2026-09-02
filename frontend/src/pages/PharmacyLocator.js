import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  Row,
  Col,
  Empty,
  Typography,
  message,
} from "antd";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from "../services/api";

const { Title } = Typography;

const defaultCenter = [
  20.5937,
  78.9629,
];

function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);

  return null;
}

function PharmacyLocator() {
  const [pharmacies, setPharmacies] =
    useState([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [center, setCenter] =
    useState(defaultCenter);

  useEffect(() => {
    loadPharmacies();
  }, []);

  const loadPharmacies = async () => {
    try {
      const response =
        await api.get("/pharmacies");

      const data = response.data;

      setPharmacies(data);

      if (data.length > 0) {
        setCenter([
          data[0].latitude,
          data[0].longitude,
        ]);
      }
    } catch (error) {
      message.error(
        "Failed to load pharmacies"
      );
    }
  };

  const searchPharmacies = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      loadPharmacies();
      return;
    }

    try {
      const response =
        await api.get(
          `/pharmacies/search/${encodeURIComponent(
            value
          )}`
        );

      const data = response.data;

      setPharmacies(data);

      if (data.length === 0) {
        message.info(
          "No pharmacies found in this area"
        );
      } else {
        setCenter([
          data[0].latitude,
          data[0].longitude,
        ]);
      }
    } catch (error) {
      message.error("Search failed");
    }
  };

  return (
    <div>
      <Title level={2}>
        Pharmacy Locator
      </Title>

      <Input.Search
        placeholder="Search by City or Pincode..."
        size="large"
        allowClear
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
        zoom={5}
        style={{
          height: "500px",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={center} />

        {pharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            position={[
              pharmacy.latitude,
              pharmacy.longitude,
            ]}
          >
            <Popup>
              <strong>
                {pharmacy.name}
              </strong>

              <br />

              {pharmacy.address}

              <br />

              {pharmacy.city}

              <br />

              Phone: {pharmacy.phone}
            </Popup>
          </Marker>
        ))}
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
              <Card title={pharmacy.name}>
                <p>
                  <strong>City:</strong>{" "}
                  {pharmacy.city}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {pharmacy.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {pharmacy.address}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default PharmacyLocator;