import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Popconfirm,
  Typography,
  message,
} from "antd";
import {
  MedicineBoxOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import api from "../services/api";

const { Sider, Content } = Layout;
const { Title } = Typography;

function AdminDashboard() {
  const [activeTab, setActiveTab] =
    useState("medicines");

  const [data, setData] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form] = Form.useForm();

  const loadData = async (tab) => {
    setLoading(true);

    try {
      const endpoint =
        tab === "medicines"
          ? "/medicines"
          : "/pharmacies";

      const response =
        await api.get(endpoint);

      setData(response.data);
    } catch (error) {
      message.error(
        "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const openAddModal = () => {
    setEditingId(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const endpoint =
        activeTab === "medicines"
          ? `/medicines/${id}`
          : `/pharmacies/${id}`;

      await api.delete(endpoint);

      message.success(
        "Deleted successfully"
      );

      loadData(activeTab);
    } catch (error) {
      message.error(
        "Delete failed"
      );
    }
  };

  const handleSave = async (values) => {
    try {
      const endpoint =
        activeTab === "medicines"
          ? "/medicines"
          : "/pharmacies";

      if (editingId) {
        await api.put(
          `${endpoint}/${editingId}`,
          values
        );
      } else {
        await api.post(
          endpoint,
          values
        );
      }

      message.success(
        activeTab === "medicines"
          ? "Medicine saved!"
          : "Pharmacy saved!"
      );

      setModalOpen(false);
      form.resetFields();
      setEditingId(null);

      loadData(activeTab);
    } catch (error) {
      message.error("Action failed");
    }
  };

  const medicineColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Generic Name",
      dataIndex: "genericName",
      key: "genericName",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (value) =>
        value ? (
          <CheckCircleOutlined
            style={{
              color: "green",
              fontSize: "20px",
            }}
          />
        ) : (
          <CloseCircleOutlined
            style={{
              color: "red",
              fontSize: "20px",
            }}
          />
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              openEditModal(record)
            }
            style={{
              marginRight: "8px",
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete?"
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
        </>
      ),
    },
  ];

  const pharmacyColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              openEditModal(record)
            }
            style={{
              marginRight: "8px",
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete?"
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
        </>
      ),
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "600px",
      }}
    >
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={({ key }) =>
            setActiveTab(key)
          }
          items={[
            {
              key: "medicines",
              icon: <MedicineBoxOutlined />,
              label: "Medicines",
            },
            {
              key: "pharmacies",
              icon: <EnvironmentOutlined />,
              label: "Pharmacies",
            },
          ]}
        />
      </Sider>

      <Content
        style={{
          padding: "30px",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Title level={2}>
            Admin Dashboard
          </Title>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddModal}
          >
            Add
          </Button>
        </div>

        <Table
          loading={loading}
          dataSource={data}
          rowKey="id"
          columns={
            activeTab === "medicines"
              ? medicineColumns
              : pharmacyColumns
          }
          scroll={{ x: true }}
        />

        <Modal
          title={
            editingId
              ? "Edit"
              : "Add"
          }
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
            onFinish={handleSave}
          >
            {activeTab === "medicines" ? (
              <>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Generic Name"
                  name="genericName"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Manufacturer"
                  name="manufacturer"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Dosage Form"
                  name="dosageForm"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Strength"
                  name="strength"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="In Stock"
                  name="inStock"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Pincode"
                  name="pincode"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Latitude"
                  name="latitude"
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Longitude"
                  name="longitude"
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </>
            )}
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}

export default AdminDashboard;