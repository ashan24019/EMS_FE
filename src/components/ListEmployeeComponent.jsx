import React, { useEffect, useState } from "react";
import { DeleteEmployee, ListEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, [])

  function getAllEmployees() {
     ListEmployees().then((response) => {
        setEmployees(response.data)
    }).catch(error => {
        console.log(error)
    })
  }

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`)
  }

  function deleteEmployee(id) {
    DeleteEmployee(id).then((response) => {
      console.log("Employee deleted successfully", response.data);
      getAllEmployees();
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="container">
      <h2 className="text-center">Employees List</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td className="d-flex justify-content-center align-items-center">
                <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => deleteEmployee(employee.id)} 
                  style={{marginLeft: "8px"}}
                >
                  Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
