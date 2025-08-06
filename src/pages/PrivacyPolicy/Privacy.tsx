import {
  Lock,
  Eye,
  Database,
  UserCheck,
  Shield,
  AlertCircle,
} from "lucide-react";

const Privacidad = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Política de Privacidad
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          En MITINGÜ valoramos y protegemos tu privacidad. Conoce cómo
          recopilamos, utilizamos y protegemos tu información personal.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Última actualización: Enero 2024
        </p>
      </div>

      {/* Privacy Commitment */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 mb-12 border border-blue-200">
        <div className="flex items-start">
          <div className="w-14 h-14 bg-blue-300 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
            <Shield className="w-7 h-7 text-blue-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestro Compromiso
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nos comprometemos a proteger su información personal y a cumplir
              con la Ley N° 19.628 sobre Protección de la Vida Privada de Chile.
              Su privacidad es fundamental para nosotros.
            </p>
          </div>
        </div>
      </div>

      {/* Information We Collect */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-12">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mr-4">
            <Database className="w-6 h-6 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            1. Información que Recopilamos
          </h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Información Personal
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Nombre completo y RUT (para emisión de facturas)
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Información de contacto (teléfono, email)
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Dirección (cuando sea requerida para facturación)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Información de Compra
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Historial de compras y productos adquiridos
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Métodos de pago utilizados
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Fechas y montos de transacciones
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How We Use Information */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-12">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
            <Eye className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            2. Cómo Utilizamos su Información
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Propósitos Principales:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                Procesar y completar sus compras
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                Emitir comprobantes de compra
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                Brindar atención al cliente
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                Gestionar devoluciones y cambios
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Propósitos Secundarios:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                Mejorar nuestros productos y servicios
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                Comunicar ofertas especiales (con su consentimiento)
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                Análisis estadísticos internos
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">✓</span>
                Cumplir con obligaciones legales
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Protection */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-12">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            3. Protección de Datos
          </h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Medidas de Seguridad
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Seguridad Física
                </h4>
                <p className="text-gray-600 text-sm">
                  Almacenamiento seguro de documentos físicos con acceso
                  restringido.
                </p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Seguridad Digital
                </h4>
                <p className="text-gray-600 text-sm">
                  Sistemas protegidos con contraseñas y acceso limitado al
                  personal autorizado.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Retención de Datos
            </h3>
            <p className="text-gray-700">
              Conservamos su información personal solo durante el tiempo
              necesario para cumplir con los propósitos descritos y las
              obligaciones legales aplicables.
            </p>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-12">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4">
            <UserCheck className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">4. Sus Derechos</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-gray-900">Derecho de Acceso</h4>
              <p className="text-gray-600 text-sm">
                Puede solicitar información sobre los datos que tenemos sobre
                usted.
              </p>
            </div>
            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-gray-900">
                Derecho de Rectificación
              </h4>
              <p className="text-gray-600 text-sm">
                Puede solicitar la corrección de datos inexactos o incompletos.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-gray-900">
                Derecho de Eliminación
              </h4>
              <p className="text-gray-600 text-sm">
                Puede solicitar la eliminación de sus datos personales cuando
                sea procedente.
              </p>
            </div>
            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-gray-900">
                Derecho de Oposición
              </h4>
              <p className="text-gray-600 text-sm">
                Puede oponerse al procesamiento de sus datos para ciertos
                propósitos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sharing Information */}
      <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-3xl p-8 mb-12 border border-red-200">
        <div className="flex items-start">
          <div className="w-14 h-14 bg-red-300 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
            <AlertCircle className="w-7 h-7 text-red-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Compartir Información
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>NO compartimos</strong> su información personal con
                terceros para fines comerciales o publicitarios.
              </p>
              <p>
                Solo compartimos información cuando es requerido por ley o para
                el funcionamiento esencial de nuestros servicios (por ejemplo,
                procesadores de pago).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ejercer sus Derechos
        </h2>
        <p className="text-gray-600 mb-6">
          Para ejercer cualquiera de sus derechos o realizar consultas sobre
          privacidad, contáctenos:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Presencialmente
            </h4>
            <p className="text-gray-600 text-sm">
              Av. Bernardo O'Higgins 1065, Talagante
            </p>
            <p className="text-gray-600 text-sm">Lun - Sáb: 10AM - 8PM</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Por Teléfono</h4>
            <p className="text-pink-600 font-medium">+56 9 1234 5678</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Por Email</h4>
            <p className="text-pink-600 font-medium">privacidad@mitingu.cl</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Nos comprometemos a responder a su solicitud dentro de 30 días
          hábiles.
        </p>
      </div>
    </div>
  );
};

export default Privacidad;
