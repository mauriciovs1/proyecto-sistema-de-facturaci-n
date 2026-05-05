// Componente principal de la aplicación de facturación, controla el flujo entre pantallas

import { useState } from "react";
import Hero from "./components/Hero";
import FacturaForm from "./components/FacturaForm";
import AgregarProducto from "./components/AgregarProducto";
import ProductoList from "./components/ProductoList";
import TotalFactura from "./components/TotalFactura";
import "./styles/App.css";

function App() {
  // Estado que almacena la información del cliente
  const [cliente, setCliente] = useState(null);

  // Estado que guarda la lista de productos agregados a la factura
  const [productos, setProductos] = useState([]);

  // Estado que controla el paso o vista actual de la aplicación
  const [paso, setPaso] = useState(1);

  // Función que guarda los datos del cliente y avanza al siguiente paso
  const handleClienteGuardado = (datosCliente) => {
    setCliente(datosCliente);
    setPaso(3);
  };

  // Función para agregar un producto a la lista de la factura
  const handleAgregarProducto = (producto) => {
    setProductos((prev) => [...prev, { ...producto, id: Date.now() }]);
  };

  // Función para eliminar un producto de la factura
  const handleEliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // Reinicia toda la información para crear una nueva factura
  const handleNuevaFactura = () => {
    setCliente(null);
    setProductos([]);
    setPaso(1);
  };

  return (
    <div className="app">
      {/* Pantalla inicial de bienvenida */}
      {paso === 1 && <Hero onComenzar={() => setPaso(2)} />}

      {/* Formulario para ingresar los datos del cliente */}
      {paso === 2 && (
        <div className="container">
          <FacturaForm onGuardar={handleClienteGuardado} />
        </div>
      )}

      {/* Vista principal donde se gestionan productos y total de la factura */}
      {paso === 3 && (
        <div className="container">
          <div className="cliente-badge">
            <span className="badge-label">Cliente</span>
            <span className="badge-nombre">{cliente?.nombre}</span>
            <span className="badge-nit">NIT: {cliente?.nit}</span>
            <button className="btn-reset" onClick={handleNuevaFactura}>
              Nueva Factura
            </button>
          </div>

          <div className="factura-grid">
            <div className="col-izquierda">
              <AgregarProducto onAgregar={handleAgregarProducto} />
            </div>
            <div className="col-derecha">
              <ProductoList
                productos={productos}
                onEliminar={handleEliminarProducto}
              />
              <TotalFactura productos={productos} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;