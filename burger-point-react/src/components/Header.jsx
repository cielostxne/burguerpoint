import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Burgerpointlogo.png';

const Header = ({ onCartClick, cartItemCount, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPanel = location.pathname === '/admin';
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmLogout = () => {
    // Limpiamos toda la información de sesión
    localStorage.clear();
    sessionStorage.clear();

    // Actualizamos el estado de autenticación
    onLogout();

    // Cerramos el modal
    setShowConfirmDialog(false);

    // Redirigimos al menú principal
    window.location.replace('/');
  };

  const handleCancelLogout = () => {
    setShowConfirmDialog(false);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="encabezado">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>

          <div className="titulo-header">
            <h1>
              <span className="yellow">BURGER</span>
              <span className="red">POINT</span>
            </h1>
            <p>
              <i className="fas fa-map-marker-alt map-icon"></i>
              San Pedro de la Paz
            </p>
          </div>

          <div className="nav-buttons">
            {!isAdminPanel && (
              <>
                <Link to="/admin" className="admin-button">
                  <i className="fas fa-user-shield"></i>
                  Admin
                </Link>

                <div className="carrito-icon" onClick={onCartClick}>
                  <i className="fas fa-shopping-cart"></i>
                  {cartItemCount > 0 && (
                    <span className="carrito-contador">{cartItemCount}</span>
                  )}
                </div>
              </>
            )}

            {isAuthenticated && isAdminPanel && (
              <button onClick={handleLogoutClick} className="logout-button">
                <i className="fas fa-sign-out-alt"></i>
                Salir
              </button>
            )}
          </div>
        </div>
      </nav>

      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <h3>¿Estás seguro que deseas salir?</h3>
            <div className="confirm-buttons">
              <button onClick={handleConfirmLogout} className="confirm-yes">Sí</button>
              <button onClick={handleCancelLogout} className="confirm-no">No</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
