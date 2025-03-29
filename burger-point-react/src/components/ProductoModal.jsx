import React, { useState } from 'react';

const ProductoModal = ({ producto, onClose, onAgregarCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  const handleAdd = () => {
    setCantidad(prev => prev + 1);
  };

  const handleSubtract = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  const handleAgregarCarrito = () => {
    onAgregarCarrito(producto, cantidad);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-grid">
          <div className="modal-imagen">
            {/* Reemplazar con imagen real */}
            <div className="imagen-placeholder"></div>
          </div>

          <div className="modal-detalles">
            <h2>{producto.nombre}</h2>
            <p className="modal-descripcion">{producto.descripcion}</p>

            <div className="ingredientes">
              <h3>Ingredientes:</h3>
              <ul>
                {producto.ingredientes.map((ingrediente, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i> {ingrediente}
                  </li>
                ))}
              </ul>
            </div>

            <div className="precio-cantidad">
              <p className="modal-precio">${producto.precio.toLocaleString()}</p>
              <div className="cantidad-control">
                <button onClick={handleSubtract}>-</button>
                <span>{cantidad}</span>
                <button onClick={handleAdd}>+</button>
              </div>
            </div>

            <button className="agregar-carrito" onClick={handleAgregarCarrito}>
              <i className="fas fa-shopping-cart"></i>
              Agregar al carrito - ${(producto.precio * cantidad).toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoModal;
