import { FileText, Scale, Shield, AlertCircle } from "lucide-react";

const TerminosCondiciones = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Términos y Condiciones
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Términos de uso y condiciones generales para el uso de nuestros
          servicios y productos.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Última actualización: Enero 2024
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-12">
        {/* General Information */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mr-4">
              <Scale className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Información General
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>MITINGÜ</strong> es una tienda especializada en productos
              alimenticios asiáticos ubicada en Av. Bernardo O'Higgins 1065,
              Talagante, Región Metropolitana, Chile.
            </p>
            <p>
              Al realizar una compra en nuestro establecimiento, usted acepta
              estar sujeto a estos términos y condiciones. Si no está de acuerdo
              con alguna parte de estos términos, le recomendamos no utilizar
              nuestros servicios.
            </p>
          </div>
        </div>

        {/* Products and Services */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            2. Productos y Servicios
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                2.1 Descripción de Productos
              </h3>
              <p>
                Ofrecemos una amplia variedad de productos alimenticios
                asiáticos, incluyendo snacks, bebidas, dulces y otros productos
                especializados. Todos nuestros productos son importados y
                cumplen con las regulaciones sanitarias chilenas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                2.2 Disponibilidad
              </h3>
              <p>
                La disponibilidad de productos está sujeta a stock. Nos
                reservamos el derecho de limitar las cantidades de compra por
                cliente cuando sea necesario.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.3 Precios</h3>
              <p>
                Los precios están expresados en pesos chilenos (CLP) e incluyen
                IVA. Nos reservamos el derecho de modificar precios sin previo
                aviso.
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Terms */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            3. Condiciones de Compra
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                3.1 Modalidad de Venta
              </h3>
              <p>
                Todas las ventas se realizan exclusivamente en nuestro local
                físico. No realizamos ventas online ni envíos a domicilio.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                3.2 Métodos de Pago
              </h3>
              <p>
                Aceptamos efectivo, tarjetas de débito, tarjetas de crédito y
                transferencias bancarias. El pago debe realizarse al momento de
                la compra.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                3.3 Comprobantes
              </h3>
              <p>
                Emitimos boleta o factura según corresponda. Es responsabilidad
                del cliente solicitar y conservar su comprobante de compra.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Responsibilities */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            4. Responsabilidades del Cliente
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Verificar las fechas de vencimiento de los productos antes de la
                compra
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Conservar los productos en condiciones adecuadas después de la
                compra
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Informar inmediatamente cualquier problema con los productos
                adquiridos
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1">•</span>
                Respetar las normas de convivencia dentro del establecimiento
              </li>
            </ul>
          </div>
        </div>

        {/* Liability */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Limitación de Responsabilidad
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              MITINGÜ no se hace responsable por daños o problemas derivados del
              mal uso o conservación inadecuada de los productos después de la
              compra.
            </p>
            <p>
              Nuestra responsabilidad se limita al valor del producto adquirido
              y está sujeta a nuestras políticas de devolución y cambio.
            </p>
          </div>
        </div>

        {/* Privacy and Data */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            6. Privacidad y Protección de Datos
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Respetamos su privacidad y protegemos sus datos personales de
              acuerdo con la Ley N° 19.628 sobre Protección de la Vida Privada
              de Chile.
            </p>
            <p>
              Los datos recopilados se utilizan únicamente para fines
              comerciales relacionados con su compra y no son compartidos con
              terceros sin su consentimiento.
            </p>
          </div>
        </div>

        {/* Modifications */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 border border-pink-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center mr-4">
              <AlertCircle className="w-6 h-6 text-pink-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Modificaciones
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Nos reservamos el derecho de modificar estos términos y
              condiciones en cualquier momento. Las modificaciones entrarán en
              vigor inmediatamente después de su publicación.
            </p>
            <p>
              Es responsabilidad del cliente revisar periódicamente estos
              términos para mantenerse informado de cualquier cambio.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacto</h2>
          <p className="text-gray-600 mb-4">
            Para consultas sobre estos términos y condiciones, puede
            contactarnos:
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Dirección:</strong> Av. Bernardo O'Higgins 1065, Talagante
            </p>
            <p>
              <strong>Teléfono:</strong> +56 9 1234 5678
            </p>
            <p>
              <strong>Email:</strong> info@mitingu.cl
            </p>
            <p>
              <strong>Horarios:</strong> Lunes a Sábado de 10:00 AM a 8:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosCondiciones;
