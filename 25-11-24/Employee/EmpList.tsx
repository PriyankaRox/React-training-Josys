import React from 'react';

import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

interface Employee {
  id: number;
  name: string;
  position: string;
}

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get("http://localhost:3001/employees");
  return response.data;
};

const EmpList: React.FC = () => {
  const { data, isLoading, isError } = useQuery(["employees"], fetchEmployees);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading employees</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmpList;
