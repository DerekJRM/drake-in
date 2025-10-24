import { Routes, Route } from "react-router-dom";
import { ROUTES, USER_TYPES } from "./utils/constants";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservaciones from "./pages/Reservaciones";
import RoutesPage from "./pages/Administracion";

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
              <ProtectedRoute allowedRoles={[USER_TYPES.OPERATOR]}>
                <Reservaciones />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas solo para ADMIN */}
          <Route
            path={ROUTES.REGISTRO}
            element={
              <ProtectedRoute allowedRoles={[USER_TYPES.ADMIN]}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.RUTAS}
            element={
              <ProtectedRoute allowedRoles={[USER_TYPES.ADMIN]}>
                <RoutesPage />
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
