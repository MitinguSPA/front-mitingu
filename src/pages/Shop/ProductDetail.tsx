import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, ShoppingCart } from "lucide-react";
import Button from "../../components/UI/Button";
import ProductQuantity from "../../components/UI/ProductQuantity";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { socket } from "../../socket";

import Logo from "../../images/logo/LogoSinFondo.png";

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, getProductQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const initialProduct = location.state?.product;
  const [product, setProduct] = useState(initialProduct);
  const productInCart = getProductQuantity(product?.id);
  const maxAddable = product?.stock - (productInCart || 0);

  useEffect(() => {
    if (!initialProduct) navigate("/");
    const handleStockUpdate = ({
      productId,
      stock,
    }: {
      productId: string;
      stock: number;
    }) => {
      if (product?.id === productId) {
        console.log("✅ Coincide con producto actual. Actualizando...");
        setProduct((prev: any) => (prev ? { ...prev, stock } : prev));
        setQuantity((prev) => Math.min(prev, stock));
      }
    };

    socket.on("stockUpdated", handleStockUpdate);

    return () => {
      socket.off("stockUpdated", handleStockUpdate);
    };
  }, [initialProduct, navigate]);

  useEffect(() => {}, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (quantity > maxAddable || maxAddable <= 0) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setQuantity(1);

    toast.success(`${product.nombre} agregado al carrito`, {
      className: "toast-custom",
      autoClose: 1000,
    });
  };

  const handleBuyNow = () => {
    if (quantity > maxAddable || maxAddable <= 0) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setQuantity(1);
    navigate("/checkout");

    toast.success(`${product.nombre} agregado al carrito`, {
      className: "toast-custom",
      autoClose: 1000,
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => (prev < maxAddable ? prev + 1 : prev));
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-secondary-700 hover:text-[#DD6E81] transition-colors mb-6 sm:mb-8"
      >
        <ArrowLeft size={18} className="mr-1" />
        Volver a productos
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden bg-white p-2 sm:p-4 flex items-center justify-center"
        >
          <div className="relative w-full h-full aspect-square max-h-[500px] flex items-center justify-center">
            <img
              src={
                product.imagen_link ||
                product.imagen?.url ||
                Logo ||
                "/placeholder-product.png"
              }
              alt={product.nombre}
              className="w-auto h-auto max-w-full max-h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-product.png";
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-2">
            {product.nombre}
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-secondary-900 mb-4 sm:mb-6">
            {formatCurrency(product.precio)}
          </p>

          <div className="border-t border-b border-secondary-200 py-4 sm:py-6 mb-4 sm:mb-6">
            <p className="text-secondary-700 leading-relaxed text-sm sm:text-base">
              {product.descripcion_corta}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-4">
            Stock disponible: {product.stock}
          </p>

          <div className="mb-6 sm:mb-8">
            <p className="text-secondary-900 font-medium mb-2">Cantidad</p>
            <div className="flex items-center">
              <ProductQuantity
                quantity={quantity}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
              />
            </div>
          </div>

          {quantity >= product.stock && (
            <p className="text-xs sm:text-sm text-red-500 mt-2 mb-4">
              Has alcanzado el máximo disponible.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              disabled={product.stock === 0 || quantity > product.stock}
              className={`flex items-center justify-center ${
                product.stock === 0 || quantity > product.stock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#DD6E81] hover:bg-[#c1485c]"
              }`}
            >
              <ShoppingBag size={20} className="mr-2 bg-transparent" />
              {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              className="bg-transparent border-[#DD6E81] hover:bg-[#c1485c] hover:text-white text-[#DD6E81]"
              onClick={handleBuyNow}
              disabled={product.stock === 0 || quantity > product.stock}
            >
              <ShoppingCart size={20} className="mr-2 bg-transparent" />
              Comprar ahora
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 sm:mt-12 lg:mt-16">
        <div className="border-b border-secondary-200 mb-4 sm:mb-6">
          <div className="flex">
            <span className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-[#DD6E81] border-b-2 border-[#DD6E81]">
              Descripción
            </span>
          </div>
        </div>

        <div className="prose max-w-none text-secondary-700 text-sm sm:text-base">
          <p className="mb-3 sm:mb-4">{product.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
