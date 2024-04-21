import React from 'react';
import { Input, Form, Select } from 'antd';

const { Option } = Select;

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  inputType,
  ...restProps
}) => {
  const getInputComponent = () => {
    if (inputType === 'text') {
      return <Input />;
    } else if (inputType === 'select') {
      return (
        <Select>
          <Option value="Frontend Development">Frontend Development</Option>
          <Option value="Backend Development">Backend Development</Option>
          <Option value="Testing">Testing</Option>
          <Option value="Deployment">Deployment</Option>
        </Select>
      );
    }
    // Add more cases as needed for different input types
  };

  const renderCell = () => {
    if (editable) {
      return (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          {getInputComponent()}
        </Form.Item>
      );
    }
    return children;
  };

  return <td {...restProps}>{renderCell()}</td>;
};

export default EditableCell;
