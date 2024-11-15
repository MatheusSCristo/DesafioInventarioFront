import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Sale } from "../../../../../types";


const columnHelper = createColumnHelper<Sale>();

const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "lastName",
    cell: (info) => <span>#{info.getValue()}</span>,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor("total_price", {
    cell: (info) => <span>R$ {info.getValue().toLocaleString("pt-BR",{minimumFractionDigits:2})}</span>,
    header: () => <span>Valor Total da Venda</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => <span>{new Date(Date.parse(info.getValue())).toLocaleDateString("pt-br")}</span>,
    header: () => <span>Data</span>,
  }),
  columnHelper.accessor("createdAt", {
    id: "time",
    cell: (info) => <span>{new Date(Date.parse(info.getValue())).toLocaleTimeString("pt-br")}</span>,
    header: () => <span>Horário</span>,
  }),
];

const SaleTable = ({
  sales,
}: {
  sales: Sale[];
}) => {
  const tablec = useReactTable({
    data:sales,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="table">
        <thead>
          {tablec.getHeaderGroups().map((headerGroup) => (
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
          {tablec.getRowModel().rows.map((row) => (
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
    </>
  );
};

export default SaleTable;
