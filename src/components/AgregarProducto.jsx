/**
 * AgregarProducto.jsx
 * Formulario para agregar productos a la factura dinamicamente.
 * Maneja multiples estados locales con useState.
 * Valida precio y cantidad antes de agregar.
 */

import { useState } from "react";
import PropTypes from "prop-types";

const estadoInicial = {
  nombre: "",
  cantidad: "",
  precio: "",
  descripcion: "",
};

function AgregarProducto({ onAgregar }) {
  const [producto, setProducto] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [agregado, setAgregado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validar = () => {
    const e = {};
    if (!producto.nombre.trim()) e.nombre = "El nombre del producto es obligatorio.";
    const cant = Number(producto.cantidad);
    if (!producto.cantidad) e.cantidad = "Ingrese la cantidad.";
    else if (!Number.isInteger(cant) || cant <= 0) e.cantidad = "La cantidad debe ser un entero positivo.";
    const prec = parseFloat(producto.precio);
    if (!producto.precio) e.precio = "Ingrese el precio.";
    else if (isNaN(prec) || prec <= 0) e.precio = "El precio debe ser un numero positivo.";
    return e;
  };

  const handleAgregar = () => {
    const erroresVal = validar();
    if (Object.keys(erroresVal).length > 0) {
      setErrores(erroresVal);
      return;
    }
    onAgregar({
      nombre: producto.nombre.trim(),
      descripcion: producto.descripcion.trim(),
      cantidad: parseInt(producto.cantidad, 10),
      precio: parseFloat(producto.precio),
    });
    setProducto(estadoInicial);
    setErrores({});
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <section className="card" aria-labelledby="agregar-titulo">
      <h2 id="agregar-titulo" className="card-titulo">Agregar Producto</h2>
      <p className="card-subtitulo">Complete los campos y presione Agregar.</p>

      <div className="form-stack">
        <div className="campo">
          <label htmlFor="prod-nombre" className="campo-label">Producto <span>*</span></label>
          <input id="prod-nombre" name="nombre" type="text"
            className={`campo-input ${errores.nombre ? "input-error" : ""}`}
            value={producto.nombre} onChange={handleChange} placeholder="Nombre del producto" />
          {errores.nombre && <span className="error-msg" role="alert">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label htmlFor="prod-descripcion" className="campo-label">Descripcion</label>
          <input id="prod-descripcion" name="descripcion" type="text"
            className="campo-input" value={producto.descripcion} onChange={handleChange}
            placeholder="Descripcion opcional" />
        </div>

        <div className="form-grid-2">
          <div className="campo">
            <label htmlFor="prod-cantidad" className="campo-label">Cantidad <span>*</span></label>
            <input id="prod-cantidad" name="cantidad" type="number" min="1"
              className={`campo-input ${errores.cantidad ? "input-error" : ""}`}
              value={producto.cantidad} onChange={handleChange} placeholder="1" />
            {errores.cantidad && <span className="error-msg" role="alert">{errores.cantidad}</span>}
          </div>

          <div className="campo">
            <label htmlFor="prod-precio" className="campo-label">Precio Unitario <span>*</span></label>
            <input id="prod-precio" name="precio" type="number" min="0" step="0.01"
              className={`campo-input ${errores.precio ? "input-error" : ""}`}
              value={producto.precio} onChange={handleChange} placeholder="0.00" />
            {errores.precio && <span className="error-msg" role="alert">{errores.precio}</span>}
          </div>
        </div>

        <button className={`btn-primary btn-full ${agregado ? "btn-success" : ""}`} onClick={handleAgregar}>
          {agregado ? "Producto agregado!" : "+ Agregar Producto"}
        </button>
      </div>
    </section>
  );
}

AgregarProducto.propTypes = {
  onAgregar: PropTypes.func.isRequired,
};

export default AgregarProducto;
