import React, { useEffect, useState } from "react";
import {
  Button,
  Empty,
  Spin,
  Typography,
  message,
} from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  HeartFilled,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Favorites.css";

const { Title, Text } = Typography;

function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);

    try {
      const response = await api.get("/favorites");
      setFavorites(response.data || []);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      message.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);

      message.success("Removed from favorites");

      await loadFavorites();
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      message.error("Failed to remove favorite");
    }
  };

  if (loading) {
    return (
      <div className="favorites-loading">
        <Spin size="large" />
        <Text>Loading your favorite medicines...</Text>
      </div>
    );
  }

  return (
    <div className="favorites-page">

      {/* HEADER */}
      <section className="favorites-header">

        <div>
          <Text className="favorites-eyebrow">
            YOUR MEDICINE COLLECTION
          </Text>

          <Title>
            My Favorites
          </Title>

          <Text className="favorites-subtitle">
            Quickly access the medicines you want to keep track of.
          </Text>
        </div>

        <div className="favorites-count">
          <HeartFilled />
          <span>
            {favorites.length}
          </span>
        </div>

      </section>


      {/* EMPTY */}
      {favorites.length === 0 ? (

        <div className="favorites-empty">

          <div className="favorites-empty-icon">
            <HeartFilled />
          </div>

          <Title level={3}>
            No favorite medicines
          </Title>

          <Text>
            Medicines you save will appear here for quick access.
          </Text>

          <Button
            type="primary"
            onClick={() => navigate("/medicines")}
          >
            Browse Medicines
          </Button>

        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map((favorite) => {

            const medicine = favorite.medicine;

            if (!medicine) return null;

            return (
              <div
                className="favorite-medicine-card"
                key={favorite.id}
              >

                {/* CARD ICON */}
                <div className="favorite-card-image">

                  <MedicineBoxOutlined />

                  <div className="favorite-heart">
                    <HeartFilled />
                  </div>

                </div>


                {/* INFORMATION */}
                <div className="favorite-card-body">

                  <Title level={4}>
                    {medicine.name}
                  </Title>

                  <Text className="generic-name">
                    {medicine.genericName ||
                      "Generic name unavailable"}
                  </Text>


                  <div className="medicine-strength">
                    <span>Strength</span>
                    <strong>
                      {medicine.strength || "Not specified"}
                    </strong>
                  </div>


                  <div className="favorite-actions">

                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() =>
                        navigate(
                          `/medicines/${medicine.id}`
                        )
                      }
                    >
                      View Details
                    </Button>

                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() =>
                        removeFavorite(favorite.id)
                      }
                    >
                      Remove
                    </Button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default Favorites;