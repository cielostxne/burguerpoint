import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminPanel = () => {
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [pedidosEnProceso, setPedidosEnProceso] = useState([]);
  const [pedidosTerminados, setPedidosTerminados] = useState([]);

  useEffect(() => {
    const qPendientes = query(
      collection(db, 'pedidos'),
      where('estado', '==', 'pendiente')
    );

    const unsubscribe = onSnapshot(qPendientes, (snapshot) => {
      const pedidos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: new Date(doc.data().fecha).toLocaleString()
      })).sort((a, b) => b.fecha - a.fecha);
      setPedidosPendientes(pedidos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const qProceso = query(
      collection(db, 'pedidos'),
      where('estado', '==', 'preparando')
    );

    const unsubscribe = onSnapshot(qProceso, (snapshot) => {
      const pedidos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: new Date(doc.data().fecha).toLocaleString()
      })).sort((a, b) => b.fecha - a.fecha);
      setPedidosEnProceso(pedidos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const qTerminados = query(
      collection(db, 'pedidos'),
      where('estado', '==', 'entregado')
    );

    const unsubscribe = onSnapshot(qTerminados, (snapshot) => {
      const pedidos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: new Date(doc.data().fecha).toLocaleString()
      })).sort((a, b) => b.fecha - a.fecha);
      setPedidosTerminados(pedidos);
    });

    return () => unsubscribe();
  }, []);

  const handleProcesar = async (id) => {
    try {
      console.log('Procesando pedido:', id);
      const pedidoRef = doc(db, 'pedidos', id);
      await updateDoc(pedidoRef, {
        estado: 'preparando',
        fechaActualizacion: new Date().toISOString()
      });
      console.log('Pedido actualizado a preparando');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
    }
  };

  const handleTerminar = async (id) => {
    try {
      console.log('Terminando pedido:', id);
      const pedidoRef = doc(db, 'pedidos', id);
      await updateDoc(pedidoRef, {
        estado: 'entregado',
        fechaActualizacion: new Date().toISOString()
      });
      console.log('Pedido actualizado a entregado');
    } catch (error) {
      console.error('Error al terminar el pedido:', error);
    }
  };

  const handleLimpiar = async (id) => {
    try {
      const pedidoRef = doc(db, 'pedidos', id);
      await deleteDoc(pedidoRef);
      console.log('Pedido eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
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
              <h3>Pedidos Pendientes</h3>
              {pedidosPendientes.map(pedido => (
                <div key={pedido.id} className="pedido-card pedido-pendiente">
                  <div className="pedido-tiempo">
                    <i className="fas fa-clock"></i> {pedido.fechaCreacion}
                  </div>
                  <div className="pedido-info">
                    <h4>{pedido.nombre}</h4>
                    {pedido.items && pedido.items.map((item, index) => (
                      <div key={index} className="pedido-item">
                        {item.cantidad}x {item.nombre} - ${item.subtotal}
                      </div>
                    ))}
                    <p className="pedido-precio">Total: ${pedido.total}</p>
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
              <h3>En Preparación</h3>
              {pedidosEnProceso.map(pedido => (
                <div key={pedido.id} className="pedido-card pedido-proceso">
                  <div className="pedido-tiempo">
                    <i className="fas fa-clock"></i> {pedido.fechaCreacion}
                  </div>
                  <div className="pedido-info">
                    <h4>{pedido.nombre}</h4>
                    {pedido.items && pedido.items.map((item, index) => (
                      <div key={index} className="pedido-item">
                        {item.cantidad}x {item.nombre} - ${item.subtotal}
                      </div>
                    ))}
                    <p className="pedido-precio">Total: ${pedido.total}</p>
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
              <h3>Entregados</h3>
              {pedidosTerminados.map(pedido => (
                <div key={pedido.id} className="pedido-card pedido-terminado">
                  <div className="pedido-tiempo">
                    <i className="fas fa-clock"></i> {pedido.fechaCreacion}
                  </div>
                  <div className="pedido-info">
                    <h4>{pedido.nombre}</h4>
                    {pedido.items && pedido.items.map((item, index) => (
                      <div key={index} className="pedido-item">
                        {item.cantidad}x {item.nombre} - ${item.subtotal}
                      </div>
                    ))}
                    <p className="pedido-precio">Total: ${pedido.total}</p>
                  </div>
                  <button
                    onClick={() => handleLimpiar(pedido.id)}
                    className="btn-limpiar"
                  >
                    <i className="fas fa-trash"></i> Limpiar pedido
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
