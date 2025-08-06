import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ConfirmationView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />

        <motion.h2
          className="text-2xl font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ¡Gracias por tu compra!
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Hemos recibido tu pedido y nos pondremos en contacto contigo pronto.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/")}
            type="button"
            className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Volver a inicio
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConfirmationView;
