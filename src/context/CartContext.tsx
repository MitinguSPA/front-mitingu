// import React, { createContext, useContext, useReducer, useEffect } from "react";
// import { Product, CartItem } from "../types";

// interface CartState {
//   items: CartItem[];
//   isOpen: boolean;
// }

// type CartAction =
//   | { type: "ADD_ITEM"; payload: Product }
//   | { type: "REMOVE_ITEM"; payload: number }
//   | {
//       type: "UPDATE_QUANTITY";
//       payload: { productId: number; quantity: number };
//     }
//   | { type: "TOGGLE_CART" }
//   | { type: "CLOSE_CART" }
//   | { type: "CLEAR_CART" };

// interface CartContextType {
//   cart: CartState;
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   toggleCart: () => void;
//   closeCart: () => void;
//   clearCart: () => void;
//   cartTotal: number;
//   cartItemsCount: number;
//   getProductQuantity: (productId: number) => number;
// }

// const initialState: CartState = {
//   items: [],
//   isOpen: false,
// };

// const loadCartState = (): CartState => {
//   try {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       return JSON.parse(savedCart);
//     }
//   } catch (error) {
//     console.error("Error loading cart from localStorage:", error);
//   }
//   return initialState;
// };

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case "ADD_ITEM": {
//       const existingItem = state.items.find(
//         (item) => item.product.id === action.payload.id
//       );

//       if (existingItem) {
//         return {
//           ...state,
//           items: state.items.map((item) =>
//             item.product.id === action.payload.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           items: [...state.items, { product: action.payload, quantity: 1 }],
//         };
//       }
//     }

//     case "REMOVE_ITEM":
//       return {
//         ...state,
//         items: state.items.filter((item) => item.product.id !== action.payload),
//       };

//     case "UPDATE_QUANTITY":
//       return {
//         ...state,
//         items: state.items
//           .map((item) =>
//             item.product.id === action.payload.productId
//               ? { ...item, quantity: action.payload.quantity }
//               : item
//           )
//           .filter((item) => item.quantity > 0),
//       };

//     case "TOGGLE_CART":
//       return {
//         ...state,
//         isOpen: !state.isOpen,
//       };

//     case "CLOSE_CART":
//       return {
//         ...state,
//         isOpen: false,
//       };

//     case "CLEAR_CART":
//       return {
//         ...state,
//         items: [],
//       };

//     default:
//       return state;
//   }
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, initialState, loadCartState);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const cartTotal = cart.items.reduce(
//     (total, item) => total + item.product.precio * item.quantity,
//     0
//   );

//   const cartItemsCount = cart.items.reduce(
//     (count, item) => count + item.quantity,
//     0
//   );

//   const addToCart = (product: Product) => {
//     dispatch({ type: "ADD_ITEM", payload: product });
//   };

//   const removeFromCart = (productId: number) => {
//     dispatch({ type: "REMOVE_ITEM", payload: productId });
//   };

//   const updateQuantity = (productId: number, quantity: number) => {
//     dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
//   };

//   const toggleCart = () => {
//     dispatch({ type: "TOGGLE_CART" });
//   };

//   const closeCart = () => {
//     dispatch({ type: "CLOSE_CART" });
//   };

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   const getProductQuantity = (productId: number) => {
//     const item = cart.items.find((item) => item.product.id === productId);
//     return item ? item.quantity : 0;
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         toggleCart,
//         closeCart,
//         clearCart,
//         cartTotal,
//         cartItemsCount,
//         getProductQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product, CartItem } from "../types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "UPDATE_PRODUCT_STOCK"; payload: { productId: number; stock: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CLEAR_CART" };

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateProductStock: (productId: number, stock: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  getProductQuantity: (productId: number) => number;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const loadCartState = (): CartState => {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) return JSON.parse(savedCart);
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return initialState;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map(item =>
            item.product.id === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    case "UPDATE_PRODUCT_STOCK":
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, product: { ...item.product, stock: action.payload.stock } }
            : item
        ),
      };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, loadCartState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartTotal = cart.items.reduce(
    (total, item) => total + item.product.precio * item.quantity,
    0
  );

  const cartItemsCount = cart.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const updateProductStock = (productId: number, stock: number) => {
    dispatch({ type: "UPDATE_PRODUCT_STOCK", payload: { productId, stock } });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getProductQuantity = (productId: number) => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateProductStock,
        toggleCart,
        closeCart,
        clearCart,
        cartTotal,
        cartItemsCount,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
