import React, { useEffect } from "react";
import {
  Input,
  Card,
  Row,
  Col,
  Tag,
  Empty,
  Spin,
  Typography,
  Button,
} from "antd";
import {
  SearchOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchMedicines,
  searchMedicines,
} from "../store/medicineSlice";

import "./MedicineSearch.css";

const { Title, Paragraph, Text } = Typography;

function MedicineSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector(
    (state) => state.medicines
  );

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

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

  return (
    <div className="medicine-page">

      {/* ================= HEADER ================= */}

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
            Search our medicine database by brand name or
            generic name and find detailed information about
            your medication.
          </Paragraph>

          {/* Search */}

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
            <CheckIcon />
            Search by medicine name, generic name or active ingredient
          </div>

        </div>

        {/* Decorative medicine visual */}

        <div className="medicine-header-visual">

          <div className="medicine-pill">

            <div className="pill-half"></div>

          </div>

          <div className="medicine-cross">
            +
          </div>

        </div>

      </section>


      {/* ================= MEDICINE LIST ================= */}

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
            <Empty
              description="No medicines found"
            />
          </div>

        ) : (

          <Row gutter={[20, 20]}>

            {list.map((medicine) => (

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={6}
                key={medicine.id}
              >

                <Card
                  className="medicine-card"
                  hoverable
                  onClick={() =>
                    navigate(
                      `/medicines/${medicine.id}`
                    )
                  }
                >

                  {/* Medicine icon */}

                  <div className="medicine-card-top">

                    <div className="medicine-icon">
                      <MedicineBoxOutlined />
                    </div>

                    <span className="medicine-available">
                      Available
                    </span>

                  </div>


                  {/* Medicine name */}

                  <h3 className="medicine-name">
                    {medicine.name}
                  </h3>


                  {/* Generic */}

                  <div className="generic-info">

                    <span>
                      Generic name
                    </span>

                    <strong>
                      {medicine.genericName || "Not specified"}
                    </strong>

                  </div>


                  {/* Tags */}

                  <div className="medicine-tags">

                    {medicine.dosageForm && (
                      <Tag>
                        {medicine.dosageForm}
                      </Tag>
                    )}

                    {medicine.strength && (
                      <Tag>
                        {medicine.strength}
                      </Tag>
                    )}

                  </div>


                  {/* Details */}

                  <div className="medicine-card-footer">

                    <span>
                      View medicine details
                    </span>

                    <ArrowRightOutlined />

                  </div>

                </Card>

              </Col>

            ))}

          </Row>

        )}

      </section>


      {/* ================= INFORMATION BANNER ================= */}

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

      </section>

    </div>
  );
}


/* Small helper icon */

function CheckIcon() {
  return (
    <span className="check-icon">
      ✓
    </span>
  );
}

export default MedicineSearch;