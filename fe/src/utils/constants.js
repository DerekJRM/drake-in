export const ROUTES = {
  HOME: "/",
  RESERVACIONES: "/reservaciones",
  RUTAS: "/routes",
  REGISTRO: "/register",
  LOGIN: "/login",
};

export const HOTELS = [
  { value: "drake-bay-resort", label: "Drake Bay Resort" },
  { value: "la-paloma-lodge", label: "La Paloma Lodge" },
  { value: "aguila-de-osa", label: "Aguila de Osa Inn" },
  { value: "copa-de-arbol", label: "Copa de Árbol" },
  { value: "otro", label: "Otro hotel" },
];

export const USER_TYPES = {
  ADMIN: "ADMIN",
  HOTEL: "HOTEL",
  OPERATOR: "OPERADOR",
};

export const OPERATOR_TYPES = {
  BOTE: "BOTE",
  HOTEL: "HOTEL",
};

export const VIEW_TYPES = {
  HOTEL: "HOTEL",
  OPERATOR: "OPERADOR",
  PASAJERO: "PASAJERO",
};

export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "danger",
  WARNING: "warning",
  INFO: "info",
};

export const CONTACT_INFO = {
  EMAIL: "info@drakein.com",
  PHONE: "+506 1234-5678",
};

// Validaciones de formularios
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 4,
  MAX_PASSWORD_LENGTH: 50,
};
