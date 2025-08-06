import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 2, 0));
    }, 40);

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    // Bloqueo de pantalla completa
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 cursor-wait">
      <div className="bg-white border border-gray-300 rounded-xl shadow-2xl px-6 py-5 min-w-[320px] max-w-[90vw] text-center relative">
        <div className="flex flex-col items-center space-y-2">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <p className="text-green-700 text-lg font-semibold">{message}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        )}

        {/* Barra de progreso inferior */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-green-400 rounded-b-xl transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default SuccessMessage;
