/**
 * FacturaForm.jsx
 * Formulario para capturar los datos del cliente en la factura.
 * Usa useState para manejar el estado del formulario.
 * Valida los campos antes de enviar.
 */

import { useState } from "react";
import PropTypes from "prop-types";

const camposIniciales = {
  nombre: "",
  nit: "",
  direccion: "",
  ciudad: "",
  telefono: "",
  correo: "",
};

function FacturaForm({ onGuardar }) {
  const [form, setForm] = useState(camposIniciales);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.nit.trim()) nuevosErrores.nit = "El NIT es obligatorio.";
    else if (!/^\d{6,15}(-\d)?$/.test(form.nit.trim()))
      nuevosErrores.nit = "Formato de NIT invalido (ej: 900123456-1).";
    if (!form.direccion.trim()) nuevosErrores.direccion = "La direccion es obligatoria.";
    if (!form.ciudad.trim()) nuevosErrores.ciudad = "La ciudad es obligatoria.";
    if (form.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      nuevosErrores.correo = "Correo electronico invalido.";
    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    onGuardar(form);
  };

  return (
    <section className="card form-card" aria-labelledby="form-titulo">
      <h2 id="form-titulo" className="card-titulo">Datos del Cliente</h2>
      <p className="card-subtitulo">Ingrese la informacion del cliente para generar la factura.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="campo">
            <label htmlFor="nombre" className="campo-label">Nombre / Razon Social <span>*</span></label>
            <input id="nombre" name="nombre" type="text"
              className={`campo-input ${errores.nombre ? "input-error" : ""}`}
              value={form.nombre} onChange={handleChange} placeholder="Empresa S.A.S." />
            {errores.nombre && <span className="error-msg" role="alert">{errores.nombre}</span>}
          </div>

          <div className="campo">
            <label htmlFor="nit" className="campo-label">NIT <span>*</span></label>
            <input id="nit" name="nit" type="text"
              className={`campo-input ${errores.nit ? "input-error" : ""}`}
              value={form.nit} onChange={handleChange} placeholder="900123456-1" />
            {errores.nit && <span className="error-msg" role="alert">{errores.nit}</span>}
          </div>

          <div className="campo campo-full">
            <label htmlFor="direccion" className="campo-label">Direccion <span>*</span></label>
            <input id="direccion" name="direccion" type="text"
              className={`campo-input ${errores.direccion ? "input-error" : ""}`}
              value={form.direccion} onChange={handleChange} placeholder="Calle 10 # 5-20" />
            {errores.direccion && <span className="error-msg" role="alert">{errores.direccion}</span>}
          </div>

          <div className="campo">
            <label htmlFor="ciudad" className="campo-label">Ciudad <span>*</span></label>
            <input id="ciudad" name="ciudad" type="text"
              className={`campo-input ${errores.ciudad ? "input-error" : ""}`}
              value={form.ciudad} onChange={handleChange} placeholder="Cali" />
            {errores.ciudad && <span className="error-msg" role="alert">{errores.ciudad}</span>}
          </div>

          <div className="campo">
            <label htmlFor="telefono" className="campo-label">Telefono</label>
            <input id="telefono" name="telefono" type="tel"
              className="campo-input" value={form.telefono} onChange={handleChange} placeholder="3001234567" />
          </div>

          <div className="campo campo-full">
            <label htmlFor="correo" className="campo-label">Correo Electronico</label>
            <input id="correo" name="correo" type="email"
              className={`campo-input ${errores.correo ? "input-error" : ""}`}
              value={form.correo} onChange={handleChange} placeholder="contacto@empresa.com" />
            {errores.correo && <span className="error-msg" role="alert">{errores.correo}</span>}
          </div>
        </div>

        <button type="submit" className="btn-primary btn-full">Continuar a Productos &rarr;</button>
      </form>
    </section>
  );
}

FacturaForm.propTypes = {
  onGuardar: PropTypes.func.isRequired,
};

export default FacturaForm;
