# 🏗️ Arquitectura de Componentes - Drake-In Frontend

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/              # Componentes reutilizables en toda la app
│   ├── auth/                # Componentes de autenticación
│   ├── home/                # Componentes específicos del Home
│   ├── reservations/        # Componentes de reservaciones
│   └── routes/              # Componentes de rutas
├── hooks/                   # Custom hooks reutilizables
├── utils/                   # Utilidades y helpers
├── services/                # Servicios de API
└── pages/                   # Páginas principales
```

## 🎨 Componentes Comunes (`/components/common/`)

Componentes reutilizables que se pueden usar en cualquier parte de la aplicación:

### 1. **FieldError**

- **Propósito**: Mostrar mensajes de error de validación
- **Props**: `error` (string)
- **Uso**: Debajo de cualquier campo de formulario

### 2. **SelectField**

- **Propósito**: Select dropdown con estados de carga/error
- **Props**: `id`, `label`, `name`, `value`, `onChange`, `options`, `loading`, `error`, `placeholder`, `disabled`, `required`
- **Características**:
  - Maneja estados de carga
  - Muestra mensajes de error
  - Soporta opciones personalizadas con `getOptionValue` y `getOptionLabel`

### 3. **TextInput**

- **Propósito**: Input de texto/email reutilizable
- **Props**: `id`, `label`, `type`, `name`, `value`, `onChange`, `placeholder`, `required`, `disabled`
- **Tipos soportados**: `text`, `email`, `password`, `number`, etc.

### 4. **DateInput**

- **Propósito**: Input de fecha con validaciones
- **Props**: `id`, `label`, `name`, `value`, `onChange`, `required`, `disabled`, `minDate`, `maxDate`, `disablePastDates`
- **Características**:
  - Calcula automáticamente fecha mínima
  - Deshabilita fechas pasadas opcionalmente

### 5. **SubmitButton**

- **Propósito**: Botón de envío con estado de carga
- **Props**: `isSubmitting`, `label`, `loadingLabel`, `disabled`, `type`
- **Características**: Muestra diferentes textos según el estado

## 🏠 Componentes de Home (`/components/home/`)

### Secciones del Formulario de Reservación:

#### 1. **TravelDetailsSection**

- Maneja origen y destino
- Props: `formData`, `fieldErrors`, `onChange`, `originOptions`, `destinationOptions`, `loadingPuertos`, `errorPuertos`

#### 2. **DateTimeSection**

- Maneja fecha y horario
- Props: `formData`, `fieldErrors`, `onChange`, `horarios`, `loadingHorarios`, `errorHorarios`, `canPickSchedule`

#### 3. **PassengerInfoSection**

- Maneja información del pasajero (nombre y email)
- Props: `formData`, `fieldErrors`, `onChange`

#### 4. **HotelSection**

- Maneja selección de hotel
- Props: `formData`, `fieldErrors`, `onChange`, `hotelOptions`

#### 5. **ReservationForm** (Contenedor)

- Usa el hook `useReservationForm`
- Orquesta todas las secciones
- Solo 75 líneas de código (antes: 360 líneas)

## 🔐 Componentes de Autenticación (`/components/auth/`)

### 1. **LoginForm**

- Formulario de inicio de sesión
- Usa componentes comunes: `TextInput`, `FieldError`, `SubmitButton`
- Validación con `validateLoginForm`

### 2. **RegisterForm**

- Formulario de registro
- Campos: nombre, email, password, confirmPassword
- Validación con `validateRegisterForm`

## 🪝 Custom Hooks (`/hooks/`)

### 1. **useFormValidation**

- **Propósito**: Manejar validación de formularios
- **Parámetros**: `validationFunction`
- **Retorna**:
  - `fieldErrors`: Objeto con errores
  - `validate(formData)`: Valida el formulario
  - `clearFieldError(fieldName)`: Limpia error de un campo
  - `clearAllErrors()`: Limpia todos los errores
  - `setFieldError(fieldName, errorMessage)`: Establece un error

### 2. **useReservationForm**

- **Propósito**: Manejar toda la lógica del formulario de reservación
- **Retorna**:
  - Estado: `formData`, `fieldErrors`, `isSubmitting`
  - Opciones: `originOptions`, `destinationOptions`, `hotelOptions`, `horarios`
  - Estados externos: `loadingPuertos`, `errorPuertos`, `loadingHorarios`, `errorHorarios`
  - Reglas: `canPickSchedule`
  - Funciones: `handleChange`, `handleSubmit`, `resetForm`

## 🛠️ Utilidades (`/utils/validators.js`)

### Funciones de Validación:

#### 1. **isValidEmail(email)**

- Valida formato de email usando regex

#### 2. **isValidName(name)**

- Valida que el nombre tenga mínimo 3 caracteres

#### 3. **isRequired(value)**

- Valida que un campo no esté vacío

#### 4. **validateReservationForm(formData)**

- Valida el formulario completo de reservación
- Retorna objeto con errores

#### 5. **validateLoginForm(formData)**

- Valida formulario de login
- Valida email y contraseña (mín. 6 caracteres)

#### 6. **validateRegisterForm(formData)**

- Valida formulario de registro
- Valida nombre, email, contraseña y confirmación

## 🎯 Beneficios de la Arquitectura

### ✅ Reutilización

- Componentes comunes usables en toda la app
- Validaciones centralizadas
- Hooks personalizados reutilizables

### ✅ Mantenibilidad

- Componentes pequeños y enfocados
- Separación clara de responsabilidades
- Fácil de entender y modificar

### ✅ Escalabilidad

- Fácil agregar nuevos campos/secciones
- Patrón consistente para nuevos formularios
- Estructura modular

### ✅ Testabilidad

- Componentes pequeños fáciles de testear
- Lógica separada de la presentación
- Validaciones independientes

### ✅ Consistencia

- UI uniforme en toda la aplicación
- Validaciones consistentes
- Manejo de errores estandarizado

## 📊 Métricas de Mejora

| Métrica                   | Antes | Después | Mejora |
| ------------------------- | ----- | ------- | ------ |
| Líneas en ReservationForm | 360   | 75      | 79% ↓  |
| Componentes reutilizables | 0     | 5       | +5     |
| Validaciones duplicadas   | Sí    | No      | ✅     |
| Hooks personalizados      | 0     | 2       | +2     |
| Formularios implementados | 1     | 3       | +2     |

## 🚀 Uso de los Componentes

### Ejemplo 1: Crear un nuevo formulario

```jsx
import { TextInput, SelectField, FieldError, SubmitButton } from '../common';
import useFormValidation from '../../hooks/useFormValidation';
import { validateMyForm } from '../../utils/validators';

