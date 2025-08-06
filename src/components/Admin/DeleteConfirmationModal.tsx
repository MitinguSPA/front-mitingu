import React from "react";
import { AlertTriangle } from "lucide-react";
import Button from "../UI/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={onClose}
        ></div>

        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-error-50 rounded-full p-3">
              <AlertTriangle className="w-6 h-6 text-error-600" />
            </div>
          </div>

          <h3 className="text-lg font-medium text-secondary-900 text-center mb-2">
            Eliminar {itemName}
          </h3>

          <p className="text-secondary-500 text-center mb-6">
            ¿Estás seguro que deseas eliminar este {itemName.toLowerCase()}?
            Esta acción no se puede deshacer.
          </p>

          <div className="flex justify-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-[#DD6E81] hover:bg-error-700"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
