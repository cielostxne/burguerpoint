import React, { useState } from 'react';

const AdminPanel = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      estado: 'pedida',
      producto: 'Burger Point Nortina Simple',
      cliente: 'Juan',
      detalles: {
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
        papas: true
      },
      precio: 7500,
      fechaCreacion: new Date().toLocaleString()
    }
  ]);

  const [inventario, setInventario] = useState([
    { id: 1, item: 'Pan brioche', cantidad: 100, unidad: 'unidades' },
    { id: 2, item: 'Carne smash 135g', cantidad: 150, unidad: 'unidades' },
    { id: 3, item: 'Queso cheddar', cantidad: 100, unidad: 'láminas' },
    { id: 4, item: 'Queso mantecoso', cantidad: 100, unidad: 'láminas' },
    { id: 5, item: 'Tomate', cantidad: 50, unidad: 'unidades' },
    { id: 6, item: 'Lechuga hidropónica', cantidad: 40, unidad: 'unidades' },
    { id: 7, item: 'Pepinillos', cantidad: 200, unidad: 'unidades' },
    { id: 8, item: 'Cebolla', cantidad: 30, unidad: 'unidades' },
    { id: 9, item: 'Cebolla crispy', cantidad: 50, unidad: 'porciones' },
    { id: 10, item: 'Tocino', cantidad: 100, unidad: 'láminas' },
    { id: 11, item: 'Huevo', cantidad: 90, unidad: 'unidades' },
    { id: 12, item: 'Lactonesa', cantidad: 5, unidad: 'litros' },
    { id: 13, item: 'Lactonesa de ajo', cantidad: 5, unidad: 'litros' },
    { id: 14, item: 'Lactonesa de aceituna', cantidad: 5, unidad: 'litros' },
    { id: 15, item: 'Papas fritas', cantidad: 50, unidad: 'porciones' }
  ]);

  const [detallesAbiertos, setDetallesAbiertos] = useState({});

  const cantidadesPorIngrediente = {
    'Pan brioche': 1,
    'Carne smash 135g': 1,
    'Queso cheddar': 1,
    'Queso mantecoso': 1,
    'Tomate': 2,
    'Lechuga hidropónica': 1,
    'Pepinillos': 4,
    'Cebolla': 0.25,
    'Cebolla crispy': 1,
    'Tocino': 2,
    'Huevo': 1,
    'Lactonesa': 0.05,
    'Lactonesa de ajo': 0.05,
    'Lactonesa de aceituna': 0.05,
    'Papas fritas': 1
  };

  const hamburguesas = {
    'Burger Point Nortina': {
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
      precioSimple: 7500,
      precioDoble: 9500
    },
    'Burger Point Suprema': {
      ingredientes: [
        'Pan brioche',
        'Carne smash 135g',
        'Queso mantecoso',
        'Cebolla',
        'Tocino',
        'Huevo',
        'Lactonesa'
      ],
      precioSimple: 8000,
      precioDoble: 10000
    },
    'Burger Point Clásica': {
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
      precioSimple: 7500,
      precioDoble: 9500
    },
    'Burger Point Bacon': {
      ingredientes: [
        'Pan brioche',
        'Carne smash 135g',
        'Queso mantecoso',
        'Cebolla crispy',
        'Tocino',
        'Huevo',
        'Lactonesa'
      ],
      precioSimple: 7000,
      precioDoble: 9000
    }
  };

  const toggleDetalles = (id) => {
    setDetallesAbiertos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const verificarInventario = (ingredientes) => {
    return ingredientes.every(ingrediente => {
      const item = inventario.find(i => i.item === ingrediente);
      if (!item) return false;
      const cantidadNecesaria = cantidadesPorIngrediente[ingrediente] || 1;
      return item.cantidad >= cantidadNecesaria;
    });
  };

  const actualizarInventario = (ingredientes) => {
    setInventario(prevInventario => {
      return prevInventario.map(item => {
        if (ingredientes.includes(item.item)) {
          const cantidadARestar = cantidadesPorIngrediente[item.item] || 1;
          return {
            ...item,
            cantidad: item.cantidad - cantidadARestar
          };
        }
        return item;
      });
    });
  };

  const handleProcesar = (id) => {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    const todosLosIngredientes = [...pedido.detalles.ingredientes];
    if (pedido.detalles.papas) {
      todosLosIngredientes.push('Papas fritas');
    }

    const hayInventarioSuficiente = verificarInventario(todosLosIngredientes);

    if (!hayInventarioSuficiente) {
      alert('No hay suficiente inventario para preparar este pedido');
      return;
    }

    actualizarInventario(todosLosIngredientes);
    setPedidos(pedidos.map(p =>
      p.id === id ? { ...p, estado: 'proceso' } : p
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
                    <p className="pedido-precio">${pedido.precio}</p>
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
                        {pedido.detalles.papas && (
                          <p className="papas-info">Incluye papas fritas</p>
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
                    <p className="pedido-precio">${pedido.precio}</p>
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
                        {pedido.detalles.papas && (
                          <p className="papas-info">Incluye papas fritas</p>
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
                    <p className="pedido-precio">${pedido.precio}</p>
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
