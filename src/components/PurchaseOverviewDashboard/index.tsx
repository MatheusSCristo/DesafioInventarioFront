import { Product } from "../../../types";

const products: Product[] = [
  {
    category: "Sporting Goods",
    purchase_price: 49.99,
    name: "Football",
    createdAt: new Date(),
    description: "This is a football",
    id: 1,
    quantity_available: 10,
    manufacturer: "Nike",
    min_quantity_threshold: 5,
  },
  {
    category: "Sporting Goods",
    purchase_price: 9.99,
    name: "Baseball",
    createdAt: new Date(),
    description: "This is a baseball",
    id: 2,
    quantity_available: 20,
    manufacturer: "Adidas",
    min_quantity_threshold: 5,
  },
  {
    category: "Sporting Goods",
    purchase_price: 9.99,
    name: "Baseball",
    createdAt: new Date(),
    description: "This is a baseball",
    id: 2,
    quantity_available: 20,
    manufacturer: "Adidas",
    min_quantity_threshold: 5,
  },
  {
    category: "Sporting Goods",
    purchase_price: 9.99,
    name: "Baseball",
    createdAt: new Date(),
    description: "This is a baseball",
    id: 2,
    quantity_available: 20,
    manufacturer: "Adidas",
    min_quantity_threshold: 5,
  },
];

const widgets = [
  {
    icon: "purchase",
    text: "Compras",
    value: products.reduce(
      (acc, product) => acc + product.quantity_available,
      0
    ),
  },
  {
    icon: "cost",
    text: "Custo",
    value: products.reduce(
      (acc, product) =>
        acc + product.purchase_price * product.quantity_available,
      0
    ),
  },
];

const PurchaseOverviewDashboard = () => {
  return (
    <div className="w-1/2 bg-white p-5 rounded-md flex flex-col gap-5 ">
      <h1 className="font-semibold text-gray-800 text-xl">
        Visão Geral de Compras
      </h1>
      <div className="flex ">
        {widgets.map((widget) => (
          <div className="w-1/2 border-r-[1px] border-gray-50 py-2 px-10 flex flex-col items-center gap-2">
            <img
              src={`src/assets/icons/${widget.icon}.svg`}
              alt={widget.text}
            />
            <div className="flex gap-2">
              <span className="text-gray-600 font-bold">{widget.text == 'Compras'? widget.value : `R$ ${widget.value}`}</span>
              <span className="text-gray-500">{widget.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseOverviewDashboard;
