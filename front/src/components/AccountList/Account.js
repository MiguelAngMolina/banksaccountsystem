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
    if (window.confirm(`¿Estás seguro de querer eliminar esta cuenta?`)) {
      try {
        await deleteCustomerAccount(accountId);
        setAccounts(accounts.filter(a => a.accountId !== accountId));
        alert('Cuenta eliminada correctamente!');
      } catch (error) {
        alert('Error al eliminar la cuenta');
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
          <h1>Detalles de cuenta</h1>
          <table className="table border shadow table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col"># Cuenta</th>
                <th scope="col">Nombre de usuario</th>
                <th scope="col">Numero de cuenta</th>
                <th scope="col">Saldo</th>
                <th scope="col">Tipo de cuenta</th>
                <th scope="col">Acciones</th>
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
                    <button style={{ marginRight: '10px' }} className="btn btn-warning" onClick={() => navigate(`/editaccount/${account.accountId}`)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(account.accountId)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => {navigate("/createaccount");}}>Nueva Cuenta</button> 
        </div>
      </div>
    </div>
    </>):(<Home />)
    }
    </>
  );
};

export default AccountsList;
