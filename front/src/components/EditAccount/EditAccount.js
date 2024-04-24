import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerAccountById, updateAccount } from '../../Service';

const EditAccount = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    accountNumber: '',
    balance: '',
    accountType: '',
    user: {}  // Almacenar datos del usuario asociado si es necesario
  });

  useEffect(() => {
    console.log("Efecto activado"); // Debugging para verificar que el efecto se activa
    const fetchAccount = async () => {
      try {
        const response = await getCustomerAccountById(accountId);
        if (response.data) {
          console.log("Datos de la cuenta:", response.data); // Debugging para ver la estructura exacta
          setAccountData({
            accountNumber: response.data.accountNumber,
            balance: response.data.balance.toString(), // Convertir a string para manejarlo en el input
            accountType: response.data.accountType,
            user: {
              userId: response.data.usuario.userId, // Asegúrate de que estás estableciendo todos los datos del usuario
              firstName: response.data.usuario.firstName,
              lastName: response.data.usuario.lastName,
              email: response.data.usuario.email,
              city: response.data.usuario.city,
              occupation: response.data.usuario.occupation,
              birthDate: response.data.usuario.birthDate,
              contactNumber: response.data.usuario.contactNumber
            }
          });
        }
      } catch (error) {
        console.error("Error al recuperar los datos de la cuenta", error.message);
        alert("Error al recuperar los datos de la cuenta: " + error.message);
      }
    };
    fetchAccount();
  }, [accountId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Manejar cambios en los datos del usuario también, si es necesario
    if (name.startsWith('user.')) {
      const userKey = name.split('.')[1]; // user.firstName
      setAccountData(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          [userKey]: value
        }
      }));
    } else {
      setAccountData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await updateAccount(accountId, accountData);
        console.log(response); // Para depuración
        alert('Cuenta actualizada correctamente!');
        navigate('/accounts');
    } catch (error) {
        alert('Error al actualizar la cuenta: ' + error.message);
        console.error(error);
    }
};


  return (
    <div className='general'>
      <div className="customer-form">
        <div className="customer">
          <h1 className="text-center">Editar cuenta</h1>
          <form className="needs-validation was-validated" onSubmit={handleSubmit}>
            {/* Ejemplo de cómo mostrar información del usuario */}
            <div className="form-group">
              <label className="form-label">Nombre de usuario:</label>
              <input className="form-control" type="text" name="user.firstName" value={accountData.user.firstName || ''} onChange={handleChange} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Numero de cuenta:</label>
              <input className="form-control" type="text" name="accountNumber" value={accountData.accountNumber} onChange={handleChange} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Saldo:</label>
              <input className="form-control" type="text" name="balance" value={accountData.balance} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo de cuenta:</label>
              <select className="form-control" name="accountType" value={accountData.accountType} onChange={handleChange} required>
                <option value="">Seleccionar tipo de cuenta</option>
                <option value="ahorros">Ahorros</option>
                <option value="corriente">Corriente</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100">Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
