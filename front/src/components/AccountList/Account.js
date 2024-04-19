import React, { useState, useEffect } from 'react';
import { getAllCustomerAccount, deleteCustomerAccount } from '../../Service'; // Asegúrate de que estas funciones estén correctamente implementadas
import { useNavigate } from "react-router-dom";
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';

const AccountsList = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllCustomerAccount();
        setAccounts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };


    

    if(localStorage.getItem('token-info')!=null) {
      setIsLoggedin(true);
    }

    fetchAccounts();
  }, []);

  const handleDelete = async (accountId) => {
    if (window.confirm(`Are you sure you want to delete this account?`)) {
      try {
        await deleteCustomerAccount(accountId);
        setAccounts(accounts.filter(a => a.accountId !== accountId));
        alert('Account deleted successfully!');
      } catch (error) {
        alert('Failed to delete account');
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
    <div >
      <Dashboard />
      <div className="container">
        <div className="py-4">
          <h1>Account Details</h1>
          <table className="table border shadow table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col"># Account</th>
                <th scope="col">User Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Account Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.accountId}>
                  <td>{account.accountId}</td>
                  <td>{account.usuario.firstName} {account.usuario.lastName}</td>          
                  <td>{account.accountNumber}</td>
                  <td>${account.balance.toFixed(2)}</td>
                  <td>{account.accountType}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => navigate(`/editaccount/${account.accountId}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(account.accountId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => {navigate("/createaccount");}}>New Account</button> 
        </div>
      </div>
    </div>
    </>):(<Home />)
    }
    </>
  );
};

export default AccountsList;
