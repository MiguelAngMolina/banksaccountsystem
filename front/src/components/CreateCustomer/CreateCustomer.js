import React, { useState } from 'react';
import { createCustomer } from '../../Service'; // Asegúrate de que la ruta sea correcta
import "./CreateCustomer.css";
import Dashboard from '../Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';


const CreateCustomer = () => {
  const [customerData, setCustomerData] = useState({

    customerNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    customerCity: '',
    customerContactNo: '',
    occupation: '',
    customerDateOfBirth: '' // Asegúrate de manejar la fecha correctamente
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const generateCustomerNumber = () => {
    // Ejemplo: generar un número aleatorio entre 10000 y 99999
    return Math.floor(100 + Math.random() * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomerNumber = generateCustomerNumber();
    const newCustomerData = { ...customerData, customerNumber: newCustomerNumber };

    try {
      const response = await createCustomer(newCustomerData);
      alert('Cliente creado con éxito!'); // Puedes usar también una librería de notificaciones
      console.log(response);
      navigate('/customerlist');

    } catch (error) {
      alert('Error al crear el cliente');
      console.error(error);
    }
  };

  return (
    <div>
    <Dashboard />
    <div className="customer-form">
      <div className="customer">
        <h1 className="text-center">Add Customer</h1>
        <form className="needs-validation was-validated" onSubmit={handleSubmit}>
        <div className="form-group">
              <label className="form-label">Customer Number:</label>
              <input className="form-control" type="text" name="customerNumber" value={customerData.customerNumber} readOnly />
            </div>
          <div className="form-group">
            <label className="form-label">First Name:</label>
            <input className="form-control" type="text" name="firstName" value={customerData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Middle Name:</label>
            <input className="form-control" type="text" name="middleName" value={customerData.middleName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name:</label>
            <input className="form-control" type="text" name="lastName" value={customerData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">City:</label>
            <input className="form-control" type="text" name="customerCity" value={customerData.customerCity} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contact No:</label>
            <input className="form-control" type="text" name="customerContactNo" value={customerData.customerContactNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Occupation:</label>
            <input className="form-control" type="text" name="occupation" value={customerData.occupation} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth:</label>
            <input className="form-control" type="date" name="customerDateOfBirth" value={customerData.customerDateOfBirth} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Create Customer</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateCustomer;
