import React, { useState } from 'react';

const AdminPanel = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 4,
      estado: 'pedida',
      producto: 'Hamburguesa Clásica',
      cliente: 'Juan',
      detalles: {
        ingredientes: ['Pan brioche', 'Carne 180g', 'Lechuga', 'Tomate', 'Cebolla'],
        extras: ['Queso cheddar', 'Tocino'],
      },
      fechaCreacion: new Date().toLocaleString()
    },
    {
      id: 3,
      estado: 'pedida',
      producto: 'Hamburguesa Clásica',
      cliente: 'Juan',
      detalles: {
        ingredientes: ['Pan brioche', 'Carne 180g', 'Lechuga', 'Tomate', 'Cebolla'],
        extras: ['Queso cheddar', 'Tocino'],
      },
      fechaCreacion: new Date().toLocaleString()
    },
    {
      id: 2,
      estado: 'proceso',
      producto: 'Hamburguesa BBQ',
      cliente: 'María',
      detalles: {
        ingredientes: ['Pan artesanal', 'Carne 180g', 'Salsa BBQ'],
        extras: ['Aros de cebolla'],
      },
      fechaCreacion: new Date().toLocaleString()
    }
  ]);

  const [inventario] = useState([
    { id: 1, item: 'Pan', cantidad: 50, unidad: 'unidades' },
    { id: 2, item: 'Carne', cantidad: 30, unidad: 'kg' }
  ]);

  const [detallesAbiertos, setDetallesAbiertos] = useState({});

  const toggleDetalles = (id) => {
    setDetallesAbiertos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleProcesar = (id) => {
    setPedidos(pedidos.map(pedido =>
      pedido.id === id ? { ...pedido, estado: 'proceso' } : pedido
    ));
  };

  const handleTerminar = (id) => {
    setPedidos(pedidos.map(pedido =>
      pedido.id === id ? { ...pedido, estado: 'terminada' } : pedido
    ));
  };

  const handleLimpiar = (id) => {
    setPedidos(pedidos.filter(pedido => pedido.id !== id));
  };

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <h1>Panel de Administración</h1>
      </nav>

      <div className="admin-grid">
        <section className="admin-section pedidos-section">
          <h2>Pedidos</h2>
          <div className="pedidos-grid">
            <div className="pedidos-columna">
              <h3>Pedidas</h3>
              {pedidos.filter(p => p.estado === 'pedida').map(pedido => (
                <div key={pedido.id} className="pedido-card pedido-pendiente">
                  <div className="pedido-tiempo">
                    <i className="fas fa-clock"></i>
                    {pedido.fechaCreacion}
                  </div>
                  <div className="pedido-info">
                    <h4>{pedido.producto}</h4>
                    <p className="cliente-nombre">
                      <i className="fas fa-user"></i> {pedido.cliente}
                    </p>
                    <div
                      className="detalles-header"
                      onClick={() => toggleDetalles(pedido.id)}
                    >
                      <span>Ver detalles del pedido</span>
                      <i className={`fas fa-chevron-${detallesAbiertos[pedido.id] ? 'up' : 'down'}`}></i>
                    </div>
                    {detallesAbiertos[pedido.id] && (
                      <div className="detalles-pedido">
                        <p className="ingredientes-titulo">Ingredientes:</p>
                        <ul className="ingredientes-lista">
                          {pedido.detalles.ingredientes.map((ing, index) => (
                            <li key={index}>{ing}</li>
                          ))}
                        </ul>
                        {pedido.detalles.extras.length > 0 && (
                          <>
                            <p className="extras-titulo">Extras:</p>
                            <ul className="extras-lista">
                              {pedido.detalles.extras.map((extra, index) => (
                                <li key={index}>{extra}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleProcesar(pedido.id)}
                    className="btn-procesar"
                  >
                    <i className="fas fa-utensils"></i> Comenzar a preparar
                  </button>
                </div>
              ))}
            </div>
            <div className="pedidos-columna">
              <h3>En Proceso</h3>
              {pedidos.filter(p => p.estado === 'proceso').map(pedido => (
                <div key={pedido.id} className="pedido-card pedido-proceso">
                  <div className="pedido-header">
                    <span className="estado-proceso">En preparación</span>
                  </div>
                  <div className="pedido-content">
                    <p><strong>{pedido.producto}</strong></p>
                    <p>Cliente: {pedido.cliente}</p>
                    <div
                      className="detalles-header"
                      onClick={() => toggleDetalles(pedido.id)}
                    >
                      <span>Ver detalles del pedido</span>
                      <i className={`fas fa-chevron-${detallesAbiertos[pedido.id] ? 'up' : 'down'}`}></i>
                    </div>
                    {detallesAbiertos[pedido.id] && (
                      <div className="detalles-pedido">
                        <p className="ingredientes-titulo">Ingredientes:</p>
                        <ul className="ingredientes-lista">
                          {pedido.detalles.ingredientes.map((ing, index) => (
                            <li key={index}>{ing}</li>
                          ))}
                        </ul>
                        {pedido.detalles.extras.length > 0 && (
                          <>
                            <p className="extras-titulo">Extras:</p>
                            <ul className="extras-lista">
                              {pedido.detalles.extras.map((extra, index) => (
                                <li key={index}>{extra}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleTerminar(pedido.id)}
                    className="btn-terminar"
                  >
                    <i className="fas fa-check"></i> Terminar preparación
                  </button>
                </div>
              ))}
            </div>
            <div className="pedidos-columna">
              <h3>Terminadas</h3>
              {pedidos.filter(p => p.estado === 'terminada').map(pedido => (
                <div key={pedido.id} className="pedido-card">
                  <div className="pedido-content">
                    <p><strong>{pedido.producto}</strong></p>
                    <p>Cliente: {pedido.cliente}</p>
                    <button
                      onClick={() => handleLimpiar(pedido.id)}
                      className="btn-limpiar"
                    >
                      <i className="fas fa-trash"></i> Limpiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="admin-section inventario-section">
          <h2>Inventario</h2>
          <div className="table-container">
            <table>
              <thead>
              <tr>
                <th>Item</th>
                <th>Cantidad</th>
                <th>Unidad</th>
              </tr>
              </thead>
              <tbody>
              {inventario.map(item => (
                <tr key={item.id}>
                  <td>{item.item}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.unidad}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
