// src/components/EmployeeList.js
import React, { useContext, useEffect, useState } from 'react';
import { Table, Input, Button, Form, Popconfirm, Modal, Switch, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,DeleteOutlined,EditOutlined, FilterOutlined } from '@ant-design/icons';

import { AppContext } from './Dashboard';

const EmployeeList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

const {dataSource,setDataSource} = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };


  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAvailable,setIsAvailable]=useState(false)
  const [form] = Form.useForm();
  const [filterValue, setFilterValue] = useState(null);
const [editRecord,setEditRecord] = useState({})
const [filteredData, setFilteredData] = useState([]);


useEffect(()=>{

setFilteredData(dataSource)



},[dataSource,setDataSource])







  const handleEdit = (record) => {

   
    setEditingEmployee(record);
    form.setFieldsValue(record);
  setEditRecord(record)
 
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newData = [...filteredData];
      const index = newData.findIndex((item) => editingEmployee.key === item.key);
      if (index > -1) {
        newData[index] = { ...newData[index], ...values ,availability:isAvailable};
        setFilteredData(newData);
        localStorage.setItem('data',JSON.stringify(newData))
        setIsModalVisible(false);

        setDataSource(filteredData)
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };




  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const handleDelete = (id) => {
    const dataSourceCopy = [...filteredData];
    setFilteredData((prevdata)=>{
        const filter =dataSourceCopy.filter(item => item.id !== id)
        localStorage.setItem('data',JSON.stringify(filter))
    });

    setDataSource(filteredData)

  
  

  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
    if (value === true) {
      setFilteredData(dataSource.filter(employee => employee.availability));
    } else if (value === false) {
      setFilteredData(dataSource.filter(employee => !employee.availability));
    } else {
      setFilteredData(dataSource);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      ...getColumnSearchProps('designation'),
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Select
            defaultValue={null}
            onChange={handleFilterChange}
            style={{ width: 120, marginBottom: 8, display: 'block' }}
          >
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
            <Select.Option value={null}>All</Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={() => handleFilterChange(null)}
            size="small"
            style={{ width: 80, marginRight: 8 }}
          >
            Reset
          </Button>
       
        </div>
      ),
      filterIcon: () => <FilterOutlined />,
      onFilterDropdownVisibleChange: (visible) => {
        if (!visible) {
          setFilterValue(null);
        }
      },
      render: availability => (
        <span>{availability ? 'Available' : 'Not Available'}</span>
      ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (index, record) => (
          <span>
            <Button type='text' onClick={() => handleEdit(record)}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this employee?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
             
                <DeleteOutlined />
         
            </Popconfirm>
          </span>
        ),
      },
 
  ];
 
  return (
  <div className='w-full overflow-x-auto'>
      <Table
   
   dataSource={filteredData}
   columns={columns}
scroll={{x:'max-content'}}
   pagination={{ pageSize: 5 }}
 />
     <Modal
        title="Edit Employee"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input />
          </Form.Item>
          <Form.Item name="designation" label="Designation">
            <Input />
          </Form.Item>
        </Form>
        <Form.Item name="availability" label="Availability" valuePropName="checked">
      <Switch checkedChildren="Available" unCheckedChildren="Not Available" defaultValue={editRecord?.availability} onChange={(checked)=>{setIsAvailable(checked)}}/>
    </Form.Item>
      </Modal>
  </div>
  );
}

export default EmployeeList;
