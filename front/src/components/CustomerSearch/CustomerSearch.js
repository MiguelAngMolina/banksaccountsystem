import React, { useState } from 'react';
import { getCustomerByNumber } from '../../Service'; // Asegúrate de que la ruta sea correcta

const CustomerSearch = () => {
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await getCustomerByNumber(customerNumber);
      setCustomerData(data);
      setError('');
    } catch (err) {
      setError('Cliente no encontrado o error en la búsqueda');
      setCustomerData(null);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={customerNumber} 
        onChange={(e) => setCustomerNumber(e.target.value)} 
        placeholder="Enter Customer Number" 
      />
      <button onClick={handleSearch}>Buscar Cliente</button>
      {error && <p>{error}</p>}
      {customerData && (
        <div>
          {/* Renderiza aquí la información del cliente */}
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;
