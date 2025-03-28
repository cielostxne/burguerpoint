// src/App.jsx
import React from 'react';
import './App.css'; // Aquí puedes colocar los estilos, ya sea moviéndolos desde el <style> en tu HTML

function App() {
  return (
    <>
      <header>
        <div className="encabezado">
          <img src="/Burgerpointlogo.png" alt="Logo Burger Point" />
          <div className="titulo-header">
            <h1>
              <span className="yellow">Hamburguesería</span><br />
              <span className="yellow">BURGER</span>
              <span className="red">P</span>
              <i className="fas fa-map-marker-alt map-icon"></i>
              <span className="red">INT</span>
            </h1>
          </div>
        </div>
      </header>

      <section className="descripcion">
        <p className="frase-destacada">🍔 4 TIPOS DE HAMBURGUESAS 🍔</p>
        <p>Smash 135 gr. en pan brioche, con papas fritas naturales.</p>
      </section>

      <section className="menu">
        <div className="producto">
          <h2>Clásica</h2>
          <p>
            Carne 100% vacuno, queso cheddar, tomate, lechuga hidropónica, pepinillos, lactonesa ajo, salsa de la casa.
          </p>
          <p className="precio">Simple $7.500 | Doble $9.500</p>
        </div>
        <div className="producto">
          <h2>Bacon</h2>
          <p>
            Carne 100% vacuno, cheddar, cebolla crispy, tocino, salsa BBQ, lactonesa ajo.
          </p>
          <p className="precio">Simple $7.000 | Doble $9.000</p>
        </div>
        <div className="producto">
          <h2>Nortina</h2>
          <p>
            Carne 100% vacuno, cheddar, tomate, lechuga hidropónica, papas hilo, lactonesa de aceituna.
          </p>
          <p className="precio">Simple $7.500 | Doble $9.500</p>
        </div>
        <div className="producto">
          <h2>Suprema</h2>
          <p>
            Carne 100% vacuno, queso mantecoso, cebolla caramelizada, tocino, huevo, lactonesa ajo.
          </p>
          <p className="precio">Simple $8.000 | Doble $10.000</p>
        </div>
      </section>

      <section className="pedido">
        <a href="https://wa.me/56942054670" target="_blank" rel="noopener noreferrer">
          PIDE AHORA por WhatsApp
        </a>
      </section>

      <div className="instagram">
        <a
          href="https://instagram.com/hamburgueseriabp"
          target="_blank"
          rel="noopener noreferrer"
          className="boton-instagram"
        >
          📸 Síguenos en Instagram: @hamburgueseriabp
        </a>
      </div>
    </>
  );
}

export default App;
