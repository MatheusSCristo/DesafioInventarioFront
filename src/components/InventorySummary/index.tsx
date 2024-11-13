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

const InventorySummary = () => {
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
