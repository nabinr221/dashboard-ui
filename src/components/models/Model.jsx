// Modal.js
import React from 'react';
import { X } from 'lucide-react';
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-20 overflow-y-auto ${isOpen ? '' : 'hidden'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        >
          {' '}
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div className="p-10 text-center inline-block align-bottom bg-white  overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <span
            onClick={onClose}
            className="absolute transition duration-300 top-0 right-0 cursor-pointer p-5 hover:text-orange-400"
          >
            <X className="h-7 w-7" />
          </span>
          <h1 className="font-bold text-2xl my-5 ">
            Are you sure you want to Delete?
          </h1>
          <div className="space-x-10"> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
