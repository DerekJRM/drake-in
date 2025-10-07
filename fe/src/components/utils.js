const utils = {
  getUpdatedFields: (original, updated) => {
    const updatedFields = [];
    for (const key in updated) {
      if (
        updated.hasOwnProperty(key) &&
        key !== "id" &&
        key !== "newItem" &&
        key !== "updateableFields"
      ) {
        if (original[key] !== updated[key]) {
          updatedFields.push(key);
        }
      }
    }
    return updatedFields;
  },

  /**
   * Decodifica un token JWT y extrae su payload
   * @param {string} token - Token JWT a decodificar
   * @returns {object|null} - Payload del token o null si hay error
   */
  decodeToken: (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error al decodificar token:", error);
      return null;
    }
  },

  /**
   * Extrae información del usuario desde un token JWT decodificado
   * @param {object} decodedToken - Token JWT ya decodificado
   * @returns {object} - Objeto con datos del usuario
   */
  extractUserFromToken: (decodedToken) => {
    if (!decodedToken) return null;

    return {
      id: decodedToken.id,
      email: decodedToken.sub,
      rol: decodedToken.rol,
      nombre: decodedToken.nombre || decodedToken.sub,
    };
  },
};

export { utils };
