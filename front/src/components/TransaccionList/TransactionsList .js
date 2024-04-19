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
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(transactionId);
        setTransactions(transactions.filter(t => t.transactionId !== transactionId));
        alert('Transaction deleted successfully!');
      } catch (error) {
        alert('Failed to delete transaction');
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
        <h1>Transaction Details</h1>
        <table className="table border shadow table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">Transaction HASH</th>
              <th scope="col">From Username Account</th>
              <th scope="col">To Username Account</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Actions</th>
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
                  <button className="btn btn-danger" onClick={() => handleDelete(transaction.transactionId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => navigate("/createtransaction")}>New Transaction</button>
      </div>
    </div>
    </div>
    </>):(<Home />)
    }
    </>
  );
};

export default TransactionsList;
