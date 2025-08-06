import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import ProductQuantity from "../UI/ProductQuantity";
import { formatCurrency } from "../../utils/formatters";
import { CartItem as CartItemType } from "../../types";
import { toast } from "react-toastify";
import Logo from "../../images/logo/LogoSinFondo.png";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrease = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    } else {
      toast.warning(`Solo hay ${product.stock} unidades disponibles`, {
        autoClose: 1000,
        className: "toast-custom",
      });
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <motion.div
      className="flex py-4 border-b border-secondary-100 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <img
          src={product.imagen_link ? product.imagen_link : product.imagen?.url || Logo}
          alt={product.nombre}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium text-secondary-900 line-clamp-1">
            {product.nombre}
          </h4>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-secondary-400 hover:text-error-500 transition-colors"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-sm text-secondary-500 mb-2">
          {formatCurrency(product.precio)}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <ProductQuantity
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              size="sm"
            />
            <span className="text-xs text-secondary-500 mt-1">
              Disponibles: {product.stock}
            </span>
          </div>
          <p className="font-medium text-secondary-900">
            {formatCurrency(product.precio * quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;