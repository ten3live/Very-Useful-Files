import React, {createContext, useState} from 'react';

export const CartContext = createContext();

export default function CartProvider({children}) {
  const [products, setProducts] = useState([]);

  const addProduct = product => {
    setProducts([...products, product]);
  };

  const removeProduct = productId => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const updateProduct = updatedProduct => {
    setProducts(
      products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{products, addProduct, removeProduct, updateProduct}}>
      {children}
    </CartContext.Provider>
  );
}
