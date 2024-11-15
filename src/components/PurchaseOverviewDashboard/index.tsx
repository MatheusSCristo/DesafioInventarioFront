//ADICIONAR FETCH DE PRODUTOS

import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";


const PurchaseOverviewDashboard = () => {
  const { products } = useContext(ProductContext);
  const widgets = [
    {
      icon: "purchase",
      text: "Compras",
      value: products.reduce(
        (acc, product) => acc + product.all_time_quantity,
        0
      ),
    },
    {
      icon: "cost",
      text: "Custo",
      value: products.reduce(
        (acc, product) =>
          acc + product.purchase_price * product.all_time_quantity,
        0
      ),
    },
  ];

  return (
    <div className="w-1/2 bg-white p-1 rounded-md flex flex-col gap-5 ">
      <h1 className="font-semibold text-gray-800 text-xl p-5">
        Visão Geral de Compras
      </h1>
      <div className="flex ">
        {widgets.map((widget) => (
          <div
            className="w-1/2 border-r-[1px] border-gray-50 py-2 px-10 flex flex-col items-center gap-2"
            key={widget.text}
          >
            <img
              src={`src/assets/icons/${widget.icon}.svg`}
              alt={widget.text}
            />
            <div className="flex gap-2 flex-col items-center">
              <span className="text-gray-500">{widget.text}</span>
              <span className="text-gray-600 font-bold">
                {widget.text == "Compras" ? widget.value : `R$ ${widget.value.toLocaleString("pt-BR",{maximumFractionDigits: 2})}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseOverviewDashboard;
