import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Popconfirm,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import api from "../services/api";

const { Title } = Typography;

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();

  // --------------------------------------------------
  // LOAD PRESCRIPTIONS
  // --------------------------------------------------

  const loadPrescriptions = async () => {
    setLoading(true);

    try {
      const response = await api.get("/prescriptions");

      console.log("Prescriptions loaded:", response.data);

      setPrescriptions(response.data || []);
    } catch (error) {
      console.error("Failed to load prescriptions:", error);
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);

      message.error(
        error.response?.data?.message ||
          "Failed to load prescriptions"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load prescriptions when page opens
  useEffect(() => {
    loadPrescriptions();
  }, []);

  // --------------------------------------------------
  // UPLOAD PRESCRIPTION
  // --------------------------------------------------

  const handleSubmit = async (values) => {
    console.log("Prescription form submitted:", values);

    try {
      const response = await api.post(
        "/prescriptions",
        null,
        {
          params: {
            fileUrl: values.fileUrl,
            notes: values.notes || "",
          },
        }
      );

      console.log(
        "Prescription upload response:",
        response.data
      );

      message.success(
        "Prescription uploaded successfully"
      );

      setModalOpen(false);

      form.resetFields();

      // Reload table
      await loadPrescriptions();

    } catch (error) {
      console.error(
        "Prescription upload error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Response:",
        error.response?.data
      );

      message.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Upload failed"
      );
    }
  };

  // --------------------------------------------------
  // DELETE PRESCRIPTION
  // --------------------------------------------------

  const handleDelete = async (id) => {
    try {
      await api.delete(`/prescriptions/${id}`);

      message.success(
        "Prescription deleted successfully"
      );

      await loadPrescriptions();

    } catch (error) {
      console.error(
        "Delete prescription error:",
        error
      );

      message.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // --------------------------------------------------
  // TABLE COLUMNS
  // --------------------------------------------------

  const columns = [
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",

      render: (date) =>
        date
          ? new Date(date).toLocaleDateString()
          : "-",
    },

    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",

      render: (notes) =>
        notes || "-",
    },

    {
      title: "File",
      dataIndex: "fileUrl",
      key: "fileUrl",

      render: (url) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            View Document
          </a>
        ) : (
          "-"
        ),
    },

    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Popconfirm
          title="Delete prescription?"
          description="Are you sure you want to delete this prescription?"
          okText="Yes"
          cancelText="No"
          onConfirm={() =>
            handleDelete(record.id)
          }
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div>
      {/* PAGE HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Title
          level={2}
          style={{ margin: 0 }}
        >
          Prescriptions
        </Title>

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

      {/* PRESCRIPTION TABLE */}

      <Table
        loading={loading}
        columns={columns}
        dataSource={prescriptions}
        rowKey="id"
        locale={{
          emptyText:
            "No prescriptions uploaded yet",
        }}
      />

      {/* UPLOAD MODAL */}

      <Modal
        title="Upload Prescription"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        onOk={() => {
          form.submit();
        }}
        okText="Upload"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {/* FILE URL */}

          <Form.Item
            label="File URL"
            name="fileUrl"
            rules={[
              {
                required: true,
                message:
                  "Please input the file URL!",
              },
              {
                type: "url",
                message:
                  "Please enter a valid URL!",
              },
            ]}
          >
            <Input
              placeholder="https://example.com/prescription.pdf"
            />
          </Form.Item>

          {/* NOTES */}

          <Form.Item
            label="Description / Notes"
            name="notes"
          >
            <Input.TextArea
              placeholder="Add prescription details or notes..."
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Prescriptions;