const MyForm = () => {
  const [formData, setFormData] = useState({ ... });
  const { fieldErrors, validate } = useFormValidation(validateMyForm);

  // ... resto de la lógica

  return (
    <form>
      <TextInput ... />
      <FieldError error={fieldErrors.field} />
      <SubmitButton ... />
    </form>
  );
};
```

### Ejemplo 2: Usar un componente común

```jsx
<TextInput
  id="name"
  label="Nombre"
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Tu nombre"
  required
/>
<FieldError error={fieldErrors.name} />
```

## 📝 Próximos Pasos Sugeridos

1. ✅ Implementar tests unitarios para componentes comunes
2. ✅ Agregar validaciones asíncronas (ej: verificar email disponible)
3. ✅ Crear más hooks personalizados según necesidades
4. ✅ Implementar sistema de notificaciones (toast/snackbar)
5. ✅ Agregar internacionalización (i18n)

## 🤝 Contribuir

Al agregar nuevos componentes, sigue estos principios:

1. **Single Responsibility**: Un componente = una responsabilidad
2. **Reutilizable**: Si se usa >2 veces, debe ser común
3. **Documentado**: Agrega JSDoc a tus componentes
4. **Tipado**: Documenta props esperadas
5. **Validado**: Usa el sistema de validación existente

---

**Última actualización**: Octubre 4, 2025
**Mantenido por**: Equipo Drake-In
