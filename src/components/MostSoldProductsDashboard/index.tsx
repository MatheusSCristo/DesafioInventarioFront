import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext } from "react";
import { Product } from "../../../types";
import { ProductContext } from "../../context/ProductContext";

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
  const table = useReactTable({
    data: sortProducts(products).slice(0, 5),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white p-5 rounded-md flex flex-col gap-5 ">
      <h1 className="font-semibold text-xl">Produtos Mais Vendidos</h1>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-center">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostSoldProductsDashboard;
