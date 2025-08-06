import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Logo from "../../images/logo/logo-sinfondo.png";

const Header: React.FC = () => {
  const { cart, toggleCart, cartItemsCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Comprar", path: "/shop" },
    { name: "Sobre Nosotros", path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-250 mb-20 ${
        location.pathname === "/"
          ? isScrolled
            ? "bg-transparent py-2"
            : "bg-transparent py-4"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-pad mx-auto max-w-5xl">
        <div
          className={`bg-white/80 backdrop-blur-lg border-2 border-[#F4A9B6] rounded-full px-6 py-3 shadow-sm ${
            isScrolled ? "shadow-md" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-primary-700">
              <img src={Logo} className="w-9 h-9" />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-[#c1485c] ${
                    location.pathname === link.path
                      ? "text-[#DD6E81]"
                      : "text-secondary-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button
                className="relative text-secondary-700 hover:text-[#c1485c] transition-colors p-1 rounded-full hover:bg-white/50"
                onClick={toggleCart}
                aria-label="Shopping cart"
              >
                <ShoppingBag size={18} />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#c1485c] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium"
                  >
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </motion.span>
                )}
              </button>

              <button
                className="md:hidden text-secondary-700 hover:text-primary-600 transition-colors p-1 rounded-full hover:bg-white/50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2"
          >
            <nav className="bg-white rounded-lg shadow-lg py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-50 ${
                    location.pathname === link.path
                      ? "text-[#DD6E81]"
                      : "text-secondary-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;



// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import Logo from "../../images/logo/logo-sinfondo.png";
// import { getCategories } from "../../services/Categori";

// const Header: React.FC = () => {
//   const { cartItemsCount, toggleCart } = useCart();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

// useEffect(() => {
//   getCategories()
//     .then((data) => {
//       console.log("Categorías recibidas:", data);
//       setCategories(data.data || []);
//     })
//     .catch((error) => console.error("Error al cargar categorías", error));
// }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (location.pathname === "/") {
//         setIsScrolled(window.scrollY > 0);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [location.pathname]);

//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location]);

//   const handleCategoryClick = (categoria: string) => {
//     navigate(`/shop?categoria=${encodeURIComponent(categoria)}`);
//     setShowCategories(false);
//   };

//   const navLinks = [
//     { name: "Inicio", path: "/" },
//     { name: "Sobre Nosotros", path: "/about" },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-20 transition-all duration-250 mb-20 ${
//         location.pathname === "/" && !isScrolled
//           ? "bg-transparent py-4"
//           : "bg-transparent py-2"
//       }`}
//     >
//       <div className="container-pad mx-auto max-w-5xl">
//         <div className="bg-white/80 backdrop-blur-lg border-2 border-[#F4A9B6] rounded-full px-6 py-3 shadow-sm">
//           <div className="flex items-center justify-between">
//             <Link to="/">
//               <img src={Logo} className="w-9 h-9" />
//             </Link>

//             <nav className="hidden md:flex items-center space-x-6 relative">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`text-sm font-medium transition-colors hover:text-[#c1485c] ${
//                     location.pathname === link.path
//                       ? "text-[#DD6E81]"
//                       : "text-secondary-700"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}

//               <div
//                 className="relative"
//                 onMouseEnter={() => setShowCategories(true)}
//                 onMouseLeave={() => setShowCategories(false)}
//               >
//                 <button
//                   className={`text-sm font-medium flex items-center gap-1 transition-colors hover:text-[#c1485c] ${
//                     location.pathname.startsWith("/shop")
//                       ? "text-[#DD6E81]"
//                       : "text-secondary-700"
//                   }`}
//                 >
//                   Comprar <ChevronDown size={14} />
//                 </button>

//                 <AnimatePresence>
//                   {showCategories && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -5 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -5 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute top-full mt-2 left-0 bg-white border rounded-md shadow-md z-50 w-48"
//                     >
//                       {categories.length > 0 ? (
//                         categories.map((cat: any) => {
//                           const nombre = cat?.nombre;
//                           if (!nombre) return null;

//                           return (
//                             <button
//                               key={cat.id}
//                               onClick={() => handleCategoryClick(nombre)}
//                               className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                             >
//                               {nombre}
//                             </button>
//                           );
//                         })
//                       ) : (
//                         <p className="px-4 py-2 text-sm text-gray-400">
//                           Sin categorías
//                         </p>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </nav>

//             <div className="flex items-center space-x-3">
//               <button
//                 className="relative text-secondary-700 hover:text-[#c1485c] transition-colors p-1 rounded-full hover:bg-white/50"
//                 onClick={toggleCart}
//               >
//                 <ShoppingBag size={18} />
//                 {cartItemsCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute -top-1 -right-1 bg-[#c1485c] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium"
//                   >
//                     {cartItemsCount > 9 ? "9+" : cartItemsCount}
//                   </motion.span>
//                 )}
//               </button>

//               <button
//                 className="md:hidden text-secondary-700 hover:text-primary-600 transition-colors p-1 rounded-full hover:bg-white/50"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </header>
//   );
// };

// export default Header;
