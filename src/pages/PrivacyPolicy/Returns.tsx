import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const Devoluciones = () => {
  const conditions = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: "Productos en perfecto estado",
      description: "Sin abrir, sin daños y con empaque original intacto",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Dentro de 7 días",
      description: "Desde la fecha de compra con comprobante válido",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: "Fecha de vencimiento vigente",
      description: "Productos con al menos 30 días antes del vencimiento",
    },
  ];

  const notAccepted = [
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      title: "Productos perecederos abiertos",
      description: "Snacks, bebidas o alimentos que ya fueron abiertos",
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      title: "Productos vencidos o próximos a vencer",
      description: "Artículos con menos de 30 días de vigencia",
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      title: "Sin comprobante de compra",
      description: "No se aceptan devoluciones sin ticket o boleta",
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      title: "Productos dañados por mal uso",
      description: "Daños causados por el cliente después de la compra",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <RotateCcw className="w-10 h-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Política de Devoluciones
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          En MITINGÜ queremos que estés completamente satisfecho con tu compra.
          Conoce nuestras condiciones para devoluciones.
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 mb-12 border border-yellow-200">
        <div className="flex items-start">
          <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
            <AlertTriangle className="w-7 h-7 text-yellow-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Política Especial para Productos Alimenticios
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Debido a la naturaleza de nuestros productos (alimentos, snacks y
              bebidas), aplicamos políticas especiales de devolución para
              garantizar la seguridad alimentaria y la calidad de nuestros
              productos.
            </p>
          </div>
        </div>
      </div>

      {/* Accepted Returns */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Devoluciones Aceptadas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-green-50 border border-green-100"
            >
              <div className="flex justify-center mb-4">{condition.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {condition.title}
              </h3>
              <p className="text-gray-600 text-sm">{condition.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Not Accepted Returns */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Devoluciones NO Aceptadas
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {notAccepted.map((item, index) => (
            <div
              key={index}
              className="flex items-start p-6 rounded-2xl bg-red-50 border border-red-100"
            >
              <div className="mr-4 flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Return Process */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Proceso de Devolución
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              1
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Verifica las condiciones
            </h4>
            <p className="text-gray-600 text-sm">
              Asegúrate de que tu producto cumple con nuestras condiciones de
              devolución.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              2
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Visita nuestra tienda
            </h4>
            <p className="text-gray-600 text-sm">
              Trae el producto con el comprobante de compra original.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              3
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Evaluación del producto
            </h4>
            <p className="text-gray-600 text-sm">
              Nuestro equipo revisará el estado del producto y validará la
              devolución.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              4
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Reembolso</h4>
            <p className="text-gray-600 text-sm">
              Si se aprueba, procesamos el reembolso en el mismo método de pago.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Tienes dudas sobre una devolución?
        </h2>
        <p className="text-gray-600 mb-6">
          Nuestro equipo está aquí para ayudarte. Contáctanos antes de realizar
          la devolución para aclarar cualquier duda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="text-center">
            <p className="font-semibold text-gray-900">Teléfono</p>
            <p className="text-pink-600">+56 9 1234 5678</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">Email</p>
            <p className="text-pink-600">info@mitingu.cl</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">Horarios</p>
            <p className="text-pink-600">Lun - Sáb: 10AM - 8PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devoluciones;
