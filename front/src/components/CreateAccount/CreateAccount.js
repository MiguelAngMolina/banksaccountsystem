import React, { useState, useEffect } from 'react';
import { createAccount, getAllCustomer } from '../../Service';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [accountData, setAccountData] = useState({
    userId: '',
    accountNumber: '', // Eliminamos el valor inicial aquí
    balance: '',
    accountType: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllCustomer();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        alert('Failed to load users: ' + error.message);
      }
    };

    // Generar el número de cuenta al cargar el componente
    generateAccountNumber();

    fetchUsers();
  }, []);

  // Función para generar un número de cuenta aleatorio
  const generateAccountNumber = () => {
    const min = 9000000000;
    const max = 9999999999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    setAccountData(prevData => ({
      ...prevData,
      accountNumber: num.toString()
    }));
  };

  const handleChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAccount(accountData);
      alert('Account created successfully!');
      navigate('/accounts');
    } catch (error) {
      alert('Failed to create the account');
      console.error(error);
    }
  };

  return (
    <div className='general'>
      <div className="customer-form">
        <div className="customer">
          <h1 className="text-center">Add Account</h1>
          <form className="needs-validation was-validated" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">User ID:</label>
              <select
                className="form-control"
                name="userId"
                value={accountData.userId}
                onChange={handleChange}
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.userId} value={user.userId}>
                    {user.firstName} {user.lastName} - {user.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Account Number:</label>
              <input
                className="form-control"
                type="text"
                name="accountNumber"
                value={accountData.accountNumber}
                onChange={handleChange}
                readOnly // Este campo es de sólo lectura, ya que el número es generado automáticamente
              />
            </div>
            <div className="form-group">
              <label className="form-label">Balance:</label>
              <input
                className="form-control"
                type="text"
                name="balance"
                value={accountData.balance}
                onChange={handleChange}
                placeholder="Balance"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Type:</label>
              <select
                className="form-control"
                name="accountType"
                value={accountData.accountType}
                onChange={handleChange}
                required
              >
                <option value="">Select Account Type</option>
                <option value="ahorros">ahorros</option>
                <option value="corriente">corriente</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
