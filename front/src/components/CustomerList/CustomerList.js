import React, { useState, useEffect } from 'react';
import { getAllCustomer, deleteCustomer} from '../../Service'; // Asegúrate de que estas funciones estén correctamente implementadas
import { useNavigate } from "react-router-dom";
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

  const handleDelete = async (userId) => {
    if (window.confirm(`Are you sure you want to delete this customer?`)) {
      try {
        await deleteCustomer(userId);
        setCustomers(customers.filter(c => c.userId !== userId));
        alert('Customer deleted successfully!');
      } catch (error) {
        alert('Failed to delete customer');
        console.error(error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Esto dará, por ejemplo, "December 31, 1989"
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
     {isLoggedin ? (
        <>
    <div >
      <Dashboard />
      <div className="container">
        <div className="py-4">
          <h1>Customer Details</h1>
          <table className="table border shadow table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col"># Customer </th>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Contact</th>
                <th scope="col">Occupation</th>
                <th scope='col'>Email</th>
                <th scope="col">Birthday</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.userId}>
                  <td>{customer.userId}</td>
                  <td>{customer.firstName} {customer.middleName} {customer.lastName}</td>
                  <td>{customer.city}</td>
                  <td>{customer.contactNumber}</td>
                  <td>{customer.occupation}</td>
                  <td>{customer.email}</td>
                  <td>{formatDate(customer.birthDate)}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => navigate(`/editcustomer/${customer.userId}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(customer.userId)}>Delete</button>
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
