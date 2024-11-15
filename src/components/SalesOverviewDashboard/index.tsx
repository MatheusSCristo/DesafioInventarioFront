import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { SalesContext } from "../../context/SalesContext";

const SalesOverviewDashboard = () => {
  const { sales } = useContext(SalesContext);
  const {products} = useContext(ProductContext);
  
  const profit = sales.reduce((acc, sale) => acc + sale.total_price, 0) - 
  products.reduce((acc, product) => {
    const soldQuantity = product.all_time_quantity - product.quantity_available;
    return acc + product.purchase_price * soldQuantity;
  }, 0);


  const widgets = [
    {
      icon: "sales",
      text: "Vendas",
      value: sales.length,
    },
    {
      icon: "Revenue",
      text: "Receita",
      value: sales.reduce((acc, sale) => acc + sale.total_price, 0),
    },
    {
      icon: "profit",
      text: "Lucro",
      value:profit
    },
  ];

  return (
    <div className="w-full bg-white p-5 rounded-md flex flex-col gap-5 ">
      <h1 className="font-semibold text-gray-800 text-xl">
        Visão Geral de Vendas
      </h1>
      <div className="flex justify-evenly">
        {widgets.map((widget) => (
          <div
            className="w-1/4 border-r-[1px] border-gray-50 p-2 flex flex-col items-center gap-2"
            key={widget.text}
          >
            <img
              src={`src/assets/icons/${widget.icon}.svg`}
              alt={widget.text}
            />
            <div className="flex gap-2">
              <span className="text-gray-600 font-bold">
                {widget.text == "Vendas" ? widget.value : `R$ ${widget.value.toLocaleString("pt-br",{maximumFractionDigits: 2})}`}
              </span>
              <span className="text-gray-500">{widget.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverviewDashboard;
