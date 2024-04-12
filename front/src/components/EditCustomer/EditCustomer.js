import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, updateCustomer } from '../../Service';
import './EditCustomer.css';
import Dashboard from '../Dashboard/Dashboard';

const EditCustomer = () => {
  const { customerNumber } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customerNumber: '',
    firstName: '',
    middleName: '',
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
            middleName: response.data.middleName || '',
            lastName: response.data.lastName || '',
            customerCity: response.data.customerCity || '',
            customerContactNo: response.data.customerContactNo || '',
            occupation: response.data.occupation || '',
            customerDateOfBirth: response.data.customerDateOfBirth ? response.data.customerDateOfBirth.split('T')[0] : ''
          });
        }
      } catch (error) {
        console.error("Failed to fetch customer details", error);
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
      <Dashboard />
      <div className="customer-form">
      <div className="customer">
          <h1 className="text-center">Edit Customer</h1>
          <form className="needs-validation was-validated" onSubmit={handleSubmit}>
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
                    <input 
                    className="form-control" 
                    type="date" 
                    name="customerDateOfBirth" 
                    value={customerData.customerDateOfBirth ? customerData.customerDateOfBirth.split('T')[0] : ''} 
                    onChange={handleChange} 
                    required/>
            </div>
            <button type="submit" className="btn btn-success w-100">Save Changes</button>
          
          </form>
        </div>
       </div> 
    
    </div>

    </>
  );
};

export default EditCustomer;