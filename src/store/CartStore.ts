import { useAtom } from "jotai";
import { cartAtom, cartOpenAtom } from "./atoms";
import { Product } from "../types";

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== Number(productId))
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        String(item.product.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    openCart,
    closeCart,
  };
};
