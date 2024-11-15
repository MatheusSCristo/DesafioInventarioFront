import {
  createColumnHelper
} from "@tanstack/react-table";
import { useContext } from "react";
import { Product } from "../../../types";
import { ProductContext } from "../../context/ProductContext";
import SimpleTable from "../../utils/SimpleTable";

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <span>#{info.getValue()}</span>,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Nome</span>,
  }),
  columnHelper.accessor("all_time_quantity", {
    cell: (info) => (
      <span>{info.getValue() - info.row.original.quantity_available}</span>
    ),
    header: () => <span>Quantidade Vendida</span>,
  }),
  columnHelper.accessor("quantity_available", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Quantidade Disponível</span>,
  }),
];



const sortProducts=(products:Product[])=>{
    return products.sort((a,b)=>(b.all_time_quantity-b.quantity_available)-(a.all_time_quantity - a.quantity_available))
}


const MostSoldProductsDashboard = () => {
  const { products } = useContext(ProductContext);
  

  return (
    <div className="bg-white p-5 rounded-md flex flex-col gap-5 ">
      <h1 className="font-semibold text-xl">Produtos Mais Vendidos</h1>
        <SimpleTable data={sortProducts(products).slice(0,5)} columns={columns} />
    </div>
  );
};

export default MostSoldProductsDashboard;
