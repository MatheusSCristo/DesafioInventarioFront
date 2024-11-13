import { Sale } from "../../../types.ts";

const sales: Sale[] = [
  {
    id: 1,
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
];

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
    value:
      sales.reduce((acc, sale) => acc + sale.total_price, 0) -
      sales.reduce(
        (acc, sale) =>
          acc +
          sale.product_sold.reduce(
            (acc, product) =>
              acc + product.quantity_sold * product.product.purchase_price,
            0
          ),
        0
      ),
  },
  {
    icon: "cost",
    text: "Custo",
    value: sales.reduce(
      (acc, sale) =>
        acc +
        sale.product_sold.reduce(
          (acc, product) =>
            acc + product.quantity_sold * product.product.purchase_price,
          0
        ),
      0
    ),
  },
];

const SalesOverviewDashboard = () => {
  return (
    <div className="w-3/4 bg-white p-5 rounded-md flex flex-col gap-5 ">
      <h1 className="font-semibold text-gray-800 text-xl">
        Visão Geral de Vendas
      </h1>
      <div className="flex ">
        {widgets.map((widget) => (
          <div className="w-1/4 border-r-[1px] border-gray-50 p-2 flex flex-col items-center gap-2">
            <img
              src={`src/assets/icons/${widget.icon}.svg`}
              alt={widget.text}
            />
            <div className="flex gap-2">
              <span className="text-gray-600 font-bold">{widget.value}</span>
              <span className="text-gray-500">{widget.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverviewDashboard;
