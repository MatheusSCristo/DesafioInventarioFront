import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Sale } from "../../../../types";
import IndividualSaleTable from "./IndividualSaleTable";
import RowPdfButton from "./RowPdfButton";

const columnHelper = createColumnHelper<Sale>();

const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "lastName",
    cell: (info) => <span>#{info.getValue()}</span>,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor("total_price", {
    cell: (info) => (
      <span>
        {info.getValue().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>
    ),
    header: () => <span>Valor Total da Venda</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => (
      <span>{new Date(Date.parse(info.getValue())).toLocaleDateString()}</span>
    ),
    header: () => <span>Data</span>,
  }),
  columnHelper.accessor("discount", {
    cell: (info) => (
      <div className="flex justify-center ">
       <RowPdfButton  Component={IndividualSaleTable} sale={info.row.original}/>
      </div>
    ),
    header: () => <span>Exportar</span>,
  }),
];

const Table = ({ sales }: { sales: Sale[] }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  const tablec = useReactTable({
    data: sales,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
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
      <div className="flex items-center justify-between">
        <span>
          Page {tablec.getState().pagination.pageIndex + 1} of{" "}
          {tablec.getPageCount()}
        </span>
        <div className="flex gap-2">
          <button
            className="btn btn-square"
            onClick={() => tablec.previousPage()}
            disabled={!tablec.getCanPreviousPage()}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 36L18 24L30 12"
                stroke="#1E1E1E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="btn btn-square"
            onClick={() => tablec.nextPage()}
            disabled={!tablec.getCanNextPage()}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 36L30 24L18 12"
                stroke="#1E1E1E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
