import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ProductSold, Sale } from "../../../../../../types";

const columnHelper = createColumnHelper<ProductSold>();

const columns = [
  columnHelper.accessor("quantity_sold", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Quant</span>,
  }),
  columnHelper.accessor("product.name", {
    cell: (info) => <span >{info.getValue()}</span>,
    header: () => <span>Nome</span>,
  }),
  columnHelper.accessor("sale_price", {
    cell: (info) => (
      <span >
        R$
        {info.getValue().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>
    ),
    header: () => <span>Valor Únitario</span>,
  }),
  columnHelper.accessor("sale_price", {
    id: "total",
    cell: (info) => (
      <span>
        R$
        {(
          info.row.original.quantity_sold * info.row.original.sale_price
        ).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </span>
    ),
    header: () => <span>Valor Total</span>,
  }),
];

const IndividualSaleTableTemplate = ({ sale }: { sale: Sale }) => {
  const tablec = useReactTable({
    data: sale.product_sold,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="">
        <thead className="text-black">
          {tablec.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b-[1px] border-black">
              {headerGroup.headers.map((header) => (
                <th key={header.id}  className="text-left">
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
          {tablec.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-none  ">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default IndividualSaleTableTemplate;
