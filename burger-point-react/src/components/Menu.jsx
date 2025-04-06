import React, { useState } from 'react';
import ProductoModal from './ProductoModal';
import CarritoModal from './CarritoModal';
import burgerNortina from '../assets/nortina.png';

const Menu = ({ carrito, setCarrito, mostrarCarrito, setMostrarCarrito }) => {
  const [modalProducto, setModalProducto] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: 'Burger Point Nortina',
      imagen: burgerNortina,
      precioSimple: 7500,
      precioDoble: 9500,
      descripcion: 'CARNE 100% DE VACUNO. Queso cheddar, tomate, lechuga hidropónica, pepinillos, lactonesa de ajo y lactonesa de aceituna',
      ingredientes: [
        'Pan brioche',
        'Carne smash 135g',
        'Queso cheddar',
        'Tomate',
        'Lechuga hidropónica',
        'Pepinillos',
        'Lactonesa de ajo',
        'Lactonesa de aceituna'
      ],
      incluye: 'Incluye porción de papas fritas naturales'
    },
    {
      id: 2,
      nombre: 'Burger Point Suprema',
      precioSimple: 8000,
      precioDoble: 10000,
      descripcion: 'CARNE 100% DE VACUNO. Queso mantecoso, cebolla caramelizada, tocino, huevo, lactonesa',
      ingredientes: [
        'Pan brioche',
        'Carne smash 135g',
        'Queso mantecoso',
        'Cebolla caramelizada',
        'Tocino',
        'Huevo',
        'Lactonesa'
      ],
      incluye: 'Incluye porción de papas fritas naturales'
    },
    {
      id: 3,
      nombre: 'Burger Point Clásica',
      precioSimple: 7500,
      precioDoble: 9500,
      descripcion: 'CARNE 100% DE VACUNO. Queso cheddar, tomate, lechuga hidropónica, pepinillos, lactonesa ajo y lactonesa',
      ingredientes: [
        'Pan brioche',
        'Carne smash 135g',
        'Queso cheddar',
        'Tomate',
        'Lechuga hidropónica',
        'Pepinillos',
        'Lactonesa de ajo',
        'Lactonesa'
      ],
      incluye: 'Incluye porción de papas fritas naturales'
    },
    {
      id: 4,
      nombre: 'Burger Point Bacon',
      precioSimple: 7000,
      precioDoble: 9000,
      descripcion: 'CARNE 100% DE VACUNO. Queso mantecoso, cebolla crispy, tocino, huevo, lactonesa',
      ingredientes: [
        'Pan brioche',
        'Carne smash 135g',
        'Queso mantecoso',
        'Cebolla crispy',
        'Tocino',
        'Huevo',
        'Lactonesa'
      ],
      incluye: 'Incluye porción de papas fritas naturales'
    }
  ];

  const agregarAlCarrito = (producto, cantidad, esDoble) => {
    const precio = esDoble ? producto.precioDoble : producto.precioSimple;
    const nombre = `${producto.nombre} ${esDoble ? 'Doble' : 'Simple'}`;
    const itemExistente = carrito.find(item =>
      item.id === producto.id && item.esDoble === esDoble
    );

    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id && item.esDoble === esDoble
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      setCarrito([...carrito, {
        id: producto.id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        esDoble: esDoble,
        subtotal: precio * cantidad
      }]);
    }
  };

  return (
    <div className="menu-container">
      <div className="menu">
        {productos.map(producto => (
          <div
            key={producto.id}
            className="producto-card"
            onClick={() => setModalProducto(producto)}
          >
            <div className="producto-header">
              <h2>{producto.nombre}</h2>
            </div>
            <div className="producto-body">
              <p className="descripcion">{producto.descripcion}</p>
              <div className="precios-container">
                <div className="precio-item">
                  <span className="precio-label">Simple</span>
                  <span className="precio-valor">${producto.precioSimple.toLocaleString()}</span>
                </div>
                <div className="separador"></div>
                <div className="precio-item">
                  <span className="precio-label">Doble</span>
                  <span className="precio-valor">${producto.precioDoble.toLocaleString()}</span>
                </div>
              </div>
              <p className="incluye-text">{producto.incluye}</p>
              <div className="ingredientes-preview">
                {producto.ingredientes.map((ingrediente, index) => (
                  <span key={index} className="ingrediente-tag">
                    {ingrediente}
                  </span>
                ))}
              </div>
            </div>
            <button className="ver-detalles-btn">
              Ver detalles y ordenar
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        ))}
      </div>

      {modalProducto && (
        <ProductoModal
          producto={modalProducto}
          onClose={() => setModalProducto(null)}
          onAgregarCarrito={agregarAlCarrito}
        />
      )}

      {mostrarCarrito && (
        <CarritoModal
          carrito={carrito}
          setCarrito={setCarrito}
          onClose={() => setMostrarCarrito(false)}
        />
      )}
    </div>
  );
};

export default Menu;
