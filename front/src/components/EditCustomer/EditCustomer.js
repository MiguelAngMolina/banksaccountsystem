import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, updateCustomer } from '../../Service';
import './EditCustomer.css';

const EditCustomer = () => {
  const { customerNumber } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customerNumber: '',
    firstName: '',
    lastName: '',
    customerCity: '',
    customerContactNo: '',
    occupation: '',
    customerDateOfBirth: '' 
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getCustomerById(customerNumber);  // Asegúrate que esta función está implementada correctamente.
        if (response.data) {
          setCustomerData({
            customerNumber: response.data.customerNumber || '',
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            city: response.data.city || '',
            contactNumber: response.data.contactNumber || '',
            occupation: response.data.occupation || '',
            email: response.data.email || '',
            birthDate: response.data.birthDate ? response.data.birthDate.slice(0, 10) : ''
          });
        }
      } catch (error) {
        console.error("Error al recuperar los datos del cliente", error);
      }
    };
    fetchCustomer();
  }, [customerNumber]); // Dependencia para re-cargar si el customerNumber cambia.
  
  

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCustomer(customerNumber, customerData);
    navigate('/customerlist');
  };

  return (
    <>
    <div>
      <div className="customer-form">
      <div className="customer">
          <h1 className="text-center">Editar cliente</h1>
          <form className="" onSubmit={handleSubmit}>
          <div className="form-group">
              <label className="form-label">Nombres:</label>
              <input className="form-control" type="text" name="firstName" value={customerData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Apellidos:</label>
              <input className="form-control" type="text" name="lastName" value={customerData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Ciudad:</label>
              <input className="form-control" type="text" name="city" value={customerData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Numero de contacto:</label>
              <input className="form-control" type="text" name="contactNumber" value={customerData.contactNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Ocupación / Cargo:</label>
              <input className="form-control" type="text" name="occupation" value={customerData.occupation} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Email:</label>
              <input className="form-control" type="email" name="email" value={customerData.email} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
                <label className="form-label">Fecha de nacimiento:</label>
                    <input 
                    className="form-control" 
                    type="date" 
                    name="birthDate" 
                    value={customerData.birthDate ? customerData.birthDate.split('T')[0] : ''} 
                    onChange={handleChange} 
                    required/>
            </div>
            <button type="submit" className="btn btn-success w-100">Guardar cambios</button>
          
          </form>
        </div>
       </div> 
    
    </div>

    </>
  );
};

export default EditCustomer;
