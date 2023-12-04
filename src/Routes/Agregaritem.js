import React, { useState } from 'react';


const AgregarItem = () => {
  const [nuevoItem, setNuevoItem] = useState({

    inv_nombre: '',
    inv_cantidad: 0,
    inv_categoria: '',
    inv_fecha: '',
    pro_codigo: 0,
  });

  const handleInputChange = (e) => {
    setNuevoItem({
      ...nuevoItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregarItem = async () => {
    try {
      const response = await fetch('https://lacteos-tequendama-back.onrender.com/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoItem),
      });

      if (response.status === 201) {
        console.log('Item añadido exitosamente:', response.data);
        alert('Item añadido exitosamente'); 
        window.location.href = '/inventario'}
         else {
        console.error('Error al añadir el item:', response.status);
        alert('Error al añadir el item');
      }
    } catch (error) {
      console.error('Error en la solicitud para añadir el item:', error);
      alert('Error en la solicitud para añadir el item');
    }
  };

  return (
    <div>
      <h2 className='edititu'>Añadir Item al Inventario</h2>
      <form className="formularioeditar" onSubmit={(e) => { e.preventDefault(); handleAgregarItem(); }}>
        <label className='labeleditar'>ID:</label>
        <input className='labeleditar' type="number" name="inv_id" value={nuevoItem.inv_id} />
        
        <label className='labeleditar'>Nombre:</label>
        <input className='labeleditar' type="text" name="inv_nombre" value={nuevoItem.inv_nombre} onChange={handleInputChange} />
        
        <label className='labeleditar'>Cantidad:</label>
        <input className='labeleditar' type="number" name="inv_cantidad" value={nuevoItem.inv_cantidad} onChange={handleInputChange} />
        
        <label className='labeleditar'>Categoría:</label>
        <input className='labeleditar' type="text" name="inv_categoria" value={nuevoItem.inv_categoria} onChange={handleInputChange} />
        
        <label className='labeleditar'>Fecha:</label>
        <input className='labeleditar' type="text" name="inv_fecha" value={nuevoItem.inv_fecha} onChange={handleInputChange} />
        
        <label className='labeleditar'>Código de Producto:</label>
        <input className='labeleditar' type="number" name="pro_codigo" value={nuevoItem.pro_codigo} onChange={handleInputChange} />

        <button className='enviareditado' type="submit">Añadir Item</button>
      </form>
      <button className="Btras" onClick={() => window.location.href = '/inventario'}>
        Atrás
      </button>
    </div>
  );
};

export default AgregarItem;