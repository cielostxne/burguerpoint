import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [pedidos] = useState([
    { id: 1, estado: 'pedida', producto: 'Hamburguesa Clásica', cliente: 'Juan' },
    { id: 2, estado: 'proceso', producto: 'Hamburguesa BBQ', cliente: 'María' }
  ]);

  const [inventario] = useState([
    { id: 1, item: 'Pan', cantidad: 50, unidad: 'unidades' },
    { id: 2, item: 'Carne', cantidad: 30, unidad: 'kg' }
  ]);

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
                <div key={pedido.id} className="pedido-card">
                  <p><strong>{pedido.producto}</strong></p>
                  <p>Cliente: {pedido.cliente}</p>
                </div>
              ))}
            </div>
            <div className="pedidos-columna">
              <h3>En Proceso</h3>
              {pedidos.filter(p => p.estado === 'proceso').map(pedido => (
                <div key={pedido.id} className="pedido-card">
                  <p><strong>{pedido.producto}</strong></p>
                  <p>Cliente: {pedido.cliente}</p>
                </div>
              ))}
            </div>
            <div className="pedidos-columna">
              <h3>Terminadas</h3>
              {pedidos.filter(p => p.estado === 'terminada').map(pedido => (
                <div key={pedido.id} className="pedido-card">
                  <p><strong>{pedido.producto}</strong></p>
                  <p>Cliente: {pedido.cliente}</p>
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
