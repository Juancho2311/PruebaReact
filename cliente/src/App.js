import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Clientes } from "./Pages/Clientes";
import { Tramos } from "./Pages/Tramos";
import { TramosCliente } from "./Pages/TramosCliente";

function App() {
  return (
    <div>
      <Router>
        {/* Botones de paginas */}
        <div className="header">
          <h1>Prueba de React</h1>
          <div className="nav">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/Clientes">
              <button>cliente</button>
            </Link>
            <Link to="/Tramos">
              <button>tramos</button>
            </Link>
            <Link to="/TramosCliente">
              <button>tramoscliente</button>
            </Link>
          </div>
        </div>
        <div className="container-pages">
          <Routes>
            <Route path="/Clientes" element={<Clientes />} />
            <Route path="/Tramos" element={<Tramos />} />
            <Route path="/TramosCliente" element={<TramosCliente />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
