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
  const [prescriptions, setPrescriptions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [form] = Form.useForm();

  const loadPrescriptions = async () => {
    setLoading(true);

    try {
      const response =
        await api.get("/prescriptions");

      setPrescriptions(response.data);
    } catch (error) {
      message.error(
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
      await api.post(
        "/prescriptions",
        null,
        {
          params: values,
        }
      );

      message.success(
        "Prescription uploaded successfully"
      );

      setModalOpen(false);
      form.resetFields();

      loadPrescriptions();
    } catch (error) {
      message.error("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/prescriptions/${id}`
      );

      message.success("Deleted successfully");

      loadPrescriptions();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const columns = [
    {
      title: "Upload Date",
      dataIndex: "date",
      key: "date",
      render: (date) =>
        date
          ? new Date(date).toLocaleDateString()
          : "-",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Title level={2}>
          Prescriptions
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          Upload Prescription
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={prescriptions}
        rowKey="id"
      />

      <Modal
        title="Upload Prescription"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="File URL"
            name="fileUrl"
            rules={[
              {
                required: true,
                message:
                  "Please input the file URL!",
              },
            ]}
          >
            <Input placeholder="https://example.com/prescription.pdf" />
          </Form.Item>

          <Form.Item
            label="Notes"
            name="notes"
          >
            <Input.TextArea
              placeholder="Add notes..."
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Prescriptions;