// context/cartContext.js
import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = async ({ productId, productName, price, quantity }) => {
    try {
      const response = await fetch("/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, productName, price, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "ADD_TO_CART",
          payload: { productId, productName, price, quantity },
        });
      } else {
        console.error("Failed to add to cart", response.status);
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cartContextValue = useContext(CartContext);
  if (!cartContextValue) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cartContextValue;
};
