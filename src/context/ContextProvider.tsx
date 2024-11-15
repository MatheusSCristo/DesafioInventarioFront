import React from "react";
import { SalesProvider } from "./SalesContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <SalesProvider>{children}</SalesProvider>;
};

export default ContextProvider;
