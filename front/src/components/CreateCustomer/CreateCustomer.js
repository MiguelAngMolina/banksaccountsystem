import React, { useState } from 'react';
import { createCustomer } from '../../Service'; // Asegúrate de que la ruta sea correcta
import './CreateCustomer.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CreateCustomer = () => {
  const [customerData, setCustomerData] = useState({
    userId: '', // Cambio aquí para añadir userId si es necesario
    firstName: '',
    lastName: '',
    city: '',
    contactNumber: '',
    occupation: '',
    email: '',
    birthDate: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomerData = { ...customerData};

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
    <div className='general'>
    <div className="customer-form">
      <div className="customer">
        <h1 className="text-center">Add Customer</h1>
        <form className="needs-validation was-validated" onSubmit={handleSubmit}>
        
          <div className="form-group">
            <label className="form-label">First Name:</label>
            <input className="form-control" type="text" name="firstName" value={customerData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name:</label>
            <input className="form-control" type="text" name="lastName" value={customerData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">City:</label>
            <input className="form-control" type="text" name="city" value={customerData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contact No:</label>
            <input className="form-control" type="text" name="contactNumber" value={customerData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Occupation:</label>
            <input className="form-control" type="text" name="occupation" value={customerData.occupation} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input className="form-control" type="email" name="email" value={customerData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth:</label>
            <input className="form-control" type="date" name="birthDate" value={customerData.birthDate} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Create Customer</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateCustomer;
