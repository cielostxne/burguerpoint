import React, { useState } from 'react';

const ProductoModal = ({ producto, onClose, onAgregarCarrito }) => {
  const [cantidad, setCantidad] = useState(1);
  const [esDoble, setEsDoble] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregarCarrito(producto, cantidad, esDoble);
    onClose();
  };

  const precio = esDoble ? producto.precioDoble : producto.precioSimple;

  return (
    <div className="modal-overlay">
      <div className="modal-content producto-detalle">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-grid">
          <div className="modal-imagen">
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-imagen"
              />
            ) : (
              <div className="imagen-placeholder">
                <i className="fas fa-burger"></i>
              </div>
            )}
          </div>

          <div className="modal-detalles">
            <div className="modal-contenido">
              <h2 className="modal-titulo">{producto.nombre}</h2>
              <p className="modal-descripcion">{producto.descripcion}</p>

              <div className="tipo-hamburguesa">
                <label className={!esDoble ? 'tipo-seleccionado' : ''}>
                  <input
                    type="radio"
                    name="tipo"
                    checked={!esDoble}
                    onChange={() => setEsDoble(false)}
                  />
                  <span className="tipo-texto">Simple</span>
                  <span className="tipo-precio">${producto.precioSimple.toLocaleString()}</span>
                </label>

                <label className={esDoble ? 'tipo-seleccionado' : ''}>
                  <input
                    type="radio"
                    name="tipo"
                    checked={esDoble}
                    onChange={() => setEsDoble(true)}
                  />
                  <span className="tipo-texto">Doble</span>
                  <span className="tipo-precio">${producto.precioDoble.toLocaleString()}</span>
                </label>
              </div>

              <div className="ingredientes-seccion">
                <h3>Ingredientes</h3>
                <div className="ingredientes-lista">
                  {producto.ingredientes.map((ingrediente, index) => (
                    <span key={index} className="ingrediente-tag">
                      {ingrediente}
                    </span>
                  ))}
                </div>
              </div>

              <p className="incluye-nota">{producto.incluye}</p>

              <div className="cantidad-selector">
                <label>Cantidad:</label>
                <div className="cantidad-controles">
                  <button
                    type="button"
                    className="cantidad-btn"
                    onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  >
                    -
                  </button>
                  <span className="cantidad-valor">{cantidad}</span>
                  <button
                    type="button"
                    className="cantidad-btn"
                    onClick={() => cantidad < 5 && setCantidad(cantidad + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-acciones">
              <div className="total-seccion">
                <span className="total-label">Total:</span>
                <span className="total-valor">${(precio * cantidad).toLocaleString()}</span>
              </div>
              <button className="agregar-btn" onClick={handleSubmit}>
                Agregar al carrito
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoModal;
