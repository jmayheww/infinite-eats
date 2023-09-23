import React from "react";

function Modal({ isOpen, title, message, onConfirm, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-primary rounded p-5 shadow-lg max-w-3xl text-center">
        <h2 className="text-2xl font-extrabold mb-4 text-secondary">{title}</h2>
        <p className="text-secondary mb-4">{message}</p>
        <div className="flex justify-center space-x-2">
          <button
            onClick={onClose}
            className="py-2 px-6 text-white bg-accent rounded-md border border-secondary shadow-md hover:border-accent hover:opacity-80 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-6 text-white bg-secondary rounded-md border border-accent shadow-md hover:border-secondary hover:opacity-80 transition-all duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
