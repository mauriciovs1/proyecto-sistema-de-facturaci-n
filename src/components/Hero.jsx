/**
 * Hero.jsx
 * Componente presentacional de bienvenida del sistema de facturación.
 * No maneja estado interno. Recibe onComenzar como prop para iniciar el flujo.
 */

import PropTypes from "prop-types";

function Hero({ onComenzar }) {
  return (
    <section className="hero" role="banner" aria-label="Bienvenida al sistema de facturación">
      <div className="hero-bg-shapes" aria-hidden="true">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Sistema de Facturación</p>
        <h1 className="hero-title">
          Facturas<span className="accent">Colombia</span>
        </h1>
        <p className="hero-descripcion">
          Genera facturas profesionales de manera rápida, organizada y segura.
          Ideal para pequeñas y medianas empresas colombianas.
        </p>
        <button
          className="btn-primary"
          onClick={onComenzar}
          aria-label="Comenzar a crear una nueva factura"
        >
          Crear Factura
          <span className="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

Hero.propTypes = {
  onComenzar: PropTypes.func.isRequired,
};

export default Hero;
