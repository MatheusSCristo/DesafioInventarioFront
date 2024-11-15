import { forwardRef } from "react";
import { Sale } from "../../../../types";
import IndividualSaleTableTemplate from "./IndividualSaleTableTemplate";

const IndividualSaleTable = forwardRef<HTMLDivElement, { sale: Sale }>(
  ({ sale }, ref) => {
    return (
      sale && (
        <div ref={ref} className="flex flex-col gap-5 p-5">
          <div className="flex  border-b-[1px] border-t-[1px] border-gray-300 p-5">
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
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span>
                <strong>Identificador de Venda: </strong>#{sale.id}
              </span>
              <span>
                <strong>Data: </strong>{" "}
                {new Date(sale.createdAt).toLocaleDateString("pt-br")}
              </span>
            </div>
            <IndividualSaleTableTemplate sale={sale}/>
            <div className="flex justify-between w-full">
              <h2><strong>Total de Produtos :</strong>{sale.product_sold.reduce((acc,item)=>acc+item.quantity_sold,0)}</h2>
              <div>
              <h1><strong>Sub-Total: </strong> R${sale.total_price.toLocaleString("pt-br",{maximumFractionDigits:2})}</h1>
              <h2><strong>Taxas: </strong> R$0</h2>
              <h1><strong>Valor Total: </strong> R${sale.total_price.toLocaleString("pt-br",{maximumFractionDigits:2})}</h1>
              </div>
              
            </div>
          </div>

        </div>
      )
    );
  }
);

export default IndividualSaleTable;
