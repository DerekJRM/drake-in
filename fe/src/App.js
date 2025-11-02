import { Routes, Route } from "react-router-dom";
import { OPERATOR_TYPES, ROUTES } from "./utils/constants";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservaciones from "./pages/Reservaciones";

function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />

          {/* Rutas protegidas solo para OPERADOR */}
          <Route
            path={ROUTES.RESERVACIONES}
            element={
              <ProtectedRoute allowedRoles={[OPERATOR_TYPES.BOTE, OPERATOR_TYPES.HOTEL]}>
                <Reservaciones />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas solo para ADMIN */}
          <Route
            path={ROUTES.REGISTRO}
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Register />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
