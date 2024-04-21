// src/components/Dashboard.js
import React, { createContext, useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';
import { Button } from 'antd';
import EmployeeForm from './EmployeeForm';

import uniqid from 'uniqid';
import EmployeeInsights from './EmployeeInsights';
export const AppContext = createContext({});

const Dashboard = () => {
  const [visible, setVisible] = useState(false);





  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [dataSource, setDataSource] = useState([
]);

  const handleCreate = (values) => {
    console.log('Received values of form:', values);
    setDataSource(prevDataSource => {
      const newData = [...prevDataSource, {...values, availability: true, id: uniqid('EmpId-')}];
      localStorage.setItem('data', JSON.stringify(newData));
      return newData;
    });



  };






  useEffect(()=>{

  const data = JSON.parse(localStorage.getItem('data'))
console.log(data)
if(data)
setDataSource(data)
else
setDataSource([])


},[])



 





  
  return (
<AppContext.Provider value={{dataSource,setDataSource}}>
<h1 className='text-3xl  h-[60px] font-semibold bg-blue-500 text-white py-2 text-center'>EmployeeManagement</h1>
    <div className=" h-screen flex flex-col lg:flex-row bg-slate-200 p-2">
      <div className="w-full lg:w-1/6 h-2/3 lg:h-full py-2 border-r-2  shadow-lg">
        {/* Total and available employees info */}


<EmployeeInsights data={dataSource}/>

        <Button type="primary" onClick={showModal} className='mt-6' >
          Add Employee
        </Button>
        <EmployeeForm
          visible={visible}
          onCreate={handleCreate}
          onCancel={handleCancel}
        />
      </div>
      <div className="w-full lg:w-5/6 h-screen flex items-start justify-center p-4">
        <EmployeeList />
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default Dashboard;
