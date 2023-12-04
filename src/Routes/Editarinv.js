import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventario.css';

const Editarinv = () => {
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

  const handleEdit = (itemId) => {
    // Redirigir a la página de edición con el ID del elemento seleccionado
    window.location.href = `/realizaredicion/${itemId}`;
  };

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
            <th>Acciones</th>
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
              <td>
                <button onClick={() => handleEdit(item.inv_id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="Btras" onClick={() => window.location.href = '/inventario'}>
        Atrás
      </button>
      <button className="Bañadir"onClick={()=> window.location.href = '/agregaritem'}>Añadir Item</button>
    </div>
  );
};

export default Editarinv;