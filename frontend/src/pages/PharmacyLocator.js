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

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

import api from "../services/api";

const { Title, Text } = Typography;


/* --------------------------------------------------
   FIX LEAFLET DEFAULT MARKER ICON
-------------------------------------------------- */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


/* --------------------------------------------------
   DEFAULT MAP SETTINGS
-------------------------------------------------- */

const defaultCenter = [20.5937, 78.9629];
const defaultZoom = 5;


/* --------------------------------------------------
   UPDATE MAP WHEN CENTER CHANGES
-------------------------------------------------- */

function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}


/* --------------------------------------------------
   PHARMACY LOCATOR
-------------------------------------------------- */

function PharmacyLocator() {
  const [pharmacies, setPharmacies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [center, setCenter] = useState(
    defaultCenter
  );

  const [zoom, setZoom] = useState(
    defaultZoom
  );

  const [loading, setLoading] = useState(false);


  /* --------------------------------------------------
     LOAD ALL PHARMACIES
  -------------------------------------------------- */

  useEffect(() => {
    loadPharmacies();
  }, []);


  const loadPharmacies = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/pharmacies"
      );

      const data = response.data || [];

      setPharmacies(data);


      /* Find first pharmacy with valid coordinates */

      const firstValidPharmacy = data.find(
        (pharmacy) =>
          typeof pharmacy.latitude ===
            "number" &&
          typeof pharmacy.longitude ===
            "number" &&
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
      console.error(
        "Failed to load pharmacies:",
        error
      );

      message.error(
        "Failed to load pharmacies"
      );

    } finally {
      setLoading(false);
    }
  };


  /* --------------------------------------------------
     SEARCH PHARMACIES
  -------------------------------------------------- */

  const searchPharmacies = async (value) => {
    const query = value.trim();

    setSearchQuery(value);


    /* If search is empty, load everything */

    if (!query) {
      loadPharmacies();
      return;
    }


    try {
      setLoading(true);

      const response = await api.get(
        `/pharmacies/search/${encodeURIComponent(
          query
        )}`
      );

      const data = response.data || [];

      setPharmacies(data);


      /* No results */

      if (data.length === 0) {
        message.info(
          "No pharmacies found"
        );

        setCenter(defaultCenter);
        setZoom(defaultZoom);

        return;
      }


      /* Find first valid location */

      const firstValidPharmacy = data.find(
        (pharmacy) =>
          typeof pharmacy.latitude ===
            "number" &&
          typeof pharmacy.longitude ===
            "number" &&
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
      console.error(
        "Search failed:",
        error
      );

      message.error(
        "Search failed"
      );

    } finally {
      setLoading(false);
    }
  };


  /* --------------------------------------------------
     SHOW PARTICULAR PHARMACY ON MAP
  -------------------------------------------------- */

  const showOnMap = (pharmacy) => {

    if (
      typeof pharmacy.latitude !==
        "number" ||
      typeof pharmacy.longitude !==
        "number" ||
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


  /* --------------------------------------------------
     UI
  -------------------------------------------------- */

  return (
    <div>

      {/* PAGE TITLE */}

      <Title level={2}>
        Pharmacy Locator
      </Title>


      <Text type="secondary">
        Search pharmacies by city or pincode
        and view their locations on the map.
      </Text>


      <br />
      <br />


      {/* SEARCH BAR */}

      <Input.Search
        placeholder="Search by City or Pincode..."
        size="large"
        allowClear
        loading={loading}
        value={searchQuery}

        onChange={(e) =>
          setSearchQuery(
            e.target.value
          )
        }

        onSearch={searchPharmacies}

        style={{
          maxWidth: "600px",
          marginBottom: "20px",
        }}
      />


      {/* MAP */}

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

        {/* OPENSTREETMAP */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* UPDATE MAP POSITION */}

        <MapUpdater
          center={center}
          zoom={zoom}
        />


        {/* PHARMACY MARKERS */}

        {pharmacies.map(
          (pharmacy) => {

            /* Ignore pharmacies
               without coordinates */

            if (
              typeof pharmacy.latitude !==
                "number" ||
              typeof pharmacy.longitude !==
                "number" ||
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

                {/* MARKER POPUP */}

                <Popup>

                  <div>

                    <strong>
                      {pharmacy.name}
                    </strong>

                    <br />

                    {pharmacy.address}

                    <br />

                    {pharmacy.city}

                    <br />

                    <strong>
                      Phone:
                    </strong>{" "}
                    {pharmacy.phone ||
                      "Not available"}

                    <br />

                    <strong>
                      Hours:
                    </strong>{" "}
                    {pharmacy.openingHours ||
                      "Not available"}

                    <br />

                    <strong>
                      Pincode:
                    </strong>{" "}
                    {pharmacy.pincode ||
                      "Not available"}

                  </div>

                </Popup>

              </Marker>
            );
          }
        )}

      </MapContainer>


      {/* PHARMACY CARDS */}

      {pharmacies.length === 0 ? (

        <Empty
          description="No pharmacies found"
        />

      ) : (

        <Row
          gutter={[
            20,
            20,
          ]}
        >

          {pharmacies.map(
            (pharmacy) => (

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

                    {/* CITY */}

                    <Text>
                      <strong>
                        City:
                      </strong>{" "}
                      {pharmacy.city}
                    </Text>


                    {/* PHONE */}

                    <Text>
                      <strong>
                        Phone:
                      </strong>{" "}
                      {pharmacy.phone ||
                        "Not available"}
                    </Text>


                    {/* ADDRESS */}

                    <Text>
                      <strong>
                        Address:
                      </strong>{" "}
                      {pharmacy.address}
                    </Text>


                    {/* OPENING HOURS */}

                    <Text>
                      <strong>
                        Hours:
                      </strong>{" "}
                      {pharmacy.openingHours ||
                        "Not available"}
                    </Text>


                    {/* PINCODE */}

                    <Text>
                      <strong>
                        Pincode:
                      </strong>{" "}
                      {pharmacy.pincode ||
                        "Not available"}
                    </Text>


                    {/* VIEW ON MAP BUTTON */}

                    <Button
                      type="primary"

                      icon={
                        <EnvironmentOutlined />
                      }

                      onClick={() =>
                        showOnMap(
                          pharmacy
                        )
                      }

                      block
                    >
                      View on Map
                    </Button>

                  </Space>

                </Card>

              </Col>

            )
          )}

        </Row>

      )}

    </div>
  );
}


export default PharmacyLocator;