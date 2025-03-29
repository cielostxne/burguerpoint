import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Description from './components/Description';
import Menu from './components/Menu';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <BrowserRouter>
      <Header
        onCartClick={() => setMostrarCarrito(true)}
        cartItemCount={cantidadTotal}
        isAuthenticated={isAuthenticated}
      />
      <Routes>
        <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/login" element={
          !isAuthenticated ?
            <Login onLogin={() => setIsAuthenticated(true)} /> :
            <Navigate to="/admin" />
        } />
        <Route
          path="/"
          element={
            <>
              <Description />
              <Menu
                carrito={carrito}
                setCarrito={setCarrito}
                mostrarCarrito={mostrarCarrito}
                setMostrarCarrito={setMostrarCarrito}
              />
              <section className="pedido">
                <a href="https://wa.me/56942054670" target="_blank" rel="noopener noreferrer">
                  PIDE AHORA por WhatsApp
                </a>
              </section>
              <div className="instagram">
                <a href="https://instagram.com/hamburgueseriabp" target="_blank" rel="noopener noreferrer" className="boton-instagram">
                  📸 Síguenos en Instagram: @hamburgueseriabp
                </a>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
