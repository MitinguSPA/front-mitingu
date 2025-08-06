import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PaymentHeader from "../PaymentProof/PaymentHeader";
import PaymentFooter from "../PaymentProof/PaymentFooter";
import PaymentProofUpload from "../PaymentProof/PaymentProofUpload";

const PaymentProofPage: React.FC = () => {
  const { token } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F4A9B6]/20 to-white">
      <PaymentHeader />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#DD6E81] mb-3 md:mb-4 px-4">
              Comprobante de Pago
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Sube tu comprobante de transferencia para que podamos procesar tu
              pedido de manera rápida y segura.
            </p>
          </div>

          <div className="flex justify-center mb-6 md:mb-8 px-4">
            <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto">
              <div className="flex items-center flex-shrink-0">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#DD6E81] text-white rounded-full flex items-center justify-center text-xs md:text-sm font-semibold">
                  1
                </div>
                <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-[#DD6E81] whitespace-nowrap">
                  Realizar Transferencia
                </span>
              </div>
              <div className="w-4 md:w-8 h-0.5 bg-[#DD6E81] flex-shrink-0"></div>
              <div className="flex items-center flex-shrink-0">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#DD6E81] text-white rounded-full flex items-center justify-center text-xs md:text-sm font-semibold">
                  2
                </div>
                <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-[#DD6E81] whitespace-nowrap">
                  Subir Comprobante
                </span>
              </div>
              <div className="w-4 md:w-8 h-0.5 bg-gray-300 flex-shrink-0"></div>
              <div className="flex items-center flex-shrink-0">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold">
                  3
                </div>
                <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-gray-600 whitespace-nowrap">
                  Confirmación
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mx-2 md:mx-0">
            <PaymentProofUpload token={token ?? ""} />
          </div>

          <motion.div
            className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-2 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="text-base md:text-lg font-semibold text-[#DD6E81] mb-2 md:mb-3">
                📋 Información Importante
              </h3>
              <ul className="text-xs md:text-sm text-gray-600 space-y-1 md:space-y-2">
                <li>
                  • El comprobante debe ser legible y mostrar todos los datos
                </li>
                <li>• Formatos aceptados: JPG & PNG</li>
                <li>• Tamaño máximo: 10MB por archivo</li>
                <li>• Tiempo de procesamiento: 2-4 horas laborables</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="text-base md:text-lg font-semibold text-[#DD6E81] mb-2 md:mb-3">
                💳 Datos de Transferencia
              </h3>
              <div className="text-xs md:text-sm text-gray-600 space-y-1 md:space-y-2">
                <p>
                  <strong>Banco:</strong> Banco Nacional
                </p>
                <p>
                  <strong>Cuenta:</strong> 1234-5678-9012-3456
                </p>
                <p>
                  <strong>Titular:</strong> MITINGÜ S.A.C.
                </p>
                <p>
                  <strong>CCI:</strong> 012-345-001234567890-12
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <PaymentFooter />
    </div>
  );
};

export default PaymentProofPage;
