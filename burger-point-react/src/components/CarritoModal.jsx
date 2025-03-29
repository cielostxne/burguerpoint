import React from 'react';

const CarritoModal = ({ carrito, setCarrito, onClose }) => {
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const eliminarItem = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(carrito.map(item =>
      item.id === id
        ? { ...item, cantidad: nuevaCantidad, subtotal: item.precio * nuevaCantidad }
        : item
    ));
  };

  return (
    <div className="carrito-overlay">
      <div className="carrito-modal">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <h2>Tu Pedido</h2>

        <div className="carrito-items">
          {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            carrito.map(item => (
              <div key={item.id} className="carrito-item">
                <div className="item-info">
                  <h3>{item.nombre}</h3>
                  <div className="item-cantidad">
                    <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                  </div>
                  <p className="item-precio">
                    ${(item.precio * item.cantidad).toLocaleString()}
                  </p>
                </div>
                <button
                  className="eliminar-item"
                  onClick={() => eliminarItem(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="carrito-total">
            <h3>Total: ${total.toLocaleString()}</h3>
            <button className="btn-pagar">
              Proceder al pago
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;
