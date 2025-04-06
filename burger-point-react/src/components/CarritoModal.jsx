import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const CarritoModal = ({ carrito, setCarrito, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    try {
      const pedido = {
        nombre,
        descripcion,
        items: carrito.map(item => ({
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
          subtotal: item.precio * item.cantidad
        })),
        total,
        estado: 'pendiente',
        fecha: new Date().toISOString(),
        timestamp: Date.now()
      };

      await addDoc(collection(db, 'pedidos'), pedido);
      alert('¡Pedido realizado con éxito!');
      setCarrito([]);
      onClose();
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      alert('Hubo un error al procesar el pedido');
    }
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
          <form onSubmit={handleSubmit}>
            <div className="carrito-formulario">
              <label htmlFor="nombreCliente" className="label-nombre">
                Nombre para el pedido:
              </label>
              <input
                type="text"
                id="nombreCliente"
                className="campo-nombre"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <label htmlFor="descripcion" className="label-nombre" style={{ marginTop: '15px' }}>
                Descripción o notas adicionales:
              </label>
              <textarea
                id="descripcion"
                className="campo-nombre"
                placeholder="Ej: Sin cebolla, extra salsa, etc..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="3"
              />
            </div>

            <div className="carrito-total">
              <h3>Total: ${total.toLocaleString()}</h3>
              <button type="submit" className="btn-pagar">
                Proceder al pago
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;
