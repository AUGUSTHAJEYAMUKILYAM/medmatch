import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Empty,
  Spin,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  FileTextOutlined,
  EyeOutlined,
  CalendarOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import api from "../services/api";
import "./Prescriptions.css";

const { Title, Text } = Typography;

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();

  const loadPrescriptions = async () => {
    setLoading(true);

    try {
      const response = await api.get("/prescriptions");
      setPrescriptions(response.data || []);
    } catch (error) {
      console.error("Failed to load prescriptions:", error);

      message.error(
        error.response?.data?.message ||
          "Failed to load prescriptions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const handleSubmit = async (values) => {
    try {
      await api.post("/prescriptions", null, {
        params: {
          fileUrl: values.fileUrl,
          notes: values.notes || "",
        },
      });

      message.success("Prescription uploaded successfully");

      setModalOpen(false);
      form.resetFields();

      await loadPrescriptions();
    } catch (error) {
      console.error("Prescription upload error:", error);

      message.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Upload failed"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/prescriptions/${id}`);

      message.success("Prescription deleted successfully");

      await loadPrescriptions();
    } catch (error) {
      console.error("Delete prescription error:", error);

      message.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="prescriptions-page">

      {/* HERO */}
      <section className="prescriptions-hero">
        <div className="prescriptions-hero-content">

          <div className="prescriptions-hero-icon">
            <FileTextOutlined />
          </div>

          <div>
            <Text className="prescriptions-eyebrow">
              PERSONAL HEALTH RECORDS
            </Text>

            <Title className="prescriptions-title">
              My Prescriptions
            </Title>

            <Text className="prescriptions-subtitle">
              Keep your prescriptions organized and easily accessible
              whenever you need them.
            </Text>
          </div>

        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="upload-prescription-btn"
          onClick={() => {
            form.resetFields();
            setModalOpen(true);
          }}
        >
          Upload Prescription
        </Button>
      </section>


      {/* CONTENT */}
      <section className="prescriptions-content">

        <div className="prescriptions-section-heading">
          <div>
            <Title level={3}>Your Documents</Title>

            <Text>
              {prescriptions.length}{" "}
              {prescriptions.length === 1
                ? "prescription"
                : "prescriptions"}{" "}
              saved
            </Text>
          </div>
        </div>


        {/* LOADING */}
        {loading ? (
          <div className="prescriptions-loading">
            <Spin size="large" />
            <Text>Loading your prescriptions...</Text>
          </div>
        ) : prescriptions.length === 0 ? (

          /* EMPTY STATE */
          <div className="prescriptions-empty">
            <Empty
              image={
                <div className="empty-prescription-icon">
                  <FileTextOutlined />
                </div>
              }
              description={
                <div>
                  <Title level={4}>
                    No prescriptions yet
                  </Title>

                  <Text>
                    Upload your first prescription to keep
                    your medical documents in one place.
                  </Text>
                </div>
              }
            />

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                form.resetFields();
                setModalOpen(true);
              }}
            >
              Upload Prescription
            </Button>
          </div>

        ) : (

          /* PRESCRIPTION CARDS */
          <div className="prescription-grid">

            {prescriptions.map((prescription) => (
              <div
                className="prescription-card"
                key={prescription.id}
              >

                <div className="prescription-card-top">

                  <div className="prescription-file-icon">
                    <FilePdfOutlined />
                  </div>

                  <div className="prescription-card-title">
                    <Text strong>
                      Prescription Document
                    </Text>

                    <span>
                      <CalendarOutlined />
                      {formatDate(prescription.uploadDate)}
                    </span>
                  </div>

                </div>


                <div className="prescription-notes">

                  <Text className="notes-label">
                    NOTES
                  </Text>

                  <Text className="notes-value">
                    {prescription.notes ||
                      "No additional notes added."}
                  </Text>

                </div>


                <div className="prescription-card-actions">

                  {prescription.fileUrl && (
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      href={prescription.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Document
                    </Button>
                  )}

                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      Modal.confirm({
                        title: "Delete prescription?",
                        content:
                          "This prescription will be permanently removed.",
                        okText: "Delete",
                        cancelText: "Cancel",
                        okButtonProps: {
                          danger: true,
                        },
                        onOk: () =>
                          handleDelete(prescription.id),
                      });
                    }}
                  >
                    Delete
                  </Button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>


      {/* UPLOAD MODAL */}
      <Modal
        title={
          <div className="upload-modal-title">
            <div className="upload-modal-icon">
              <FileTextOutlined />
            </div>

            <div>
              <div>Upload Prescription</div>

              <span>
                Add a prescription document to your records
              </span>
            </div>
          </div>
        }
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Upload"
        cancelText="Cancel"
        centered
        className="prescription-modal"
      >

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >

          <Form.Item
            label="Prescription File URL"
            name="fileUrl"
            rules={[
              {
                required: true,
                message: "Please enter the file URL",
              },
              {
                type: "url",
                message: "Please enter a valid URL",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<FileTextOutlined />}
              placeholder="https://example.com/prescription.pdf"
            />
          </Form.Item>


          <Form.Item
            label="Description / Notes"
            name="notes"
          >
            <Input.TextArea
              rows={5}
              placeholder="Add any useful information about this prescription..."
              showCount
              maxLength={500}
            />
          </Form.Item>

        </Form>

      </Modal>

    </div>
  );
}

export default Prescriptions;