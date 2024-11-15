import { forwardRef } from "react";
import { Sale } from "../../../../types";
import SaleTable from "./SalesTableTemplate";

const SalesTableExport = forwardRef<
  HTMLDivElement,
  { sales: Sale[]; period: { startDate: string; endDate: string } }
>((props, ref) => {
  const sales = props.sales;

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const periodoStart = props.period.startDate
    ? formatDate(props.period.startDate)
    : sales.length
    ? new Date(
        sales.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )[0].createdAt
      ).toLocaleDateString("pt-br")
    : 0;

  const periodoEnd = props.period.endDate
    ? formatDate(props.period.endDate)
    : new Date().toLocaleDateString("pt-BR");

  const time = new Date();
  const formattedDate = time.toLocaleDateString("pt-BR");
  const formattedTime = time.toLocaleTimeString("pt-BR");

  return (
    <div ref={ref} className="p-5 mt-5 flex flex-col gap-5">
      <div className="border-b-[1px] border-gray-300 flex justify-end ">
        <span>
          Gerado em {formattedDate} {formattedTime}
        </span>
      </div>
      <div className="flex  border-b-[1px]  border-gray-300 p-5">
        <img
          src="src/assets/images/logo.png"
          alt="Logo"
          className="w-[130px] h-auto"
        />
        <div className="flex flex-col ">
          <h1 className="text-2xl">Empresa Ficticia De Vendas</h1>
          <h2 className="font-bold">Av.Endereço, 404 Bairro </h2>
          <h3 className="font-bold">Fone: (99) 99999-9990 </h3>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">Resumo de Vendas</h1>
        <h2>
          Periodo de {periodoStart} até {periodoEnd}
        </h2>
      </div>
      <SaleTable sales={sales} />
      <div className="border-t-[1px] border-gray-300 p-2">
        <h2 className="">
          <strong>Total de pedidos Emitidos:</strong> {sales.length} Pedidos
        </h2>
        <h2 className="">
          <strong>Valor total: </strong>R${" "}
          {sales
            .reduce((acc, item) => acc + item.total_price, 0)
            .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </h2>
        {}
        <h2>
          <strong>Total de Produtos:</strong>{" "}
          {sales.reduce(
            (acc, item) =>
              acc +
              item.product_sold.reduce(
                (acc, item) => acc + item.quantity_sold,
                0
              ),
            0
          )}{" "}
          Unidades
        </h2>
      </div>
    </div>
  );
});

export default SalesTableExport;
