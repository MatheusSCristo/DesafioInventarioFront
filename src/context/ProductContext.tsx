import { createContext, useEffect, useState } from "react";
import { Product } from "../../types";

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProductsInStock = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product");
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };
    getAllProductsInStock();
  },[]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

