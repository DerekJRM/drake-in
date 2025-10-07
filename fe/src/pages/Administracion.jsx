// import { useState, useEffect } from "react";
// import RouteModal from "../components/routes/RouteModal";
// import RouteList from "../components/routes/RouteList";
// import { useSaveRuta, useDeleteRuta } from "../hooks/useRutas";

// const RoutesAdministration = () => {
//   const [routes, setRoutes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("add");
//   const [selectedRoute, setSelectedRoute] = useState(null);
//
//   const { mutate: saveRuta } = useSaveRuta();
//   const { mutate: deleteRuta } = useDeleteRuta();
//
//   useEffect(() => {
//     // TODO: Reemplazar con llamada real a la API
//     loadMockRoutes();
//   }, []);
//
//   const loadMockRoutes = () => {
//     setLoading(true);
//     setTimeout(() => {
//       const mockRoutes = [
//         {
//           id: "sierpe-drake-1",
//           origin: "Sierpe",
//           destination: "Bahía Drake",
//           operatorId: "1",
//           pricePerPerson: 25.0,
//           schedule: "08:00",
//           calendarDate: "2025-10-15",
//           isActive: true,
//         },
//         {
//           id: "drake-jimenez-2",
//           origin: "Bahía Drake",
//           destination: "Puerto Jiménez",
//           operatorId: "2",
//           pricePerPerson: 35.0,
//           schedule: "10:00",
//           calendarDate: "2025-10-15",
//           isActive: true,
//         },
//         {
//           id: "drake-corcovado-3",
//           origin: "Bahía Drake",
//           destination: "Parque Corcovado",
//           operatorId: "3",
//           pricePerPerson: 45.0,
//           schedule: "14:00",
//           calendarDate: "2025-10-15",
//           isActive: false,
//         },
//       ];
//       setRoutes(mockRoutes);
//       setLoading(false);
//     }, 500);
//   };
//
//   const handleAddRoute = () => {
//     setModalMode("add");
//     setSelectedRoute(null);
//     setIsModalOpen(true);
//   };
//
//   const handleEdit = (route) => {
//     setModalMode("edit");
//     setSelectedRoute(route);
//     setIsModalOpen(true);
//   };
//
//   const handleDelete = (routeId) => {
//     // eslint-disable-next-line no-restricted-globals
//     if (!confirm("¿Estás seguro de que deseas eliminar esta ruta?")) {
//       return;
//     }
//
//     deleteRuta(routeId, {
//       onSuccess: () => {
//         setRoutes((prevRoutes) =>
//           prevRoutes.filter((route) => route.id !== routeId)
//         );
//       },
//       onError: () => {
//         alert("Error al eliminar la ruta. Por favor, intenta nuevamente.");
//       },
//     });
//   };
//
//   const handleSaveRoute = (routeData) => {
//     const { _localData, ...dataForDB } = routeData;
//
//     if (modalMode === "add") {
//       const dataToCreate = {
//         ...dataForDB,
//         newItem: true,
//       };
//
//       saveRuta(dataToCreate, {
//         onSuccess: (response) => {
//           const newRoute = {
//             ...dataForDB,
//             ..._localData,
//             id: response?.id || `${dataForDB.origenId}-${Date.now()}`,
//           };
//           setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
//           setIsModalOpen(false);
//         },
//         onError: (error) => {
//           const errorMessage =
//             error.response?.data || "Error al guardar la ruta.";
//           alert(errorMessage);
//         },
//       });
//     } else {
//       const dataToUpdate = {
//         ...dataForDB,
//         id: selectedRoute.id,
//         newItem: false,
//         updateableFields: ["origenId", "fecha", "horarioId", "operadorId"],
//       };
//
//       saveRuta(dataToUpdate, {
//         onSuccess: () => {
//           setRoutes((prevRoutes) =>
//             prevRoutes.map((route) =>
//               route.id === selectedRoute.id
//                 ? { ...dataForDB, ..._localData, id: selectedRoute.id }
//                 : route
//             )
//           );
//           setIsModalOpen(false);
//         },
//         onError: (error) => {
//           const errorMessage =
//             error.response?.data || "Error al actualizar la ruta.";
//           alert(errorMessage);
//         },
//       });
//     }
//   };
//
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedRoute(null);
//   };
//
//   return (
//     <div>
//       <div>
//         <h2>Administración de Rutas</h2>
//         <button onClick={handleAddRoute}>Nueva Ruta</button>
//       </div>
//
//       <RouteModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         mode={modalMode}
//         routeData={selectedRoute}
//         onSave={handleSaveRoute}
//       />
//
//       <RouteList
//         routes={routes}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         loading={loading}
//       />
//     </div>
//   );
// };
//
// export default RoutesAdministration;

import React from "react";
import AdministracionRutas from "../components/reservations/AdministracionRutas";
import { Container } from "react-bootstrap";

const Administracion = () => {
  return (
      <Container style={{ maxWidth: "1200px" }}>
        <AdministracionRutas />
      </Container>
  );
};

export default Administracion;


