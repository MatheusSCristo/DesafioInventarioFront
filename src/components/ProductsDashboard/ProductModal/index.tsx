import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useContext } from "react";
import { Product, Sale } from "../../../../types";
import { ProductContext } from "../../../context/ProductContext";
import SimpleTable from "../../../utils/SimpleTable";
import ProductPdfButton from "./ProductPdfButton";
import ProductPdfButtonTemplate from "./ProductPdfButton/ProductPdfButtonTemplate";
import { getMediumPrice } from "./util/getMediumPrice";
import { getQuantityProductSoldOnSale } from "./util/getQuantityProductSoldOnSale";
import { getSalesWithProduct } from "./util/getSalesWithProduct";
import { getTotalSalePriceProductOnSale } from "./util/getTotalSalePriceProductOnSale";
import { handleRemoveProduct } from "./util/handleRemoveProduct";

const columnHelper = createColumnHelper<Sale>();

const ProductModal = ({
  product,
  handleClose,
}: {
  product: Product;
  handleClose: () => void;
}) => {
  const columns = [
    columnHelper.accessor((row) => row.id, {
      id: "lastName",
      cell: (info) => <span>#{info.getValue()}</span>,
      header: () => <span>ID</span>,
    }),
    columnHelper.accessor("total_price", {
      cell: (info) => (
        <span>
          R${" "}
          {getTotalSalePriceProductOnSale(
            info.row.original,
            product.id
          ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
      ),
      header: () => <span>Valor Unitário </span>,
    }),
    columnHelper.accessor("product_sold", {
      cell: (info) => (
        <span>{getQuantityProductSoldOnSale(info.getValue(), product.id)}</span>
      ),
      header: () => <span>Quantidade</span>,
    }),
    columnHelper.accessor("product_sold.product.all_time_quantity", {
      id: "totalValue",
      cell: (info) => (
        <span>
          {(
            getTotalSalePriceProductOnSale(info.row.original, product.id) *
            getQuantityProductSoldOnSale(
              info.row.original.product_sold,
              product.id
            )
          ).toLocaleString("pt-br", { maximumFractionDigits: 2 })}
        </span>
      ),
      header: () => <span>Valor Total</span>,
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>
          {new Date(Date.parse(info.getValue())).toLocaleDateString("pt-br")}
        </span>
      ),
      header: () => <span>Data</span>,
    }),
  ];
  const { setProducts } = useContext(ProductContext);

  const { data: salesWithProduct, isLoading: loadingSalesWithProduct } =
    useQuery({
      queryKey: ["salesWithProduct", product.id],
      queryFn: () => getSalesWithProduct(product.id),
      enabled: !!product.id,
    });

  const handleClickRemove = () => {
    if (salesWithProduct.length > 0) {
      alert("Não é possível excluir um produto que possui vendas");
      return;
    }
    try {
      handleRemoveProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    salesWithProduct && (
      <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-transparent">
        <div className="relative bg-white w-[40%] h-fit flex flex-col items-center p-5 gap-5 rounded-xl border-gray-300 border">
          <span
            className="absolute top-5 right-5 cursor-pointer text-2xl font-bold"
            onClick={handleClose}
          >
            X
          </span>
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
              <strong>Quantidade disponível:</strong>{" "}
              {product.quantity_available} Unidades
            </span>
            <span className="">
              <strong>Preço Médio de Venda:</strong> R$
              {getMediumPrice(salesWithProduct, product)}
            </span>
          </div>
          <hr className="border-gray-300  w-full my-5" />
          <div className="flex flex-col w-full">
            <h1 className="text-xl font-semibold">Vendas Recentes</h1>
            <SimpleTable data={salesWithProduct} columns={columns} />
          </div>
          <div className="flex w-full justify-between">
            <ProductPdfButton
              Component={ProductPdfButtonTemplate}
              sales={salesWithProduct}
              columns={columns}
              product={product}
            />
            <button
              className="btn bg-red-50 text-white"
              onClick={handleClickRemove}
            >
              Excluir produto
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductModal;
