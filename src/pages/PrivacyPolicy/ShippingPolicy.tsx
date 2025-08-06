import { Truck, MapPin, Clock, AlertCircle } from "lucide-react";

const PoliticaEnvios = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Truck className="w-10 h-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Política de Envíos
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Información importante sobre nuestros servicios de entrega y
          modalidades de compra.
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 mb-12 border border-pink-200">
        <div className="flex items-start">
          <div className="w-14 h-14 bg-pink-300 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
            <AlertCircle className="w-7 h-7 text-pink-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Aviso Importante
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>
                MITINGÜ actualmente NO realiza envíos a domicilio.
              </strong>{" "}
              Todos nuestros productos deben ser retirados directamente en
              nuestra tienda física. Esto nos permite garantizar la frescura y
              calidad de nuestros productos asiáticos.
            </p>
          </div>
        </div>
      </div>

      {/* Store Information */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-100">
          <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ubicación de la Tienda
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Dirección:</strong> Av. Bernardo O'Higgins 1065
            </p>
            <p>
              <strong>Ciudad:</strong> Talagante
            </p>
            <p>
              <strong>Región:</strong> Metropolitana
            </p>
            <p>
              <strong>País:</strong> Chile
            </p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-100">
          <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Horarios de Retiro
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Lunes a Sábado:</strong> 10:00 AM - 8:00 PM
            </p>
            <p>
              <strong>Domingo:</strong> Cerrado
            </p>
            <p className="text-sm text-pink-600 font-medium mt-4">
              * Se recomienda llegar al menos 30 minutos antes del cierre
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Process */}
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Proceso de Compra
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              1
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Selecciona tus productos
            </h4>
            <p className="text-gray-600 text-sm">
              Navega por nuestro catálogo y elige tus snacks y bebidas asiáticas
              favoritas.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              2
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Reserva por teléfono
            </h4>
            <p className="text-gray-600 text-sm">
              Llámanos al +56 9 1234 5678 para confirmar disponibilidad y
              reservar tu pedido.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              3
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Retira en tienda
            </h4>
            <p className="text-gray-600 text-sm">
              Visítanos en nuestros horarios de atención para retirar y pagar tu
              pedido.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Ventajas del Retiro en Tienda
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-pink-500 mr-3">✨</span>
              <span className="text-gray-700">
                Productos siempre frescos y en perfecto estado
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3">✨</span>
              <span className="text-gray-700">
                Sin costos adicionales de envío
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3">✨</span>
              <span className="text-gray-700">
                Atención personalizada de nuestro equipo
              </span>
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-pink-500 mr-3">✨</span>
              <span className="text-gray-700">
                Posibilidad de ver los productos antes de comprar
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3">✨</span>
              <span className="text-gray-700">
                Recomendaciones personalizadas
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-3">✨</span>
              <span className="text-gray-700">
                Experiencia de compra auténtica
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PoliticaEnvios;
