import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventario.css'

const Inventario = () => {
  const [inventarioData, setInventarioData] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener datos del inventario
    axios.get('https://lacteos-tequendama-back.onrender.com/api/inventory')
      .then(response => {
        setInventarioData(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener datos del inventario:', error);
      });
  }, []); // La dependencia vacía significa que este efecto se ejecutará solo una vez al montar el componente

  return (
    <div className='frameprincipal'>
      <h2>Inventario</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Código de Producto</th>
          </tr>
        </thead>
        <tbody>
          {inventarioData.map(item => (
            <tr key={item.inv_id}>
              <td>{item.inv_id}</td>
              <td>{item.inv_nombre}</td>
              <td>{item.inv_cantidad}</td>
              <td>{item.inv_categoria}</td>
              <td>{new Date(item.inv_fecha).toLocaleString()}</td>
              <td>{item.pro_codigo}</td>
            </tr>
          ))}
        </tbody>
     
      </table>
      <button className="Btras" onClick={() => window.location.href = '/select'}>
        Atrás
      </button>
      <button className="Binv" onClick={() => window.location.href = '/editarinv'}>
        Editar inventario
      </button>
      
    </div>
  );
};

export default Inventario;