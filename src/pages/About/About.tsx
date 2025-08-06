import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Users, Heart, ShoppingCart } from "lucide-react";
import Logo from "../../images/logo/LogoSinFondo.png";
import { useNavigate } from "react-router-dom";

const ConfettiEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-[#F4A9B6] text-xl"
        initial={{
          x: Math.random() * window.innerWidth,
          y: -50,
          opacity: 0,
          rotate: Math.random() * 360,
        }}
        animate={{
          y: window.innerHeight,
          opacity: [0, 1, 0],
          x: Math.random() * 100 - 50 + (i % 2 === 0 ? -1 : 1) * 100,
        }}
        transition={{
          duration: 3 + Math.random() * 3,
          delay: Math.random() * 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${10 + Math.random() * 10}px`,
          willChange: "transform, opacity",
        }}
      >
        {["✿", "❀", "✽", "❁", "✦"][Math.floor(Math.random() * 5)]}
      </motion.div>
    ))}
  </div>
);

const steps = [
  {
    title: "Nacimiento de Mitingü",
    description:
      "En un pequeño local en el corazón de la ciudad, nació 'Mitingü', un minimarket coreano lleno de pasión y dedicación.",
  },
  {
    title: "Los primeros pasos",
    description:
      "Con presupuesto limitado, construimos el minimarket desde cero, cuidando cada detalle para reflejar la cultura coreana.",
  },
  {
    title: "Crecimiento y expansión",
    description:
      "Mitingü se convirtió en un punto de encuentro para amantes de la cultura coreana, expandiendo su variedad de productos.",
  },
  {
    title: "Productos y servicios",
    description:
      "Ofrecemos productos auténticos: kimchi, ramen, bebidas, además de servicios como pedidos online y entrega a domicilio.",
  },
  {
    title: "Logros y reconocimientos",
    description:
      "Tras años de esfuerzo, Mitingü es reconocido como uno de los mejores minimarkets coreanos, ganando la confianza de miles.",
  },
  {
    title: "Mirando al futuro",
    description:
      "Seguimos innovando para compartir la cultura coreana con nuestra comunidad y crecer cada día más.",
  },
];

const tabsContent = {
  origen: (
    <>
      <p className="mb-4">
        Somos una tienda apasionada por ofrecer productos de alta calidad que
        llenen de alegría y emoción a nuestros clientes. Con una dedicación
        constante a la excelencia, nos esforzamos por brindar una experiencia de
        compra única y personalizada. Por eso creemos que en Mitingü cada
        producto cuenta su propia historia.
      </p>
      <p className="mb-4">
        Nuestra tienda nació con el objeto de ofrecer experiencias únicas a
        nuestros clientes. En un pequeño local en el corazón de la ciudad, nació
        "Mitingü", un minimarket coreano que ha conquistado el corazón de muchos
        con su variedad de productos y dedicación. Fundado hace tres años, este
        minimarket es el resultado de años de esfuerzo y pasión.
      </p>
      <p className="mb-4">
        El sueño comienza con una profunda pasión por la cultura coreana y un
        sueño de compartirla con la comunidad. Después de meses de investigación
        y planificación, finalmente encontramos el local perfecto para hacer
        realidad nuestro sueño.
      </p>
    </>
  ),
  crecimiento: (
    <>
      <p className="mb-4">
        Con un presupuesto limitado y mucho trabajo manual, comenzamos a
        construir el minimarket desde cero. Desde la decoración hasta la
        selección de productos, todo fue cuidadosamente planeado para reflejar
        la esencia de la cultura coreana. El minimarket abrió sus puertas con
        una variedad de productos coreanos auténticos, desde kimchi hasta snacks
        y bebidas.
      </p>
      <p className="mb-4">
        A medida que pasaban los meses, "Mitingü" comenzó a crecer y expandirse.
        El minimarket se convirtió en un punto de encuentro para aquellos que
        buscan productos coreanos auténticos. Continuamos innovando y agregando
        nuevos productos y servicios, lo que ayudó a mantener a los clientes
        satisfechos y atraer a nuevos.
      </p>
    </>
  ),
  futuro: (
    <>
      <p className="mb-4">
        Después de tres años de arduo trabajo, "Mitingü" ha logrado establecerse
        como uno de los mejores minimarkets coreanos de la ciudad. El minimarket
        ha recibido reconocimientos y reseñas positivas de clientes y críticos,
        lo que ha ayudado a aumentar su visibilidad y atraer a más clientes.
      </p>
      <p className="mb-4">
        A medida que "Mitingü" continúa creciendo y evolucionando, nosotros
        seguiremos comprometidos con la misión de compartir la cultura coreana
        con la comunidad. Con planes para expandir el minimarket y ofrecer más
        productos y servicios, "Mitingü" está lista para seguir conquistando el
        corazón de muchos más.
      </p>
      <p className="mb-4">
        Innovamos constantemente nuestros productos para sorprender y deleitar,
        explora nuestros productos y descubre cómo podemos ayudarte a encontrar
        lo que buscas. ¡Estamos emocionados de conocerte y compartir la misma
        pasión por la calidad!
      </p>
    </>
  ),
};

const TimelineItem = ({ title, description, isVisible }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12 flex z-0"
    >
      <div className="flex flex-col items-center mr-6">
        <div className="bg-[#DD6E81] text-white p-4 rounded-full shadow-lg w-12 h-12 flex items-center justify-center font-bold text-lg">
          ✓
        </div>
        <div className="w-1 bg-[#DD6E81] flex-grow mt-2"></div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#DD6E81] mb-2">{title}</h3>
        <p className="text-gray-700 max-w-xl">{description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [activeTab, setActiveTab] = useState<
    "origen" | "crecimiento" | "futuro"
  >("origen");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-screen -translate-y-20">
      {/* Parte 1: Encabezado */}
      <section className="relative bg-gradient-to-b from-[#F4A9B6] to-white py-24 px-6 text-center overflow-hidden z-20">
        <ConfettiEffect />
        <img
          src={Logo}
          alt="Logo Mitingü"
          className="mx-auto w-40 mb-6 drop-shadow-lg"
        />
        <motion.h1
          className="text-5xl font-extrabold text-[#DD6E81] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          MITINGÜ ^_^
        </motion.h1>
        <motion.p
          className="text-xl max-w-3xl mx-auto text-[#DD6E81]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Trayectoria, pasión y productos auténticos para tu experiencia
          asiática.
        </motion.p>
      </section>

      {/* Parte 2: Historia con tabs y timeline */}
      <section
        ref={ref}
        className="py-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 md:gap-20"
      >
        {/* Tabs Texto arriba o izquierda */}
        <div className="order-1 md:order-1 mb-12 md:mb-0">
          {/* Tabs Headers */}
          <div className="flex justify-center md:justify-start mb-8 space-x-4 border-b border-[#DD6E81] overflow-x-auto scrollbar-thin scrollbar-thumb-[#DD6E81]/50 scrollbar-track-transparent">
            {["origen", "crecimiento", "futuro"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`whitespace-nowrap px-4 sm:px-6 py-3 font-semibold text-base sm:text-lg ${
                  activeTab === tab
                    ? "border-b-4 border-[#DD6E81] text-[#DD6E81]"
                    : "text-gray-500 hover:text-[#DD6E81] transition-colors"
                }`}
                aria-selected={activeTab === tab}
                role="tab"
                type="button"
              >
                {tab === "origen"
                  ? "Origen"
                  : tab === "crecimiento"
                  ? "Crecimiento"
                  : "Futuro"}
              </button>
            ))}
          </div>

          {/* Tabs Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0"
            style={{ wordBreak: "break-word" }}
          >
            {tabsContent[activeTab]}
          </motion.div>
        </div>

        {/* Timeline debajo o a la derecha */}
        <div className="order-2 md:order-2 max-w-2xl mx-auto md:mx-0">
          {steps.map((step, idx) => (
            <TimelineItem
              key={idx}
              title={step.title}
              description={step.description}
              isVisible={isInView}
            />
          ))}
        </div>
      </section>

      {/* Parte 3: Referencias / lo que ofrecemos */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#DD6E81] mb-12">
          Lo que ofrecemos
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Package size={40} className="mx-auto mb-4 text-[#DD6E81]" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-[#DD6E81]">
              Productos auténticos
            </h3>
            <p>
              Kimchi, ramen, snacks, bebidas y más, directamente importados y
              seleccionados con cuidado.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              <Users size={40} className="mx-auto mb-4 text-[#DD6E81]" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-[#DD6E81]">
              Clientes felices
            </h3>
            <p>
              Miles de clientes satisfechos que confían en nosotros para sus
              antojos y eventos.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              <Heart size={40} className="mx-auto mb-4 text-[#DD6E81]" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-[#DD6E81]">
              Pasión y calidad
            </h3>
            <p>
              Cada producto y servicio con el compromiso de excelencia que nos
              caracteriza.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#DD6E81]">
            ¿Listo para descubrir Mitingü?
          </h2>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto">
            Explora nuestra tienda y déjate sorprender por sabores únicos y
            productos de calidad.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center px-8 py-3 bg-[#DD6E81] text-white rounded-lg font-semibold hover:bg-[#c1485c] transition"
          >
            <ShoppingCart className="mr-3" size={20} /> Comprar ahora
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
