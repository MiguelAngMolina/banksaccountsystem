import React, { useState, useEffect } from 'react';
import "./CreateTransaccion.css";
import { createTransaction, getAllCustomerAccount } from '../../Service';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const CreateTransaction = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [transactionData, setTransactionData] = useState({
    fromAccountId: '',
    toAccountId: '',
    fromUserName: '',
    toUserName: '',
    date: new Date().toISOString().slice(0, 10), // Fecha actual en formato YYYY-MM-DD
    amount: '',
    transactionNumber: generateTransactionNumber() // Número de transacción automáticamente
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await getAllCustomerAccount();
      setAccounts(response.data || []);
    };

    generateTransactionNumber();

    fetchAccounts();
  }, []);

  function generateTransactionNumber() {
    // Genera tres dígitos aleatorios.
    const digits = () => Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
    // Letras aleatorias (una mayúscula y una minúscula.
    const letters = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < 2; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
  
    // Combina las partes para crear el número de transacción.
    return `TX${digits()}${letters()}${digits()}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'fromAccountId' || name === 'toAccountId') {
      const selectedAccount = accounts.find(account => account.accountId === value);
      const keyName = name === 'fromAccountId' ? 'fromUserName' : 'toUserName';
      setTransactionData(prevState => ({
        ...prevState,
        [keyName]: selectedAccount ? `${selectedAccount.usuario.firstName} (${selectedAccount.accountType})` : ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTransaction(transactionData);
      alert('Transacción creada correctamente!');
      console.log(response);
      navigate('/transactionslist'); // Asegúrate de que esta ruta es correcta
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "El dinero para transferir no es suficiente :( ¡Inténtalo de nuevo!",
        icon: "error",
        confirmButtonText: 'Ok'
    });

    }
  };

  return (
    <div className='general'>
      <div className="customer-form">
        <div className="customer">
          <h1 className="text-center">Crear transacción</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Numero de transacción:</label>
              <input
                className="form-control"
                type="text"
                name="transactionNumber"
                value={transactionData.transactionNumber}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cuenta de envío:</label>
              <select
                className="form-control"
                name="fromAccountId"
                value={transactionData.fromAccountId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccinoar cuenta de envío</option>
                {accounts.map(account => (
                  <option key={account.accountId} value={account.accountId}>
                    {account.accountId} - {account.usuario.firstName} {account.usuario.lastName} - {account.accountType} - ${account.balance.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Cuenta que recibe:</label>
              <select
                className="form-control"
                name="toAccountId"
                value={transactionData.toAccountId}
                onChange={handleChange}
                required
                disabled={!transactionData.fromAccountId}
              >
                <option value="">Seleccionar cuenta que recibe</option>
                {accounts.filter(account => account.accountId !== transactionData.fromAccountId).map(account => (
                  <option key={account.accountId} value={account.accountId}>
                    {account.accountId} - {account.usuario.firstName} {account.usuario.lastName}- {account.accountType} - ${account.balance.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Fecha:</label>
              <input
                className="form-control"
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cantidad:</label>
              <input
                className="form-control"
                type="text"
                name="amount"
                value={transactionData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Crear transacción</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTransaction;