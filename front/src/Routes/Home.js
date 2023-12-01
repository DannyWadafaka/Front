import { useState } from "react";
import './Home.css';

export function Home({}) {
  const handleLogout = () => {
    // Lógica para cerrar sesión
  };

  return (
    <div>
      <h1 className="Titulo">Welcome</h1>
      <button onClick={handleLogout}>Logout</button>
      <ProductViewer />
    </div>
  );
}

const ProductViewer = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchProductId, setSearchProductId] = useState('');
  const [allProducts, setAllProducts] = useState([]);

  // Lista de productos
  const products = [
    { id: 1, name: 'Producto A', price: 10.99, quantity: 20 },
    { id: 2, name: 'Producto B', price: 15.99, quantity: 15 },
  ];

  const handleSearchProduct = () => {
    const productId = parseInt(searchProductId, 10);
    if (!isNaN(productId)) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        const sortedProducts = [...allProducts, product].sort((a, b) => a.id - b.id);
        // Agregar el producto encontrado a la lista existente
        setAllProducts((prevProducts) => [...prevProducts, product]);
        setSelectedProduct(product);
      } else {
        setSelectedProduct(null);
        alert('Producto no encontrado');
      }
    } else {
      setSelectedProduct(null);
      alert('Ingresa un ID válido');
    }
  };
  const handleClearTable = () => {
    // Limpiar la lista de productos
    setAllProducts([]);
  };



  return (
    <div>
      <h2>Lista de Productos</h2>

      {/* Búsqueda por ID */}
      <div className="Frame01">
        <label>
          Buscar por ID:
          <input
            type="number"
            value={searchProductId}
            onChange={(e) => setSearchProductId(e.target.value)}
          />
        </label>
        <button onClick={handleSearchProduct}>Añadir producto</button>
      </div>

      {/* Detalles del Producto */}
      <div className="Frame02">
        <h3 className="Titutu">Detalles del Producto</h3>

        {/* Tabla para mostrar detalles del producto */}
        <table className="Frame07">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad Disponible</th>
            </tr>
          </thead>
          <tbody className="respuesta">
            {allProducts.map((product) => (
              <tr key={product.id}>
                <td className="id">{product.id}</td>
                <td className="name">{product.name}</td>
                <td className="price">${product.price.toFixed(2)}</td>
                <td className="quantity">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      

      {/* Botones adicionales */}
      <button class="Btpago">Pago Rápido</button>
      <button class="Bttarjeta">Pago con Tarjeta</button>
      <button class="Btmas">Más metodos de pago</button>
      <button class="Btopc">Otras Opciones</button>
      <button class="Btique">Imprimir tiquete</button>
      <button class="Btras" onClick={()=> window.location.href = '/select'} >Atrás</button>
              {/* Botón para limpiar la tabla */}
              <button onClick={handleClearTable}>Limpiar</button>
    </div>
  );
};

export default ProductViewer;

