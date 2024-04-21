import React from 'react';

const EmployeeInsights = ({ data }) => {
  const totalEmployees = data.length;

  const availableEmployees = data.filter(employee => employee.availability).length;
  const unavailableEmployees = totalEmployees - availableEmployees;

  const departmentCounts = data.reduce((counts, employee) => {
    counts[employee.designation] = (counts[employee.designation] || 0) + 1;
    return counts;
  }, {});

  return (
    <div className='px-2'>
      <div className='bg-blue-50 border-blue-200 border-2 rounded-lg '>
        <h3  className='font-semibold text-lg lg:text-2xl'> {totalEmployees}</h3>
        <p className='font-semibold'>Total Employees</p>
      </div>
      <div>
        <h3  className='text-green-500 font-semibold text-lg'>Available : {availableEmployees}</h3>
      </div>
      <div>
        <h3 className='text-gray-500 font-semibold text-lg'>Unavailable : {unavailableEmployees}</h3>
      </div>
      <div style={{ marginTop: 16 }} className='flex flex-row lg:flex-col items-center justify-start gap-1'>
        {Object.entries(departmentCounts).map(([department, count]) => (
          <div key={department} className='bg-blue-50 text-blue-400 text-left lg:p-5 border-blue-500 p-2 border-2 rounded-lg my-5 w-2/6 h-20 lg:h-auto lg:w-full'>
            <h3 className='text-[8px] font-semibold lg:text-md'>{department} Employees</h3>
            <p className='font-semibold text-[10px] lg:text-lg'>Total: {count}</p>
            <p className='text-green-500 font-semibold text-[10px] lg:text-lg'>Available: {data.filter(employee => employee.designation === department && employee.availability).length}</p>
            <p className='text-gray-600 font-semibold text-[10px] lg:text-lg'>Unavailable: {data.filter(employee => employee.designation === department && !employee.availability).length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeInsights;
