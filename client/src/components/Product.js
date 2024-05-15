// components/Product.js
import React from "react";
import { useCart } from "./utils/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart(product._id, 1);
  };

  return (
    <div>
      {/* <h3>{product.name}</h3> */}
      {/* <p>{product.price}</p> */}
      {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
    </div>
  );
};

export default Product;
