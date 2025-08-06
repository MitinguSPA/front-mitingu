import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-[#F4A9B6]/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/"
              className="flex items-center text-[#DD6E81] hover:text-[#c1485c] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
              <span className="font-medium text-sm md:text-base">Volver</span>
            </Link>
            <div className="h-4 md:h-6 w-px bg-gray-300"></div>
            <Link to="/" className="flex items-center">
              <motion.h1
                className="text-lg md:text-2xl font-bold text-[#DD6E81]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                MITINGÜ ^_−☆
              </motion.h1>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500 mr-2" />
              <span>Pago Seguro</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 text-blue-500 mr-2" />
              <span>Procesamiento Rápido</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-[#DD6E81] mr-2" />
              <span>Verificación Automática</span>
            </div>
          </div>

          <div className="hidden md:flex lg:hidden items-center space-x-3">
            <Shield className="h-4 w-4 text-green-500" />
            <Clock className="h-4 w-4 text-blue-500" />
            <CheckCircle className="h-4 w-4 text-[#DD6E81]" />
          </div>
        </div>

        <div className="md:hidden mt-3 flex justify-center space-x-4">
          <div className="flex items-center text-xs text-gray-600">
            <Shield className="h-3 w-3 text-green-500 mr-1" />
            <span>Seguro</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 text-blue-500 mr-1" />
            <span>Rápido</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <CheckCircle className="h-3 w-3 text-[#DD6E81] mr-1" />
            <span>Verificado</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PaymentHeader;
