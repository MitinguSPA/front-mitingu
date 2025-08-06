import React from "react";

interface AlertDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
