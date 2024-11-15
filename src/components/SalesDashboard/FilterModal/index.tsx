import { useContext } from "react";
import { Sale } from "../../../../types";
import { SalesContext } from "../../../context/SalesContext";

const FilterModal = ({
  closeModal,
  setSalesToShow,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: {
  closeModal: () => void;
  setSalesToShow: React.Dispatch<React.SetStateAction<Sale[]>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  endDate: string;
}) => {
  const {sales}=useContext(SalesContext);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getFilteredSales();
  };

  const getFilteredSales = async () => {
    const response = await fetch(
      `http://localhost:5000/api/sale/date?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    setSalesToShow(data);
    closeModal();
  };

  const handleResetFilter=()=>{
    setSalesToShow(sales);
    setEndDate("");
    setStartDate("");
    closeModal();
  }



  return (
    <>
    <form className=" flex flex-col gap-5 " onSubmit={handleFormSubmit}>
      <div>
        <span>De:</span>
        <input
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          name="from"
          type="date"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <span>Até:</span>
        <input
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          name="to"
          type="date"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button className="btn btn-success" type="submit">
        Filtrar
      </button>
    </form>
      <button className="mt-2 self-center underline underline-offset-2 bg-transparent border-none" onClick={handleResetFilter}>
        Resetar Filtro
      </button>
      </>
  );
};

export default FilterModal;
