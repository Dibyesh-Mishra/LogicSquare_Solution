// src/components/EmployeeForm.js
import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const EmployeeForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add Employee"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((errorInfo) => {
            console.log('Validation failed:', errorInfo);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the employee name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: 'Please enter the employee age' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true, message: 'Please select the employee designation' }]}
        >
          <Select>
            <Option value="Frontend Development">Frontend Development</Option>
            <Option value="Backend Development">Backend Development</Option>
            <Option value="Testing">Testing</Option>
            <Option value="Deployment">Deployment</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EmployeeForm;
