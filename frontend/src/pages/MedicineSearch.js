import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Empty,
  Spin,
  Typography,
  Button,
  message,
} from "antd";
import {
  SearchOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchMedicines,
  searchMedicines,
} from "../store/medicineSlice";

import api from "../services/api";
import "./MedicineSearch.css";

const { Title, Paragraph } = Typography;

function MedicineSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector(
    (state) => state.medicines
  );

  const { token } = useSelector(
    (state) => state.auth
  );

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  // Load user's favourites
  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        const response = await api.get("/favorites");

        setFavorites(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load favorites:",
          error
        );
      }
    };

    loadFavorites();
  }, [token]);

  const handleSearch = (value) => {
    if (value.trim()) {
      dispatch(searchMedicines(value.trim()));
    } else {
      dispatch(fetchMedicines());
    }
  };

  const handleClear = () => {
    dispatch(fetchMedicines());
  };

  const isFavorite = (medicineId) => {
    return favorites.some(
      (favorite) =>
        favorite.medicine?.id === medicineId ||
        favorite.medicineId === medicineId
    );
  };

  const handleFavorite = async (medicine, event) => {
    event.stopPropagation();

    if (!token) {
      message.info(
        "Please login to add medicines to favourites."
      );
      navigate("/login");
      return;
    }

    const existingFavorite = favorites.find(
      (favorite) =>
        favorite.medicine?.id === medicine.id ||
        favorite.medicineId === medicine.id
    );

    try {
      if (existingFavorite) {
        await api.delete(
          `/favorites/${existingFavorite.id}`
        );

        setFavorites((current) =>
          current.filter(
            (favorite) =>
              favorite.id !== existingFavorite.id
          )
        );

        message.success(
          `${medicine.name} removed from favourites`
        );
      } else {
        const response = await api.post(
          `/favorites/${medicine.id}`
        );

        setFavorites((current) => [
          ...current,
          response.data,
        ]);

        message.success(
          `${medicine.name} added to favourites`
        );
      }
    } catch (error) {
      console.error(
        "Favorite error:",
        error
      );

      message.error(
        error.response?.data?.message ||
          "Could not update favourite"
      );
    }
  };

  return (
    <div className="medicine-page">

      {/* HERO */}

      <section className="medicine-header">

        <div className="medicine-header-content">

          <div className="medicine-label">
            <MedicineBoxOutlined />
            MEDICINE STORE
          </div>

          <Title>
            Find the right medicine
            <br />
            <span>for your needs.</span>
          </Title>

          <Paragraph>
            Search our medicine database by brand name
            or generic name and find useful information
            about your medication.
          </Paragraph>

          <div className="medicine-search-box">

            <SearchOutlined className="big-search-icon" />

            <Input
              placeholder="Search medicines by name or generic name..."
              bordered={false}
              onPressEnter={(e) =>
                handleSearch(e.target.value)
              }
              onChange={(e) => {
                if (!e.target.value) {
                  handleClear();
                }
              }}
            />

            <Button
              type="primary"
              onClick={() => {
                const input =
                  document.querySelector(
                    ".medicine-search-box input"
                  );

                handleSearch(input?.value || "");
              }}
            >
              Search
            </Button>

          </div>

          <div className="search-hint">
            <span className="check-icon">✓</span>
            Search by medicine name, generic name or active ingredient
          </div>

        </div>

        <div className="medicine-header-visual">

          <div className="medicine-pill">
            <div className="pill-half"></div>
          </div>

          <div className="medicine-cross">
            +
          </div>

        </div>

      </section>


      {/* RESULTS */}

      <section className="medicine-results">

        <div className="results-heading">

          <div>
            <span className="results-label">
              MEDICINE CATALOG
            </span>

            <h2>
              Available Medicines
            </h2>
          </div>

          {!loading && list.length > 0 && (
            <span className="medicine-count">
              {list.length} medicines
            </span>
          )}

        </div>


        {loading ? (

          <div className="medicine-loading">
            <Spin size="large" />
            <p>Finding medicines...</p>
          </div>

        ) : list.length === 0 ? (

          <div className="medicine-empty">
            <Empty description="No medicines found" />
          </div>

        ) : (

          <Row gutter={[22, 22]}>

            {list.map((medicine) => {

              const favorite =
                isFavorite(medicine.id);

              return (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  key={medicine.id}
                >

                  <div
                    className="medicine-product"
                    onClick={() =>
                      navigate(
                        `/medicines/${medicine.id}`
                      )
                    }
                  >

                    {/* TOP */}

                    <div className="product-top">

                      <div className="product-medicine-icon">
                        <MedicineBoxOutlined />
                      </div>

                      <button
                        className={`favorite-button ${
                          favorite
                            ? "favorite-active"
                            : ""
                        }`}
                        onClick={(event) =>
                          handleFavorite(
                            medicine,
                            event
                          )
                        }
                        aria-label={
                          favorite
                            ? "Remove from favourites"
                            : "Add to favourites"
                        }
                      >
                        {favorite ? (
                          <HeartFilled />
                        ) : (
                          <HeartOutlined />
                        )}
                      </button>

                    </div>


                    {/* MAIN INFO */}

                    <div className="product-main">

                      <span className="product-status">
                        Available
                      </span>

                      <h3>
                        {medicine.name}
                      </h3>

                    </div>


                    {/* HOVER DETAILS */}

                    <div className="product-hover-details">

                      <div className="hover-detail">

                        <span>
                          Generic name
                        </span>

                        <strong>
                          {medicine.genericName ||
                            "Not specified"}
                        </strong>

                      </div>

                      <div className="hover-tags">

                        {medicine.strength && (
                          <span>
                            {medicine.strength}
                          </span>
                        )}

                        {medicine.dosageForm && (
                          <span>
                            {medicine.dosageForm}
                          </span>
                        )}

                      </div>

                      <div className="product-details-link">
                        View Details
                        <ArrowRightOutlined />
                      </div>

                    </div>

                  </div>

                </Col>
              );
            })}

          </Row>

        )}

      </section>


      {/* BOTTOM INFO */}

      <section className="medicine-info-banner">

        <div className="info-icon">
          <MedicineBoxOutlined />
        </div>

        <div>
          <h3>
            Looking for a specific medicine?
          </h3>

          <p>
            Search by brand or generic name to quickly
            find the information you're looking for.
          </p>
        </div>

        <Button
          onClick={() => {
            const input =
              document.querySelector(
                ".medicine-search-box input"
              );

            input?.focus();
          }}
        >
          Search Medicines
        </Button>

      </section>

    </div>
  );
}

export default MedicineSearch;