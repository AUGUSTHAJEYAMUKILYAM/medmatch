import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Empty,
  Spin,
  Typography,
  message,
} from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const { Title } = Typography;

function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadFavorites = async () => {
    setLoading(true);

    try {
      const response =
        await api.get("/favorites");

      setFavorites(response.data);
    } catch (error) {
      message.error(
        "Failed to load favorites"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await api.delete(
        `/favorites/${id}`
      );

      message.success(
        "Removed from favorites"
      );

      loadFavorites();
    } catch (error) {
      message.error(
        "Failed to remove favorite"
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

  return (
    <div>
      <Title level={2}>
        My Favorites
      </Title>

      {favorites.length === 0 ? (
        <Empty description="No favorite medicines" />
      ) : (
        <Row gutter={[20, 20]}>
          {favorites.map((favorite) => {
            const medicine =
              favorite.medicine;

            return (
              <Col
                xs={24}
                sm={12}
                lg={8}
                key={favorite.id}
              >
                <Card
                  title={medicine?.name}
                >
                  <p>
                    <strong>
                      Generic Name:
                    </strong>{" "}
                    {medicine?.genericName}
                  </p>

                  <p>
                    <strong>
                      Strength:
                    </strong>{" "}
                    {medicine?.strength}
                  </p>

                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() =>
                      navigate(
                        `/medicines/${medicine?.id}`
                      )
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    View Details
                  </Button>

                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      removeFavorite(
                        favorite.id
                      )
                    }
                  >
                    Remove
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default Favorites;