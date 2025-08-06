import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatters";
import { socket } from "../../socket";

const Cart: React.FC = () => {
  const {
    cart,
    toggleCart,
    closeCart,
    cartTotal,
    cartItemsCount,
    updateProductStock,
  } = useCart();

  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cart.isOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cart.isOpen, closeCart]);

  useEffect(() => {
    if (cart.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cart.isOpen]);

  useEffect(() => {
    const handleStockUpdate = ({
      productId,
      stock,
    }: {
      productId: string;
      stock: number;
    }) => {
      updateProductStock(productId, stock);
    };

    socket.on("stockUpdated", handleStockUpdate);

    return () => {
      socket.off("stockUpdated", handleStockUpdate);
    };
  }, [updateProductStock]);

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      <AnimatePresence>
        {cart.isOpen && (
          <motion.div
            className="fixed inset-0 bg-secondary-900/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed inset-y-0 right-0 max-w-md w-full transform transition-transform duration-250 ease-in-out z-50 ${
          cart.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={cartRef}
      >
        <motion.div
          className="flex flex-col h-full bg-white shadow-lg"
          initial={{ x: "100%" }}
          animate={{ x: cart.isOpen ? 0 : "100%" }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <div className="flex items-center justify-between p-4 border-b border-secondary-100">
            <div className="flex items-center">
              <ShoppingBag className="text-[#DD6E81] mr-2" size={20} />
              <h2 className="text-lg font-medium">
                Su carrito ({cartItemsCount})
              </h2>
            </div>
            <button
              onClick={toggleCart}
              className="p-1 rounded-full hover:bg-secondary-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <ShoppingBag className="text-secondary-300 mb-4" size={64} />
                <h3 className="text-xl font-medium text-secondary-900 mb-2">
                  Su carrito está vacío
                </h3>
                <p className="text-secondary-500 mb-6">
                  Parece que aún no has añadido ningún producto a tu carrito.
                </p>
                <Button
                  className="bg-[#DD6E81] hover:bg-[#c1485c]"
                  onClick={closeCart}
                >
                  Seguir comprando
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                {cart.items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </AnimatePresence>
            )}
          </div>

          {cart.items.length > 0 && (
            <div className="p-4 border-t border-secondary-100 bg-secondary-50">
              <div className="flex justify-between mb-4 text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <Button
                className="bg-[#DD6E81] hover:bg-[#c1485c]"
                fullWidth
                onClick={handleCheckout}
                disabled={cartTotal <= 0}
              >
                Proceder al pago
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Cart;