import { createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { Sale } from "../../../types";
import { SalesContext } from "../../context/SalesContext";
import PaginationTable from "../../utils/PaginationTable";
import PdfButton from "../../utils/PdfButton";
import FilterModal from "./FilterModal";
import IndividualSaleTable from "./IndividualSaleTable";
import NewSaleModal from "./NewSaleModal";
import RowPdfButton from "./RowPdfButton";
import SalesTableExport from "./SalesTableExport";

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
        R$
        {info.getValue().toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
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
        <RowPdfButton
          Component={IndividualSaleTable}
          sale={info.row.original}
        />
      </div>
    ),
    header: () => <span>Exportar</span>,
  }),
];

const SalesDashboard = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const sales = useContext(SalesContext);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [newSaleModalIsOpen, setNewSaleModalIsOpen] = useState(false);

  useEffect(() => {
    if (sales) {
      setSalesToShow([...sales?.sales]);
    }
  }, [sales]);

  const [salesToShow, setSalesToShow] = useState([] as Sale[]);

  return (
    <>
      <div className="w-full bg-white p-5 rounded-md flex flex-col gap-5 ">
        <div className="flex justify-between relative">
          <h1 className="font-semibold text-gray-800 text-xl">Vendas</h1>
          <div className="flex gap-5">
            <button className="btn btn-wide bg-blue-600 text-white hover:text-black" onClick={()=>setNewSaleModalIsOpen(true)}>
              Adicionar Venda
            </button>
            <div
              className={`flex items-end flex-col bg-white shadow border-gray-50 rounded ${
                filterIsOpen && "p-2 border absolute z-[2] right-0"
              }`}
            >
              <button
                className={`btn bg-transparent ${
                  filterIsOpen && "border-none shadow-none"
                }`}
                onClick={() => setFilterIsOpen((prevState) => !prevState)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                    stroke="#5D6679"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Filtro
              </button>
              {filterIsOpen && (
                <FilterModal
                  closeModal={() => setFilterIsOpen(false)}
                  setSalesToShow={setSalesToShow}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  startDate={startDate}
                  endDate={endDate}
                />
              )}
            </div>
            <PdfButton
              Component={SalesTableExport}
              sales={salesToShow}
              period={{ startDate, endDate }}
            />
          </div>
        </div>
        <PaginationTable data={salesToShow} columns={columns} pageSize={4} />
      </div>
      {newSaleModalIsOpen && <NewSaleModal handleClose={()=>setNewSaleModalIsOpen(false)}/>}
    </>
  );
};

export default SalesDashboard;
