import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Product, ProductSold, Sale } from "../../../../types";
import SimpleTable from "../../../utils/SimpleTable";
import ProductPdfButton from "./ProductPdfButton";
import ProductPdfButtonTemplate from "./ProductPdfButton/ProductPdfButtonTemplate";

const columnHelper = createColumnHelper<Sale>();

const getTotalSalePriceProductOnSale = (sale: Sale, productId: number) => {
  return sale.product_sold
    .filter((productSold: ProductSold) => productSold.product_id === productId)
    .reduce((acc: number, curr: ProductSold) => acc + curr.sale_price, 0);
};

const getQuantityProductSoldOnSale = (
  productsSold: ProductSold[],
  productId: number
) => {
  return productsSold
    .filter((productSold: ProductSold) => productSold.product_id === productId)
    .reduce((acc: number, curr: ProductSold) => acc + curr.quantity_sold, 0);
};

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
            getQuantityProductSoldOnSale(info.row.original.product_sold, product.id)
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
  const [salesWithProduct, setSalesWithProduct] = useState([]);

  const getSalesWithProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/sale/productId?productId=" + product.id
      );
      const data = await response.json();
      setSalesWithProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSalesWithProduct();
  }, []);

  const getMediumPrice = () => {
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

  return (
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
            <strong>Quantidade disponível:</strong> {product.quantity_available}{" "}
            Unidades
          </span>
          <span className="">
            <strong>Preço Médio de Venda:</strong> R${getMediumPrice()}
          </span>
        </div>
        <hr className="border-gray-300  w-full my-5" />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-semibold">Vendas Recentes</h1>
          <SimpleTable data={salesWithProduct} columns={columns} />
        </div>
        <ProductPdfButton Component={ProductPdfButtonTemplate} sales={salesWithProduct} columns={columns} product={product}  />
      </div>
    </div>
  );
};

export default ProductModal;
