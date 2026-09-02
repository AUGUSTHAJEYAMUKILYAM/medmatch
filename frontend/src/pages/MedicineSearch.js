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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchMedicines,
  searchMedicines,
} from "../store/medicineSlice";

const { Title } = Typography;

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
    <div>
      <Title level={2}>Medicine Search</Title>

      <Input.Search
        placeholder="Search by name or generic name..."
        size="large"
        allowClear
        onSearch={handleSearch}
        onClear={handleClear}
        style={{
          maxWidth: "600px",
          marginBottom: "30px",
        }}
      />

      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
          }}
        >
          <Spin size="large" />
        </div>
      ) : list.length === 0 ? (
        <Empty description="No medicines found" />
      ) : (
        <Row gutter={[20, 20]}>
          {list.map((medicine) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              key={medicine.id}
            >
              <Card
                hoverable
                title={medicine.name}
                onClick={() =>
                  navigate(`/medicines/${medicine.id}`)
                }
              >
                <p>
                  <strong>Generic Name:</strong>{" "}
                  {medicine.genericName}
                </p>

                <Tag>
                  {medicine.dosageForm}
                </Tag>

                <Tag>
                  {medicine.strength}
                </Tag>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default MedicineSearch;