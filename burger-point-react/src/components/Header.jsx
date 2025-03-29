import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Burgerpointlogo.png';

const Header = ({ onCartClick, cartItemCount }) => {
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
