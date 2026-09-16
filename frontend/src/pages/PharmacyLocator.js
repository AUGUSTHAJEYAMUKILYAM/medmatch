import React, { useEffect, useState } from "react";

import {
  Input,
  Empty,
  Typography,
  message,
  Button,
} from "antd";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import {
  EnvironmentOutlined,
  SearchOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

import api from "../services/api";
import "./PharmacyLocator.css";

const { Title } = Typography;

/* =========================================
   FIX LEAFLET MARKER
========================================= */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* =========================================
   DEFAULT MAP
========================================= */

const defaultCenter = [20.5937, 78.9629];
const defaultZoom = 5;

/* =========================================
   GET VALID COORDINATES
========================================= */

function getCoordinates(pharmacy) {
  const lat = Number(pharmacy.latitude);
  const lng = Number(pharmacy.longitude);

  if (
    Number.isNaN(lat) ||
    Number.isNaN(lng) ||
    lat === 0 ||
    lng === 0
  ) {
    return null;
  }

  return [lat, lng];
}

/* =========================================
   UPDATE MAP
========================================= */

function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2,
    });
  }, [center, zoom, map]);

  return null;
}

/* =========================================
   PHARMACY LOCATOR
========================================= */

function PharmacyLocator() {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [loading, setLoading] = useState(false);

  /* =========================================
     LOAD PHARMACIES
  ========================================= */

  useEffect(() => {
    loadPharmacies();
  }, []);

  const loadPharmacies = async () => {
    try {
      setLoading(true);

      const response = await api.get("/pharmacies");
      const data = response.data || [];

      setPharmacies(data);

      /*
        IMPORTANT:
        Do not move the map to the first pharmacy
        when the page loads.

        Keep the default India view until
        the user performs a search or clicks
        "View on Map".
      */

      setCenter(defaultCenter);
      setZoom(defaultZoom);

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

  /* =========================================
     SEARCH PHARMACIES
  ========================================= */

  const searchPharmacies = async (value) => {
    const query = value.trim();

    setSearchQuery(value);

    /* Empty search */

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

      console.log(
        "Search query:",
        query
      );

      console.log(
        "Search results:",
        data
      );

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

      /* Find first pharmacy with valid coordinates */

      const firstValidPharmacy = data.find(
        (pharmacy) =>
          getCoordinates(pharmacy) !== null
      );

      /* Pharmacies found but no coordinates */

      if (!firstValidPharmacy) {
        message.warning(
          "Pharmacies found, but location coordinates are unavailable."
        );

        return;
      }

      /* Get coordinates */

      const coordinates =
        getCoordinates(
          firstValidPharmacy
        );

      console.log(
        "Moving map to:",
        coordinates
      );

      /* Move map */

      setCenter(coordinates);
      setZoom(13);

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

  /* =========================================
     SHOW PARTICULAR PHARMACY ON MAP
  ========================================= */

  const showOnMap = (pharmacy) => {
    const coordinates =
      getCoordinates(pharmacy);

    if (!coordinates) {
      message.warning(
        "Location is not available for this pharmacy"
      );

      return;
    }

    setCenter(coordinates);
    setZoom(15);
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="pharmacy-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="pharmacy-hero">

        <div className="pharmacy-hero-content">

          <div className="pharmacy-badge">

            <EnvironmentOutlined />

            <span>
              PHARMACY LOCATOR
            </span>

          </div>

          <Title>

            Find a pharmacy

            <br />

            <span>
              near you.
            </span>

          </Title>

          <p>
            Search pharmacies by city or pincode
            and find their location, opening hours
            and contact information.
          </p>

          {/* HERO SEARCH */}

          <div className="pharmacy-search">

            <SearchOutlined />

            <Input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              onPressEnter={() =>
                searchPharmacies(
                  searchQuery
                )
              }
              placeholder="Search by city or pincode..."
              bordered={false}
              allowClear
            />

            <Button
              type="primary"
              loading={loading}
              onClick={() =>
                searchPharmacies(
                  searchQuery
                )
              }
            >
              Search
            </Button>

          </div>

        </div>

        <div className="pharmacy-hero-icon">

          <EnvironmentOutlined />

        </div>

      </section>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <section className="pharmacy-content">

        {/* SECTION HEADER */}

        <div className="pharmacy-section-heading">

          <div>

            <span className="section-label">
              PHARMACY NETWORK
            </span>

            <h2>
              Pharmacies near you
            </h2>

          </div>

          <div className="location-count">

            <EnvironmentOutlined />

            <span>

              {pharmacies.length}{" "}

              {pharmacies.length === 1
                ? "location"
                : "locations"}

            </span>

          </div>

        </div>

        {/* =====================================
            MAP
        ===================================== */}

        <div className="map-wrapper">

          <div className="map-header">

            <div>

              <CompassOutlined />

              <span>
                Explore pharmacy locations
              </span>

            </div>

            <span>
              Click a marker for details
            </span>

          </div>

          <MapContainer
            center={center}
            zoom={zoom}
            className="pharmacy-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapUpdater
              center={center}
              zoom={zoom}
            />

            {/* PHARMACY MARKERS */}

            {pharmacies.map(
              (pharmacy) => {

                const coordinates =
                  getCoordinates(
                    pharmacy
                  );

                if (!coordinates) {
                  return null;
                }

                return (

                  <Marker
                    key={pharmacy.id}
                    position={coordinates}
                  >

                    <Popup>

                      <div className="map-popup">

                        <div className="popup-icon">

                          <MedicineBoxOutlined />

                        </div>

                        <strong>
                          {pharmacy.name}
                        </strong>

                        <span>
                          {pharmacy.address}
                        </span>

                        <span>
                          {pharmacy.city}
                        </span>

                        <div className="popup-info">

                          <span>

                            <PhoneOutlined />

                            {pharmacy.phone ||
                              "Not available"}

                          </span>

                          <span>

                            <ClockCircleOutlined />

                            {pharmacy.openingHours ||
                              "Not available"}

                          </span>

                        </div>

                      </div>

                    </Popup>

                  </Marker>

                );
              }
            )}

          </MapContainer>

        </div>

        {/* =====================================
            PHARMACY LIST
        ===================================== */}

        {pharmacies.length === 0 ? (

          <div className="pharmacy-empty">

            <Empty
              description="No pharmacies found"
            />

          </div>

        ) : (

          <div className="pharmacy-grid">

            {pharmacies.map(
              (pharmacy) => (

                <div
                  className="pharmacy-card"
                  key={pharmacy.id}
                >

                  {/* CARD TOP */}

                  <div className="pharmacy-card-top">

                    <div className="pharmacy-card-icon">

                      <MedicineBoxOutlined />

                    </div>

                    <div className="pharmacy-status">

                      <span></span>

                      Location available

                    </div>

                  </div>

                  {/* NAME */}

                  <h3>
                    {pharmacy.name}
                  </h3>

                  <div className="pharmacy-city">

                    <EnvironmentOutlined />

                    <span>
                      {pharmacy.city}
                    </span>

                  </div>

                  {/* DETAILS */}

                  <div className="pharmacy-details">

                    <div className="detail-row">

                      <EnvironmentOutlined />

                      <span>
                        {pharmacy.address}
                      </span>

                    </div>

                    <div className="detail-row">

                      <PhoneOutlined />

                      <span>

                        {pharmacy.phone ||
                          "Phone not available"}

                      </span>

                    </div>

                    <div className="detail-row">

                      <ClockCircleOutlined />

                      <span>

                        {pharmacy.openingHours ||
                          "Opening hours not available"}

                      </span>

                    </div>

                    <div className="detail-row">

                      <span className="pincode-label">
                        PIN
                      </span>

                      <span>

                        {pharmacy.pincode ||
                          "Not available"}

                      </span>

                    </div>

                  </div>

                  {/* VIEW ON MAP */}

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
                    className="view-map-button"
                  >
                    View on Map
                  </Button>

                </div>

              )
            )}

          </div>

        )}

      </section>

      {/* =====================================
          BOTTOM NOTE
      ===================================== */}

      <section className="pharmacy-note">

        <div className="pharmacy-note-icon">

          <EnvironmentOutlined />

        </div>

        <div>

          <h3>
            Need help finding a pharmacy?
          </h3>

          <p>
            Search using a city name or pincode
            to quickly find available pharmacy
            locations in the MedMatch network.
          </p>

        </div>

      </section>

    </div>
  );
}

export default PharmacyLocator;