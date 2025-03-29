import React, { useState } from 'react';
import ProductoModal from './ProductoModal';
import CarritoModal from './CarritoModal';

const Menu = ({ carrito, setCarrito, mostrarCarrito, setMostrarCarrito }) => {
  const [modalProducto, setModalProducto] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: 'Hamburguesa Clásica',
      precio: 5990,
      descripcion: 'Jugosa hamburguesa de carne con queso cheddar, lechuga, tomate, cebolla caramelizada y nuestra salsa especial',
      ingredientes: ['Pan brioche', 'Carne 180g', 'Queso cheddar', 'Lechuga', 'Tomate', 'Cebolla caramelizada', 'Salsa especial']
    },
    {
      id: 2,
      nombre: 'Hamburguesa BBQ',
      precio: 6990,
      descripcion: 'Deliciosa hamburguesa con salsa BBQ casera, aros de cebolla crujientes, tocino y queso cheddar',
      ingredientes: ['Pan brioche', 'Carne 180g', 'Queso cheddar', 'Tocino', 'Aros de cebolla', 'Salsa BBQ casera']
    },
    {
      id: 3,
      nombre: 'Hamburguesa Mexicana',
      precio: 6990,
      descripcion: 'Hamburguesa picante con guacamole, jalapeños, queso pepper jack y pico de gallo',
      ingredientes: ['Pan brioche', 'Carne 180g', 'Queso pepper jack', 'Guacamole', 'Jalapeños', 'Pico de gallo']
    },
    {
      id: 4,
      nombre: 'Hamburguesa Blue Cheese',
      precio: 7490,
      descripcion: 'Hamburguesa gourmet con queso azul, champiñones salteados y cebolla caramelizada',
      ingredientes: ['Pan brioche', 'Carne 180g', 'Queso azul', 'Champiñones salteados', 'Cebolla caramelizada', 'Rúcula']
    }
  ];

  const agregarAlCarrito = (producto, cantidad) => {
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      setCarrito([...carrito, {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        subtotal: producto.precio * cantidad
      }]);
    }
  };

  return (
    <div className="menu-container">
      <div className="menu">
        {productos.map(producto => (
          <div
            key={producto.id}
            className="producto"
            onClick={() => setModalProducto(producto)}
          >
            <div className="producto-info">
              <h2>{producto.nombre}</h2>
              <p className="precio">${producto.precio.toLocaleString()}</p>
              <button className="ver-detalles">Ver detalles</button>
            </div>
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
