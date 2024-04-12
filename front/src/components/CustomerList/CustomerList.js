import React, { useState, useEffect } from 'react';
import { getAllCustomer, deleteCustomer, updateCustomer } from '../../Service'; // Asegúrate de que estas funciones estén correctamente implementadas
import { Link, useNavigate } from "react-router-dom";
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';

const CustomersList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomer();
        setCustomers(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    if(localStorage.getItem('token-info')!=null) {
      setIsLoggedin(true);
    }

    fetchCustomers();
  }, []);

  const handleDelete = async (customerNumber) => {
    if (window.confirm(`Are you sure you want to delete this customer?`)) {
      try {
        await deleteCustomer(customerNumber);
        setCustomers(customers.filter(c => c.customerNumber !== customerNumber));
        alert('Customer deleted successfully!');
      } catch (error) {
        alert('Failed to delete customer');
        console.error(error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
     {isLoggedin ? (
        <>
    <div>
      <Dashboard />
      <div className="container">
        <div className="py-4">
          <h1>Customer Details</h1>
          <table className="table border shadow table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Customer Number</th>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Contact</th>
                <th scope="col">Occupation</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.customerNumber}>
                  <td>{customer.customerNumber}</td>
                  <td>{customer.firstName} {customer.middleName} {customer.lastName}</td>
                  <td>{customer.customerCity}</td>
                  <td>{customer.customerContactNo}</td>
                  <td>{customer.occupation}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => navigate(`/editcustomer/${customer.customerNumber}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(customer.customerNumber)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => {navigate("/createcustomer");}}>New Customer</button> 
        </div>
      </div>
    </div>
    </>):(<Home />)
    }
    </>
  );
};

export default CustomersList;
