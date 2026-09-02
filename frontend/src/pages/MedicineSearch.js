import React, { useEffect } from "react";
import {
  Input,
  Card,
  Row,
  Col,
  Tag,
  Spin,
  Empty,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedicines,
  searchMedicines,
} from "../store/medicineSlice";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function MedicineSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    list,
    loading,
  } = useSelector((state) => state.medicines);

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

  return (
    <div>
      <Title level={2}>
        Medicine Search
      </Title>

      <Input.Search
        placeholder="Search by name or generic name..."
        size="large"
        allowClear
        onSearch={handleSearch}
        style={{
          maxWidth: "700px",
          marginBottom: "30px",
        }}
      />

      {loading ? (
        <div style={{ textAlign: "center" }}>
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
              lg={8}
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
                  <strong>Generic:</strong>{" "}
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