import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerAccountById, updateAccount } from '../../Service';

const EditAccount = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    userId: '',
    accountNumber: '',
    balance: '',
    accountType: '',
    accountStatus: ''
  });

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await getCustomerAccountById(accountId); // Verifica esta función
        if (response.data) {
          setAccountData({
            userId: response.data.userId || '',
            accountNumber: response.data.accountNumber || '',
            balance: response.data.balance.toString() || '',  // Asegúrate de convertir números a string para inputs
            accountType: response.data.accountType || '',
            accountStatus: response.data.accountStatus || ''
          });
        }
      } catch (error) {
        console.error("Failed to fetch account details", error);
      }
    };
    fetchAccount();
  }, [accountId]);

  const handleChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAccount(accountId, accountData);
    navigate('/accounts');
  };

  return (
    <div className='general'>
      <div className="customer-form">
        <div className="customer">
          <h1 className="text-center">Edit Account</h1>
          <form className="needs-validation was-validated" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">User ID:</label>
              <input
                className="form-control"
                type="text"
                name="userId"
                value={accountData.userId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Number:</label>
              <input
                className="form-control"
                type="text"
                name="accountNumber"
                value={accountData.accountNumber}
                onChange={handleChange}
                required
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
                {/* Añade aquí más tipos de cuenta si los hay */}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Account Status:</label>
              <select
                className="form-control"
                name="accountStatus"
                value={accountData.accountStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select Account Status</option>
                <option value="habilitada">habilitada</option>
                <option value="inhabilitada">inhabilitada</option>
                {/* Añade aquí más estados de cuenta si los hay */}
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
