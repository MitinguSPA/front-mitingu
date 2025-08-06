import { Link } from "react-router-dom";
import Logo from "../../images/logo/logo-sinfondo.png";
import {
  Heart,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Clock,
  Star,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  const customerLinks = [
    { label: "Centro de Ayuda", to: "/help-center" },
    { label: "Política de Envíos", to: "/shipping-policy" },
    { label: "Devoluciones", to: "/returns" },
    { label: "Términos y Condiciones", to: "/terms-conditions" },
    { label: "Privacidad", to: "/privacy" },
  ];

  return (
    <footer className="relative from-white to-[#F4A9B6] bg-gradient-to-b overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <img src={Logo} alt="Logo" className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-pink-600">MITINGÚ</h3>
                  <p className="text-sm text-gray-500">ㄱ-ᄆ</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Snacks, bebidas y productos Asiáticos🍜. Ofrecemos productos
                auténticos de la más alta calidad.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: Instagram,
                    color: "hover:text-pink-500",
                    bg: "hover:bg-pink-50",
                    href: "https://www.instagram.com/mitinguspa1/",
                  },
                  {
                    icon: Twitter,
                    color: "hover:text-blue-500",
                    bg: "hover:bg-blue-50",
                    href: "https://x.com/mitinguspa1",
                  },
                  {
                    icon: Facebook,
                    color: "hover:text-blue-600",
                    bg: "hover:bg-blue-50",
                    href: "https://www.facebook.com/profile.php?id=615732000000000",
                  },
                ].map(({ icon: Icon, color, bg, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-white rounded-lg shadow-sm ${bg} ${color} transition-all duration-300 transform hover:scale-110 border border-pink-100`}
                  >
                    <Icon className="w-4 h-4 text-gray-600" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Productos
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Snacks Japoneses",
                  "Bebidas Coreanas",
                  "Dulces Asiáticos",
                  "Ramen & Noodles",
                  "Productos Destacados",
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to="/shop"
                      className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
                Atención al Cliente
              </h4>
              <ul className="space-y-2 text-sm">
                {customerLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                Contacto
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">
                      Av. Bernando O'Higgins 1065,
                    </p>
                    <p className="text-gray-500">Talagante, Santiago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-pink-500" />
                  <p className="text-gray-600">+52 (33) 1234-5678</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-pink-500" />
                  <p className="text-gray-600">contacto.mitingu@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-pink-500" />
                  <p className="text-gray-600">Lun - Dom: 9:00 - 21:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Star,
                title: "Calidad Premium",
                description: "Productos auténticos seleccionados",
              },
              {
                icon: Heart,
                title: "Visitanos",
                description: "Tienda física en Tlaquepaque",
              },
              {
                icon: Sparkles,
                title: "Pago Seguro",
                description: "Transacciones 100% protegidas",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-pink-100"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <item.icon
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-xs">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-pink-200 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  © {new Date().getFullYear()} {""}
                  <span className="font-semibold text-pink-600">MITINGÚ</span>
                </span>
                <span className="hidden md:block">•</span>
                <span>Todos los derechos reservados</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <Link
                  to="/terms-conditions"
                  className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
                >
                  Términos
                </Link>
                <Link
                  to="/shipping-policy"
                  className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
                >
                  Privacidad
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
