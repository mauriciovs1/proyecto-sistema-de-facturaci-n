/**
 * TotalFactura.jsx
 * Calcula y muestra el resumen financiero de la factura.
 * Recibe props: productos (array).
 * Calcula subtotal, IVA (19%) y total.
 */

import PropTypes from "prop-types";

const IVA_PORCENTAJE = 0.19;

const formatCOP = (valor) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(valor);

function TotalFactura({ productos }) {
  const subtotal = productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
  const iva = subtotal * IVA_PORCENTAJE;
  const total = subtotal + iva;

  return (
    <section className="card total-card" aria-labelledby="total-titulo">
      <h2 id="total-titulo" className="card-titulo">Resumen de Factura</h2>

      <dl className="total-desglose">
        <div className="total-fila">
          <dt>Subtotal</dt>
          <dd>{formatCOP(subtotal)}</dd>
        </div>
        <div className="total-fila">
          <dt>IVA (19%)</dt>
          <dd>{formatCOP(iva)}</dd>
        </div>
        <div className="total-fila total-fila--grande">
          <dt>Total a Pagar</dt>
          <dd className="total-valor">{formatCOP(total)}</dd>
        </div>
      </dl>

      {productos.length > 0 && (
        <button
          className="btn-primary btn-full btn-imprimir"
          onClick={() => window.print()}
          aria-label="Imprimir o guardar la factura"
        >
          Imprimir / Guardar Factura
        </button>
      )}
    </section>
  );
}

TotalFactura.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      cantidad: PropTypes.number.isRequired,
      precio: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TotalFactura;
