import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Realizaredicion.css';

const Realizaredicion = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    inv_id: 0,
    inv_nombre: '',
    inv_cantidad: 0,
    inv_categoria: '',
    inv_fecha: '',
    pro_codigo: 0,
  });

  useEffect(() => {
    const itemId = id;

    axios.get(`https://lacteos-tequendama-back.onrender.com/api/inventory/${itemId}`)
      .then(response => {
        setFormData(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener detalles del inventario:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateInventory = async () => {
    try {
      const response = await fetch(`https://lacteos-tequendama-back.onrender.com/api/inventory/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Datos actualizados exitosamente:', response.data);
        alert('Datos actualizados exitosamente');
        window.location.href = '/inventario';
      } else {
        console.error('Error al actualizar datos del inventario:', response.status);
        alert('Error al actualizar datos del inventario');
      }
    } catch (error) {
      console.error('Error en la solicitud de actualización del inventario:', error);
      alert('Error en la solicitud de actualización del inventario');
    }
  };

  return (
    <div>
      <h2 className='edititu'>Editar Inventario</h2>
      <form className="formularioeditar" onSubmit={(e) => { e.preventDefault(); handleUpdateInventory(); }}>
        <label className='labeleditar'>ID:</label>
        <input className='labeleditar' type="text" name="inv_id" value={formData.inv_id} readOnly />
        <label className='labeleditar'>Nombre:</label>
        <input className='labeleditar' type="text" name="inv_nombre" value={formData.inv_nombre} onChange={handleInputChange} />
        <label className='labeleditar'>Cantidad:</label>
        <input className='labeleditar' type="text" name="inv_cantidad" value={formData.inv_cantidad} onChange={handleInputChange} />
        <label className='labeleditar'>Categoría:</label>
        <input className='labeleditar' type="text" name="inv_categoria" value={formData.inv_categoria} onChange={handleInputChange} />
        <label className='labeleditar'>Fecha:</label>
        {/* ¿Dónde está el campo de fecha en tu formulario? Agrega el campo si es necesario */}
        <label className='labeleditar'>Código de Producto:</label>
        <input type="text" name="pro_codigo" value={formData.pro_codigo} readOnly />

        <button className='enviareditado' type="submit">Guardar Cambios</button>
      </form>
      <button className="Btras" onClick={() => window.location.href = '/editarinv'}>
        Atrás
      </button>
    </div>
  );
};

export default Realizaredicion;