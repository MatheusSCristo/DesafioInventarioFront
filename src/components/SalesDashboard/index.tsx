import { useState } from "react";
import FilterModal from "./FilterModal";
import Table from "./Table";

const SalesDashboard = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  return (
    <div className="w-full bg-white p-5 rounded-md flex flex-col gap-5 ">
      <div className="flex justify-between relative">
        <h1 className="font-semibold text-gray-800 text-xl">Vendas</h1>
        <div className="flex gap-5">
          <button className="btn btn-wide bg-blue-600 text-white">
            Adicionar Venda
          </button>
          <div className={`flex items-end flex-col bg-white shadow border-gray-50 rounded ${filterIsOpen && "p-2 border absolute z-[2] right-0"}`}>
            <button className={`btn bg-transparent ${filterIsOpen && "border-none shadow-none"}`} onClick={()=>setFilterIsOpen(prevState=>!prevState)}>
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
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Filtro
            </button>
            {filterIsOpen && (
              <FilterModal closeModal={()=>setFilterIsOpen(false)}/>
            )}
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default SalesDashboard;
