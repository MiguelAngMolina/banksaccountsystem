import React, { useState, useEffect } from 'react';
import { getAllTransactions, deleteTransaction } from '../../Service'; // Asegúrate de que estas funciones estén implementadas
import { useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';

const TransactionsList = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getAllTransactions();
        setTransactions(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    if(localStorage.getItem('token-info')!=null) {
        setIsLoggedin(true);
      }

    fetchTransactions();
  }, []);

  const handleDelete = async (transactionId) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta transacción?')) {
      try {
        await deleteTransaction(transactionId);
        setTransactions(transactions.filter(t => t.transactionId !== transactionId));
        alert('Transacción eliminada correctamente!');
      } catch (error) {
        alert('Error al eliminar transacción');
        console.error(error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
     {isLoggedin ? (
        <>
    <div >
      <Dashboard />
    <div className="container">
      <div className="py-4">
        <h1>Detalles de la transacción</h1>
        <table className="table border shadow table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID de transacción</th>
              <th scope="col">HASH de transacción</th>
              <th scope="col">Cuenta emisora</th>
              <th scope="col">Cuenta destino</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.transactionNumber}</td>
                <td>{transaction.fromUserName || transaction.fromAccount.accountNumber}</td>
                <td>{transaction.toUserName || transaction.toAccount.accountNumber}</td>
                <td>{formatDate(transaction.date)}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(transaction.transactionId)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => navigate("/createtransaction")}>Nueva transacción</button>
      </div>
    </div>
    </div>
    </>):(<Home />)
    }
    </>
  );
};

export default TransactionsList;
