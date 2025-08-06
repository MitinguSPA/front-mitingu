import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Button from "../UI/Button";
import { formatCurrency } from "../../utils/formatters";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

import Logo from "../../images/logo/LogoSinFondo.png"; 

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, getProductQuantity } = useCart();

  const quantityInCart = getProductQuantity(product.id);
  const outOfStock = product.stock === 0;
  const reachedStockLimit = quantityInCart >= product.stock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (reachedStockLimit) {
      toast.error(`Máximo disponible: ${product.stock}`, {
        className: "toast-custom",
        autoClose: 1500,
      });
      return;
    }

    addToCart(product);
    toast.success(`${product.nombre} agregado al carrito`, {
      className: "toast-custom",
      autoClose: 1000,
    });
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }} // Efecto al tocar en móvil
    >
      <Link
        to={`/product/${product.id}`}
        state={{ product }}
        className="flex flex-col h-full"
      >
        {/* Contenedor de imagen responsive */}
        <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.imagen_link || product.imagen?.url || Logo || "/placeholder-product.png"}
            alt={product.nombre}
            className="object-contain w-full h-full p-4 md:p-6"
            loading="lazy" // Mejor rendimiento en móviles
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
          {/* Badge de stock */}
          {outOfStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sin stock
            </div>
          )}
        </div>

        {/* Contenido responsive */}
        <div className="flex flex-col justify-between flex-grow p-3 sm:p-4">
          <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
              {product.nombre}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-2">
              {product.descripcion_corta}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm sm:text-base font-semibold text-[#DD6E81]">
              {formatCurrency(product.precio)}
            </span>

            <Button
              variant={outOfStock || reachedStockLimit ? "outline" : "primary"}
              onClick={handleAddToCart}
              disabled={outOfStock || reachedStockLimit}
              className={`flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 ${
                outOfStock || reachedStockLimit
                  ? "cursor-not-allowed bg-gray-100 text-gray-500 border-gray-200"
                  : "bg-[#DD6E81] hover:bg-[#c1485c]"
              }`}
            >
              <ShoppingCart size={12} className="sm:size-[14px]" />
              <span className="hidden sm:inline">
                {outOfStock
                  ? "Sin stock"
                  : reachedStockLimit
                  ? `Máx. ${product.stock}`
                  : "Añadir"}
              </span>
              <span className="sm:hidden">
                {outOfStock
                  ? "No"
                  : reachedStockLimit
                  ? product.stock
                  : "+"}
              </span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;