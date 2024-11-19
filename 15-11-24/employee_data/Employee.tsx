import React, { useState } from "react";
import "./employee.css";

interface EmployeeData {
  empNo: number;
  empName: string;
  empjob: string;
  empSalary: number;
}

const Employee = () => {
  const [employee, setEmployee] = useState<EmployeeData>({
    empNo: 0,
    empName: "",
    empjob: "",
    empSalary: 0,
  });
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: name === "empNo" || name === "empSalary" ? Number(value) : value,
    });
  };

  const handleAddEmployee = () => {
    if (
      employee.empNo &&
      employee.empName &&
      employee.empjob &&
      employee.empSalary
    ) {
      setEmployeeInfo([...employeeInfo, employee]);
      setEmployee({
        empNo: 0,
        empName: "",
        empjob: "",
        empSalary: 0,
      });
    } else {
      alert("Please add the details!");
    }
  };

  return (
    <div className="container">
      <h1>Employee Data</h1>
      <div className="employee-view">
        <div>
          <div className="sub-employee-view">
            <label>Employee No:</label>
            <input
              type="number"
              name="empNo"
              value={employee.empNo || ""}
              onChange={handleChange}
              placeholder="Enter Employee No"
            />
          </div>
          <div className="sub-employee-view">
            <label>Job:</label>
            <input
              type="text"
              name="empjob"
              value={employee.empjob}
              onChange={handleChange}
              placeholder="Enter Employee Job"
            />
          </div>
        </div>
        <div>
          <div className="sub-employee-view">
            <label>Employee Name:</label>
            <input
              type="string"
              name="empName"
              value={employee.empName}
              onChange={handleChange}
              placeholder="Enter Employee Name"
            />
          </div>
          <div className="sub-employee-view">
            <label>Salary:</label>
            <input
              type="number"
              name="empSalary"
              value={employee.empSalary || ""}
              onChange={handleChange}
              placeholder="Enter Employee Salary"
            />
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
      <div className="employee-table-view">
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>Emp No</th>
              <th>Name</th>
              <th>Job</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employeeInfo.map((emp, index) => (
              <tr key={index}>
                <td>{emp.empNo}</td>
                <td>{emp.empName}</td>
                <td>{emp.empjob}</td>
                <td>{emp.empSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
