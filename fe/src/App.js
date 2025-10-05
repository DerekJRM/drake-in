import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/constants";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservations from "./pages/Reservations";
import RoutesPage from "./pages/Routes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.RESERVATIONS} element={<Reservations />} />
          <Route path={ROUTES.ROUTES} element={<RoutesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
