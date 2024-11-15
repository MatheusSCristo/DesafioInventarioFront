import { forwardRef } from "react";
import { Product, ProductSold, Sale } from "../../../../../../types";
import SimpleTable from "../../../../../utils/SimpleTable";

const getMediumPrice = (salesWithProduct: Sale[], product: Product) => {
  if (salesWithProduct.length === 0) return "0,00";
  const productsSold = salesWithProduct.flatMap((sale: Sale) =>
    sale.product_sold.filter(
      (acc: ProductSold) => acc.product_id === product.id
    )
  );
  const totalSalePrice = productsSold.reduce(
    (acc: number, curr: ProductSold) => acc + curr.sale_price,
    0
  );
  return (totalSalePrice / productsSold.length).toLocaleString("pt-br", {
    maximumFractionDigits: 2,
  });
};

const time = new Date();
const formattedDate = time.toLocaleDateString("pt-BR");
const formattedTime = time.toLocaleTimeString("pt-BR");

const ProductPdfButtonTemplate = forwardRef<
  HTMLDivElement,
  { product: Product; sales: Sale[]; columns: any[] }
>(({ product, sales, columns }, ref) => {
  return (
    <div
      className="relative bg-white  flex flex-col  p-5"
      ref={ref}
    >
      <div className="border-b-[1px] border-gray-300 flex justify-end ">
        <span>
          Gerado em {formattedDate} {formattedTime}
        </span>
      </div>
      <div className="flex border-gray-300 p-5">
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
      <h1 className="text-xl font-bold">Detalhes do Produto</h1>
      <hr className="border-gray-300  w-full my-5" />
      <div className="flex flex-col w-full text-lg">
        <span className="">
          <strong>ID do Produto:</strong> #{product.id}
        </span>
        <span className="">
          <strong>Nome:</strong> {product.name}
        </span>
        <span className="">
          <strong>Categoria:</strong> {product.category}
        </span>
        <span className="">
          <strong>Descriçao:</strong> {product.description}.
        </span>
        <span className="">
          <strong>Preço de compra:</strong> R$
          {product.purchase_price.toLocaleString("pt-br", {
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="">
          <strong>Quantidade disponível:</strong> {product.quantity_available}{" "}
          Unidades
        </span>
        <span className="">
          <strong>Preço Médio de Venda:</strong> R${getMediumPrice(sales, product)}
        </span>
      </div>
      <hr className="border-gray-300  w-full my-5" />
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-semibold">Vendas Recentes</h1>
        <SimpleTable data={sales} columns={columns} />
      </div>
    </div>
  );
});

export default ProductPdfButtonTemplate;
