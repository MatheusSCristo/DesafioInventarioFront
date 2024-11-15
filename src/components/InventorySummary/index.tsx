import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const InventorySummary = () => {
  const {products}=useContext(ProductContext);
  return (
    <div className="w-1/2 bg-white p-5 rounded-md flex flex-col gap-5 ">
      <h1 className="font-semibold text-gray-800 text-xl">
        Resumo do Inventário
      </h1>
      <div className="w-full flex-col flex justify-center items-center gap-2">
        <img src="src/assets/icons/quantity.svg" />
        <div className="flex flex-col items-center gap-0">
          <span className="text-gray-600 font-bold">
            {products.reduce(
              (acc, product) => acc + product.quantity_available,
              0
            )}
          </span>
          <h2>Em estoque</h2>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
