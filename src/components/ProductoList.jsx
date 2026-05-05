/**
 * ProductoList.jsx
 * Lista dinamica de productos agregados a la factura.
 * Recibe props: productos (array) y onEliminar (funcion).
 * Usa map() para renderizar cada producto.
 */

import { memo } from "react";
import PropTypes from "prop-types";

// Formatea numero como moneda colombiana
const formatCOP = (valor) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(valor);

// Item individual memoizado para evitar re-renders innecesarios
const ProductoItem = memo(function ProductoItem({ producto, onEliminar }) {
  return (
    <li className="producto-item" role="row">
      <div className="producto-info">
        <span className="producto-nombre">{producto.nombre}</span>
        {producto.descripcion && (
          <span className="producto-desc">{producto.descripcion}</span>
        )}
      </div>
      <div className="producto-meta">
        <span className="producto-cantidad">{producto.cantidad} und.</span>
        <span className="producto-precio">{formatCOP(producto.precio)}</span>
        <span className="producto-subtotal">{formatCOP(producto.cantidad * producto.precio)}</span>
        <button
          className="btn-eliminar"
          onClick={() => onEliminar(producto.id)}
          aria-label={`Eliminar ${producto.nombre}`}
          title="Eliminar producto"
        >
          &times;
        </button>
      </div>
    </li>
  );
});

ProductoItem.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    cantidad: PropTypes.number.isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
  onEliminar: PropTypes.func.isRequired,
};

function ProductoList({ productos, onEliminar }) {
  if (productos.length === 0) {
    return (
      <section className="card lista-card" aria-labelledby="lista-titulo">
        <h2 id="lista-titulo" className="card-titulo">Productos</h2>
        <p className="lista-vacia" role="status">
          No hay productos agregados aun.
        </p>
      </section>
    );
  }

  return (
    <section className="card lista-card" aria-labelledby="lista-titulo">
      <h2 id="lista-titulo" className="card-titulo">
        Productos <span className="badge-count">{productos.length}</span>
      </h2>

      <div className="lista-header" role="rowheader" aria-hidden="true">
        <span>Producto</span>
        <span>Cant.</span>
        <span>P. Unit.</span>
        <span>Subtotal</span>
        <span></span>
      </div>

      <ul className="producto-list" role="list" aria-label="Lista de productos">
        {productos.map((p) => (
          <ProductoItem key={p.id} producto={p} onEliminar={onEliminar} />
        ))}
      </ul>
    </section>
  );
}

ProductoList.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
      cantidad: PropTypes.number.isRequired,
      precio: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEliminar: PropTypes.func.isRequired,
};

export default ProductoList;
