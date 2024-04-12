import React, { useState, useEffect } from 'react';
import { getAllCustomer } from '../../Service'; // Asume que este servicio está implementado para llamar a tu API
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomer();
        if (response.status === 200) {
          setCustomers(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

    };


    if(localStorage.getItem('token-info')!=null)
    {
      setIsLoggedin(true)
    }

    fetchCustomers();
  }
  , []);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>

    {isLoggedin?
            (
            <>
            <Dashboard />
            <div className="container">
          <div className="py-4">
            <h1>Customer Details</h1>
            <table className="table border shadow table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Número de Cliente</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Contacto</th>
                  <th scope="col">Ocupación</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customerNumber}>
                    <td>{customer.customerNumber}</td>
                    <td>{`${customer.firstName} ${customer.middleName} ${customer.lastName}`}</td>
                    <td>{customer.customerCity}</td>
                    <td>{customer.customerContactNo}</td>
                    <td>{customer.occupation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    
    </>
    ) : (<Home />)
        }    

    </>
  );
};

export default CustomersList;
