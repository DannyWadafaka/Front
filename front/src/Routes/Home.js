import React, { useState } from 'react';
import { useFetch } from './Hooks/useAxios';
import './Home.css';

const ProductTable = () => {
  const buysState = useFetch('https://lacteos-tequendama-back.onrender.com/api/product');
  const [products, setProducts] = useState([]);
  const [searchProductId, setSearchProductId] = useState('');
  const [total, setTotal] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    cliid: 1, // Inicializar con un valor predeterminado
  });
  const iva = 5;

  const handleSearchProduct = () => {
    const productId = parseInt(searchProductId, 10);
    const product = buysState.data.data.find((p) => p.pro_codigo === productId);

    if (product) {
      product.cantidad = 1;
      product.precioTotal = product.pro_precio * product.cantidad * (1 + iva / 100);

      setProducts((prevProducts) => [...prevProducts, product]);
      setTotal((prevTotal) => prevTotal + product.precioTotal);
    } else {
      alert('Producto no encontrado');
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[index];
      const oldTotalPrice = product.precioTotal;

      product.cantidad = newQuantity;

      // Calcular el nuevo precio total basándose en la nueva cantidad
      product.precioTotal = product.pro_precio * product.cantidad * (1 + iva / 100);

      // Actualizar el total sumando/substrayendo el cambio en el precio total
      setTotal((prevTotal) => prevTotal - oldTotalPrice + product.precioTotal);

      return updatedProducts;
    });
  };

  const handleClearTable = () => {
    setProducts([]);
    setTotal(0);
  };

  const handleQuickPayment = async () => {
    const quickPaymentData = {
      fac_codigo: 0,
      fac_fecha: new Date().toISOString(),
      fac_total: total,
      cli_id: customerInfo.cliid, // Usar el cli_id del estado customerInfo
      emp_id: 1, // Aquí debes proporcionar el ID del empleado correspondiente
    };

    try {
        await fetch('https://lacteos-tequendama-back.onrender.com/api/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quickPaymentData),
      });
      try{
        products.map(async(product) => {
          await fetch('https://lacteos-tequendama-back.onrender.com/api/procedures/update_inventory', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              p_pro_codigo: product.pro_codigo,
              p_cantidad: -product.cantidad
            }),
          });
        });
        console.log('Pago rápido exitoso');
        // Si se ejecuta correctamente
        alert("Pago rápido exitoso;")
        // Reiniciar la tabla y el total después del pago
        handleClearTable();
      }
      catch(error){
        console.error('Error en la solicitud de pago rápido:', error);
        alert('Error en la solicitud de pago rápido');
      }
    }
      
    catch (error) {
      console.error('Error en la solicitud de pago rápido:', error);
      alert('Error en la solicitud de pago rápido');
    }
  };


  return (
    <div>
      <h2>Lista de Productos</h2>

      <div className='id'>
        <label>
          Buscar por ID:
          <input
            className='input1'
            type="number"
            value={searchProductId}
            onChange={(e) => setSearchProductId(e.target.value)}
          />
        </label>
        <button onClick={handleSearchProduct}>Añadir producto</button>
      </div>

      <div className='table-container'>
        <h3 className='title01'>Detalles del Producto</h3>

        <table className='Frame07'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>IVA</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.pro_codigo}>
                <td>{product.pro_nombre}</td>
                <td>${product.pro_precio.toFixed(2)}</td>
                <td>{product.pro_descripcion}</td>
                <td>{iva.toFixed(0)}%</td>
                <td>
                  <div className='cantidad'>
                    <input
                      className='input2'
                      type="number"
                      value={product.cantidad}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                    />
                  </div>
                </td>
                <td>
                  {product.precioTotal !== undefined ? `$${product.precioTotal.toFixed(2)}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">Total:</td>
              <td>${total.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="5">Cliente ID:</td>
              <td>
                <input className='cliinput'
                  type="number"
                  value={customerInfo.cliid}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, cliid: parseInt(e.target.value, 10) })}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button className='Btclean' onClick={handleClearTable}>
        Limpiar
      </button>
      <button className="Btpago" onClick={handleQuickPayment}>Pago Rápido</button>
      <button className="Bttarjeta">Pago con Tarjeta</button>
      <button className="Btmas">Más métodos de pago</button>
      <button className="Btopc">Otras Opciones</button>
      <button className="Btique">Imprimir tiquete</button>
      <button className="Btras" onClick={() => window.location.href = '/select'}>
        Atrás
      </button>
    </div>
  );
};

export default ProductTable;