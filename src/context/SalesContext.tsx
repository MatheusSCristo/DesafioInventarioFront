import { createContext, useEffect, useState } from "react";
import { Sale } from "../../types";

type SalesContextType = {
  sales: Sale[];
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
};
const SalesContext = createContext<SalesContextType>({} as SalesContextType);

const SalesProvider = ({ children }: { children: React.ReactNode }) => {
  const [sales, setSales] = useState<Sale[]>([]);


  const getAllSales=async()=>{
    const response = await fetch("http://localhost:5000/api/sale");
    const data = await response.json();
    setSales(data);
  }
  useEffect(()=>{
    getAllSales();
  },[])



  return (
    <SalesContext.Provider value={{ sales, setSales }}>
      {children}
    </SalesContext.Provider>
  );
};

export { SalesContext, SalesProvider };

