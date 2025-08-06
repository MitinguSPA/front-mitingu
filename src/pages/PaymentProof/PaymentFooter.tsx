import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Clock, Shield, Award } from "lucide-react";

const PaymentFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-[#F4A9B6] to-white mt-8 md:mt-12">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-6 md:mb-8">
          <motion.h3
            className="text-lg md:text-xl font-semibold text-[#DD6E81] mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ¿Necesitas Ayuda?
          </motion.h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto px-4">
            Nuestro equipo de soporte está disponible para ayudarte con
            cualquier duda sobre tu comprobante de pago.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            <motion.div
              className="flex items-center justify-center p-3 md:p-4 bg-white/70 rounded-lg hover:bg-white/90 transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Phone className="h-4 w-4 md:h-5 md:w-5 text-[#DD6E81] mr-2 md:mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm md:text-base">
                  Teléfono
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  +51 999 888 777
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center p-3 md:p-4 bg-white/70 rounded-lg hover:bg-white/90 transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Mail className="h-4 w-4 md:h-5 md:w-5 text-[#DD6E81] mr-2 md:mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm md:text-base">
                  Email
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  soporte@mitingu.com
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center p-3 md:p-4 bg-white/70 rounded-lg hover:bg-white/90 transition-colors cursor-pointer sm:col-span-1"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-[#DD6E81] mr-2 md:mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm md:text-base">
                  WhatsApp
                </p>
                <p className="text-xs md:text-sm text-gray-600">Chat en vivo</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            className="text-center p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#DD6E81]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#DD6E81]" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
              Horario de Atención
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              Lunes a Viernes: 10:00 a 20:00
              <br />
              Sábados: 10:00 a 20:00
            </p>
          </motion.div>

          <motion.div
            className="text-center p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#DD6E81]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-[#DD6E81]" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
              Seguridad Garantizada
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              Tus datos están protegidos con
              <br />
              encriptación de nivel bancario
            </p>
          </motion.div>

          <motion.div
            className="text-center p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#DD6E81]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Award className="h-5 w-5 md:h-6 md:w-6 text-[#DD6E81]" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
              Procesamiento Rápido
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              Verificación automática en
              <br />
              menos de 4 horas laborables
            </p>
          </motion.div>
        </div>

        <div className="border-t border-[#DD6E81]/20 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <span className="text-lg md:text-2xl font-bold text-[#DD6E81]">
                MITINGÜ ^_−☆
              </span>
              <span className="text-xs md:text-sm text-gray-600 text-center md:text-left">
                © {new Date().getFullYear()} MITINGÜ ^_−☆. Todos los derechos
                reservados.
              </span>
            </div>
            <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm text-gray-600">
              <a href="#" className="hover:text-[#DD6E81] transition-colors">
                Términos
              </a>
              <a href="#" className="hover:text-[#DD6E81] transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-[#DD6E81] transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PaymentFooter;
