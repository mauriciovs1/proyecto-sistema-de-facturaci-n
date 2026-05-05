import { useState } from "react";
import Hero from "./components/Hero";
import FacturaForm from "./components/FacturaForm";
import AgregarProducto from "./components/AgregarProducto";
import ProductoList from "./components/ProductoList";
import TotalFactura from "./components/TotalFactura";
import "./styles/App.css";

function App() {
  const [cliente, setCliente] = useState(null);
  const [productos, setProductos] = useState([]);
  const [paso, setPaso] = useState(1);

  const handleClienteGuardado = (datosCliente) => {
    setCliente(datosCliente);
    setPaso(3);
  };

  const handleAgregarProducto = (producto) => {
    setProductos((prev) => [...prev, { ...producto, id: Date.now() }]);
  };

  const handleEliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleNuevaFactura = () => {
    setCliente(null);
    setProductos([]);
    setPaso(1);
  };

  return (
    <div className="app">
      {paso === 1 && <Hero onComenzar={() => setPaso(2)} />}

      {paso === 2 && (
        <div className="container">
          <FacturaForm onGuardar={handleClienteGuardado} />
        </div>
      )}

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
