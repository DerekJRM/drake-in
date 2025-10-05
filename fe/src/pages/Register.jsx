import React, { useState } from "react";
import { USER_TYPES } from "../utils/constants";

const Register = () => {
  const [formData, setFormData] = useState({
    userType: "",
    hotelName: "",
    boatName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userType) {
      alert("Por favor selecciona el tipo de usuario");
      return;
    }
    alert("¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.");
    setFormData({
      userType: "",
      hotelName: "",
      boatName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h4>Registrar Nuevo Operador</h4>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Tipo de usuario</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona el tipo de usuario</option>
                  <option value={USER_TYPES.HOTEL}>Hotel</option>
                  <option value={USER_TYPES.OPERATOR}>Operador de Bote</option>
                </select>
              </div>

              {formData.userType === USER_TYPES.HOTEL && (
                <div>
                  <label>Nombre del Hotel</label>
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleChange}
                    placeholder="Nombre del hotel"
                    required
                  />
                </div>
              )}

              {formData.userType === USER_TYPES.OPERATOR && (
                <div>
                  <label>Nombre del Bote</label>
                  <input
                    type="text"
                    name="boatName"
                    value={formData.boatName}
                    onChange={handleChange}
                    placeholder="Nombre del bote"
                    required
                  />
                </div>
              )}

              <div>
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Tu contraseña"
                  required
                />
              </div>

              <div>
                <button type="submit">Registrar Operador</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
