import React, { useState, useEffect } from 'react';
import { getAllCustomer, deleteCustomer} from '../../Service';
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
    if (window.confirm(`¿Está seguro de que desea eliminar a este cliente?`)) {
      try {
        await deleteCustomer(userId);
        setCustomers(customers.filter(c => c.userId !== userId));
        alert('Cliente eliminado correctamente!');
      } catch (error) {
        alert('Error al eliminar el cliente');
        console.error(error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
          <h1>Detalles del cliente</h1>
          <table className="table border shadow table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col"># Cliente </th>
                <th scope="col">Nombre</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Contacto</th>
                <th scope="col">Ocupación / Cargo</th>
                <th scope='col'>Email</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Acciones</th>
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
                    <button style={{ marginRight: '10px' }}  className="btn btn-warning" onClick={() => navigate(`/editcustomer/${customer.userId}`)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(customer.userId)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => {navigate("/createcustomer");}}>Nuevo cliente</button> 
        </div>
      </div>
    </div>
    </>):(<Home />)
    }
    </>
  );
};

export default CustomersList;
