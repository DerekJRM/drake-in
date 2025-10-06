import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/constants";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

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
              <Route path={ROUTES.REGISTRO} element={<Register />} />
              <Route
                path={ROUTES.RESERVACIONES}
                element={<Reservaciones />}
              />
              <Route path={ROUTES.RUTAS} element={<RoutesPage />} />
            </Routes>
          </main>
          <Footer />
      </div>
  );
}

export default App;
