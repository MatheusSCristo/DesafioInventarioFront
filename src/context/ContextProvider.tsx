import React from "react";
import { ProductProvider } from "./ProductContext";
import { SalesProvider } from "./SalesContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SalesProvider>
      <ProductProvider>{children}</ProductProvider>
    </SalesProvider>
  );
};

export default ContextProvider;
