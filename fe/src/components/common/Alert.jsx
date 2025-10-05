import React, { useEffect } from "react";

const Alert = ({
  message,
  type = "success",
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!message) return null;

  return (
    <div role="alert" data-type={type}>
      {message}
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Close">
          X
        </button>
      )}
    </div>
  );
};

export default Alert;
