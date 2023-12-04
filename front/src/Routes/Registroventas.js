import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventario.css';

const Registroventas = () => {
  const [ventasData, setVentasData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchVentasData = async () => {
        try {
          const formattedDate = selectedDate ? new Date(selectedDate).toISOString() : '';
          const response = await axios.get('https://lacteos-tequendama-back.onrender.com/api/sell', {
            params: {
              fecha: formattedDate,
            },
          });
          setVentasData(response.data.data);
        } catch (error) {
          console.error('Error al obtener datos de ventas:', error);
        }
      };

    if (selectedDate) {
      fetchVentasData();
    }
  }, [selectedDate]);
  const totalVentas = ventasData.reduce((total, venta) => total + venta.fac_total, 0);

  return (
    <div className='frameprincipal'>
      <h2>Ventas</h2>

      {/* Selector de fecha */}
      <label>Seleccionar Fecha:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>ID cliente</th>
            <th>ID empleado</th>
          </tr>
        </thead>
        <tbody>
          {ventasData.map(item => (
            <tr key={item.fac_codigo}>
              <td>{item.fac_codigo}</td>
              <td>{item.fac_fecha}</td>
              <td>{item.fac_total}</td>
              <td>{item.cli_id}</td>
              <td>{item.emp_id}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            
        </tfoot>
        <p>Total de Ventas: {totalVentas}</p>   
      </table>
        
      <button className="Btras" onClick={() => window.location.href = '/select'}>
        Atrás
      </button>
    </div>
  );
};

export default Registroventas;