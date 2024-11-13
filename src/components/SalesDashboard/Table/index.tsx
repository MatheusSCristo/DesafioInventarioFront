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

const sales: Sale[] = [
  {
    id: 4122,
    total_price: 2500,
    createdAt: new Date(),
    discount: 30,
    product_sold: [
      {
        id: 1,
        product_id: 1,
        sale_price: 500,
        quantity_sold: 2,
        product: {
          id: 1,
          name: "product1",
          purchase_price: 200,
          category: "category1",
          createdAt: new Date(),
          description: "description1",
          manufacturer: "manufacturer1",
          quantity_available: 10,
          min_quantity_threshold: 5,
        },
        sale_id: 1,
        createdAt: new Date(),
      },
      {
        id: 2,
        product_id: 2,
        sale_price: 500,
        quantity_sold: 3,
        product: {
          id: 2,
          name: "product2",
          purchase_price: 200,
          category: "category2",
          createdAt: new Date(),
          description: "description2",
          manufacturer: "manufacturer2",
          quantity_available: 10,
          min_quantity_threshold: 5,
        },
        sale_id: 1,
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 4312,
    total_price: 2500,
    createdAt: new Date(),
    discount: 30,
    product_sold: [
      {
        id: 1,
        product_id: 1,
        sale_price: 500,
        quantity_sold: 2,
        product: {
          id: 1,
          name: "product1",
          purchase_price: 200,
          category: "category1",
          createdAt: new Date(),
          description: "description1",
          manufacturer: "manufacturer1",
          quantity_available: 10,
          min_quantity_threshold: 5,
        },
        sale_id: 1,
        createdAt: new Date(),
      },
      {
        id: 2,
        product_id: 2,
        sale_price: 500,
        quantity_sold: 3,
        product: {
          id: 2,
          name: "product2",
          purchase_price: 200,
          category: "category2",
          createdAt: new Date(),
          description: "description2",
          manufacturer: "manufacturer2",
          quantity_available: 10,
          min_quantity_threshold: 5,
        },
        sale_id: 1,
        createdAt: new Date(),
      },
    ],
  }
];

const getFormattedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  console.log(date);
  return `${day}/${month}/${year}`;
};

const columnHelper = createColumnHelper<Sale>();

const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "lastName",
    cell: (info) => <span>#{info.getValue()}</span>,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor("total_price", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Valor Total da Venda</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => <span>{getFormattedDate(info.getValue())}</span>,
    header: () => <span>Data</span>,
  }),
];

const Table = () => {
  const [data, _setData] = useState(() => [...sales]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  const tablec = useReactTable({
    data,
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
          <button className="btn btn-square" onClick={()=>tablec.previousPage()}
          disabled={!tablec.getCanPreviousPage()}>
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
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="btn btn-square" onClick={()=>tablec.nextPage()}
          disabled={!tablec.getCanNextPage()}>
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
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
