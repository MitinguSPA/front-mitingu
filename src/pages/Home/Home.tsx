import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  ShieldCheck,
  MapPin,
  ShoppingCart,
  ChevronRight,
  Clock,
  Users,
  Heart,
  Package,
} from "lucide-react";
import Button from "../../components/UI/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/Product";
import { Product } from "../../types";

import Logo from "../../images/logo/LogoSinFondo.png";

import video1 from "../../images/reels/mitangu1.mp4";
import video2 from "../../images/reels/mitangu2.mp4";
import video3 from "../../images/reels/mitangu3.mp4";
import video4 from "../../images/reels/mitangu4.mp4";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const WinkingLogo = () => {
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWinking((prev) => !prev);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className="inline-block "
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      MITINGÜ{" "}
      <span className="relative">
        <AnimatePresence mode="wait">
          {!isWinking ? (
            <motion.span
              key="normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ^_^
            </motion.span>
          ) : (
            <motion.span
              key="winking"
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
            >
              ^_−☆
            </motion.span>
          )}
        </AnimatePresence>

        {isWinking && (
          <motion.span
            className="absolute -right-2 -top-2 text-yellow-300 text-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            ✨
          </motion.span>
        )}
      </span>
    </motion.span>
  );
};

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [autoPlay, setAutoPlay] = useState(true);

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [productSlides, setProductSlides] = useState<Product[]>([]);

  const [videoIndex, setVideoIndex] = useState(0);
  const [videoSlides, setVideoSlides] = useState<any[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const firstFive = products.slice(0, 5);
      setProductSlides([...firstFive, firstFive[0]]);
    }
  }, [products]);

  const goToNextProduct = useCallback(() => {
    setCurrentProductIndex((prev) => {
      if (prev >= productSlides.length - 2) {
        setTimeout(() => {
          setCurrentProductIndex(0);
        }, 50);
        return prev + 1;
      }
      return prev + 1;
    });
  }, [productSlides.length]);

  useEffect(() => {
    if (!autoPlay || productSlides.length <= 1) return;

    const interval = setInterval(() => {
      goToNextProduct();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, goToNextProduct, productSlides.length]);

  const productSlideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const localVideos = [
      {
        id: 1,
        title: "Nuestros productos destacados",
        description: "Descubre lo mejor de nuestra tienda",
        videoUrl: video1,
      },
      {
        id: 2,
        title: "Visita nuestra tienda",
        description: "Conoce nuestro local en Talagante",
        videoUrl: video2,
      },
      {
        id: 3,
        title: "Visita nuestra tienda",
        description: "Conoce nuestro local en Talagante",
        videoUrl: video3,
      },
      {
        id: 4,
        title: "Visita nuestra tienda",
        description: "Conoce nuestro local en Talagante",
        videoUrl: video4,
      },
    ];

    if (localVideos.length > 0) {
      setVideoSlides([...localVideos, localVideos[0]]);
    }
  }, []);

  useEffect(() => {
    if (videoSlides.length <= 1) return;

    const interval = setInterval(() => {
      setVideoIndex((prev) => {
        if (prev >= videoSlides.length - 2) {
          setTimeout(() => {
            setVideoIndex(0);
          }, 50);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [videoSlides.length]);

  const featuredProducts = products.slice(0, 4);

  const formatCLP = (amount: number): string => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

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

  return (
    <div className="min-h-screen relative -translate-y-20">
      <section className="relative pt-20 bg-gradient-to-b from-[#F4A9B6] to-white overflow-hidden">
        <ConfettiEffect />
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-8 items-center">
            <div className="max-w-xl text-center md:text-left">
              <motion.img
                src={Logo}
                alt="Logo Mitingu"
                className="mx-auto md:mx-0 w-32 sm:w-40 md:w-48 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#DD6E81]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WinkingLogo />
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg mb-8 text-[#DD6E81]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Snack, bebidas y productos Asiáticos!!🍜🥟
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row sm:justify-center md:justify-start sm:space-x-4 space-y-4 sm:space-y-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  variant="accent"
                  size="lg"
                  className="bg-[#DD6E81] hover:bg-[#c1485c] w-full sm:w-auto z-20"
                  onClick={() => navigate("/shop")}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Comprar ahora
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#DD6E81] text-[#DD6E81] hover:bg-[#DD6E81] hover:text-white w-full sm:w-auto z-20"
                  onClick={() => navigate("/about")}
                >
                  Sobre Nosotros
                </Button>
              </motion.div>
            </div>

            <div className="relative h-64 sm:h-80 md:h-[400px] w-full md:block overflow-hidden z-20">
              <AnimatePresence custom={currentProductIndex} initial={false}>
                {productSlides.length > 0 && (
                  <motion.div
                    key={currentProductIndex}
                    className="absolute inset-0 flex items-center justify-center rounded-lg bg-white"
                    variants={productSlideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={currentProductIndex}
                  >
                    <img
                      src={
                        productSlides[
                          currentProductIndex % productSlides.length
                        ]?.imagen_link ||
                        productSlides[
                          currentProductIndex % productSlides.length
                        ]?.imagen?.url || Logo ||
                        "/placeholder-product.png"
                      }
                      alt={
                        productSlides[
                          currentProductIndex % productSlides.length
                        ]?.nombre || "Producto"
                      }
                      className="max-w-full max-h-full object-contain"
                      loading="eager"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-product.png";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 rounded-b-lg">
                      <h3 className="text-white text-lg sm:text-xl font-semibold">
                        {
                          productSlides[
                            currentProductIndex % productSlides.length
                          ]?.nombre
                        }
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white mr-2">
                          $
                          {formatCLP(
                            productSlides[
                              currentProductIndex % productSlides.length
                            ]?.precio
                          )}
                        </span>
                        <button
                          className="bg-[#DD6E81] text-white px-3 py-1 rounded-md text-sm hover:bg-[#c1485c]"
                          onClick={() => navigate("/shop")}
                        >
                          Ver más
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {products.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentProductIndex(index);
                      setAutoPlay(false);
                      setTimeout(() => setAutoPlay(true), 10000);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentProductIndex % (productSlides.length - 1)
                        ? "bg-[#DD6E81] w-6"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: TrendingUp,
                title: "Calidad Premium",
                description:
                  "Deliciosos productos de comida asiática, traídos directamente para ofrecer una experiencia auténtica.",
              },
              {
                icon: MapPin,
                title: "Visítanos",
                description: (
                  <>
                    Av. Bernando O'Higgins 1065, Talagante, Región Metropolitana
                    <br />
                    <span className="font-medium">No realizamos envíos</span>
                  </>
                ),
              },
              {
                icon: ShieldCheck,
                title: "Pago seguro",
                description:
                  "Compre con confianza utilizando nuestro procesamiento de pagos seguro y protección de datos.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-white hover:bg-[#F4A9B6]/10 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#ecb1b1] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-[#ffff]" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <div className="text-gray-600">{feature.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#f9f9f9]">
        <div className="container-pad mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary-900 mb-2">
              Productos destacados
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Los productos más populares de nuestra tienda
            </p>
          </div>

          <motion.div
            key={featuredProducts.length}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <div className="flex flex-col items-center text-center m-8">
            <Button
              variant="outline"
              className="flex items-center border-[#DD6E81] text-[#DD6E81] hover:bg-[#DD6E81] hover:text-white"
              onClick={() => navigate("/shop")}
            >
              Ver más productos <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#DD6E81] mb-6">
                Nuestra Historia
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                En el corazón de Talagante, nació{" "}
                <span className="font-bold text-[#DD6E81]">Mitingü</span> con
                una misión: traer los sabores auténticos de Asia a nuestra
                comunidad.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Desde nuestros inicios, nos hemos dedicado a seleccionar
                cuidadosamente los mejores snacks, bebidas y productos asiáticos
                para ofrecer una experiencia única a nuestros clientes.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="bg-[#F4A9B6]/20 rounded-lg p-4 text-center w-32">
                  <Package className="text-[#DD6E81] mx-auto mb-2" size={32} />
                  <p className="text-[#DD6E81] font-bold">+500</p>
                  <p className="text-[#DD6E81] text-sm">Productos</p>
                </div>
                <div className="bg-[#F4A9B6]/20 rounded-lg p-4 text-center w-32">
                  <Users className="text-[#DD6E81] mx-auto mb-2" size={32} />
                  <p className="text-[#DD6E81] font-bold">+2,000</p>
                  <p className="text-[#DD6E81] text-sm">Clientes</p>
                </div>
                <div className="bg-[#F4A9B6]/20 rounded-lg p-4 text-center w-32">
                  <Heart className="text-[#DD6E81] mx-auto mb-2" size={32} />
                  <p className="text-[#DD6E81] font-bold">100%</p>
                  <p className="text-[#DD6E81] text-sm">Pasión</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden h-[550px] lg:h-[600px] w-[350px] lg:w-[450px] mx-auto"
            >
              <AnimatePresence custom={videoIndex}>
                {videoSlides.length > 0 && (
                  <motion.div
                    key={videoIndex}
                    className="relative flex-shrink-0 w-full h-full rounded-xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source
                        src={
                          videoSlides[videoIndex % videoSlides.length]?.videoUrl
                        }
                        type="video/mp4"
                      />
                      Tu navegador no soporta videos HTML5
                    </video>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold">
                        {videoSlides[videoIndex % videoSlides.length]?.title}
                      </h3>
                      <p className="text-white text-sm">
                        {
                          videoSlides[videoIndex % videoSlides.length]
                            ?.description
                        }
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                className="p-6 md:p-8 h-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#DD6E81] mb-4">
                      Visítanos en nuestra tienda física
                    </h2>
                    <div className="flex items-start mb-4">
                      <MapPin
                        className="text-[#DD6E81] mr-3 flex-shrink-0"
                        size={24}
                      />
                      <p className="text-gray-700 text-lg">
                        Boulevard del centro, Talagante: local 115.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-t from-[#F4A9B6] to-[#FBDCE1] rounded-lg p-5 mb-6">
                    <p className="text-xl font-bold text-[#DD6E81] mb-3 flex items-center">
                      <span className="mr-2">🍜🥟</span>
                      Snack, bebidas y productos Asiáticos!!
                    </p>
                    <div className="flex items-center mb-2">
                      <Clock className="text-white mr-2" size={20} />
                      <span className="text-white font-medium">
                        Lun-sab: 10hrs-20hrs
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-white mr-2" size={20} />
                      <span className="text-white font-medium">
                        Dom: 10hrs-17hrs
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="overflow-hidden h-full rounded-2xl border-4 border-[#F4A9B6] shadow-lg relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#F4A9B6] rounded-br-full z-10"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F4A9B6] rounded-bl-full z-10"></div>
                <div className="p-4 text-center bg-[#F4A9B6]">
                  <p className="font-medium text-white mb-2 flex items-center justify-center">
                    <MapPin className="mr-2" size={20} />
                    Av. Bernando O'Higgins 1065, Talagante
                    <motion.span
                      className="ml-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🗺️
                    </motion.span>
                  </p>
                </div>
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.1519678332037!2d-70.93143632407046!3d-33.42129667357242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c0b6a3c0d8a1%3A0x4c5e6a4e8f4a5a5b!2sAv.%20Bernardo%20O%27Higgins%201065%2C%20Talagante%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1697662675189!5m2!1ses!2scl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="min-h-[350px]"
                  ></iframe>
                </div>

                <div className="p-4 text-center bg-[#F4A9B6]">
                  <motion.p
                    className="text-white font-medium flex items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ¡Ven a visitarnos! 🛍️
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
