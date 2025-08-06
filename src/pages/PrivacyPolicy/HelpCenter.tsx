import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";

const CentroAyuda = () => {
  const faqs = [
    {
      question: "¿Cuáles son los horarios de atención?",
      answer:
        "Nuestro horario de atención es de Lunes a Sábado de 10:00 AM a 8:00 PM. Los domingos permanecemos cerrados.",
    },
    {
      question: "¿Hacen envíos a domicilio?",
      answer:
        "No realizamos envíos a domicilio. Solo atendemos en nuestra tienda física ubicada en Av. Bernando O'Higgins 1065, Talagante.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos efectivo, tarjetas de débito, tarjetas de crédito y transferencias bancarias.",
    },
    {
      question: "¿Los productos tienen fecha de vencimiento?",
      answer:
        "Sí, todos nuestros productos tienen fecha de vencimiento claramente indicada. Garantizamos la frescura y calidad de todos nuestros artículos.",
    },
    {
      question: "¿Puedo hacer pedidos por adelantado?",
      answer:
        "Sí, puedes llamarnos o visitarnos para hacer pedidos especiales por adelantado, especialmente para productos específicos o cantidades grandes.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-10 h-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Centro de Ayuda
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ¿Necesitas ayuda? Aquí encontrarás respuestas a las preguntas más
          frecuentes y formas de contactarnos.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-100 hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Visítanos
          </h3>
          <p className="text-gray-600">Av. Bernardo O'Higgins 1065</p>
          <p className="text-gray-600">Talagante, Región Metropolitana</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-100 hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Llámanos</h3>
          <p className="text-gray-600">+56 9 1234 5678</p>
          <p className="text-sm text-gray-500">Lun - Sáb: 10AM - 8PM</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-100 hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Escríbenos
          </h3>
          <p className="text-gray-600">info@mitingu.cl</p>
          <p className="text-sm text-gray-500">Respuesta en 24h</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-pink-100 pb-6 last:border-b-0"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                <MessageCircle className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                {faq.question}
              </h3>
              <p className="text-gray-600 ml-8 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="mt-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-pink-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Horarios de Atención
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Lunes a Sábado:</span> 10:00 AM -
            8:00 PM
          </p>
          <p>
            <span className="font-semibold">Domingo:</span> Cerrado
          </p>
        </div>
      </div>
    </div>
  );
};

export default CentroAyuda;
