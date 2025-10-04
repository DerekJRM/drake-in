import React from "react";

const Loading = ({ message = "Cargando..." }) => {
  return (
    <div>
      <div role="status">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Loading;
