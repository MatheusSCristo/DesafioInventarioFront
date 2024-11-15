import { createColumnHelper } from "@tanstack/react-table";
import { useContext, useState } from "react";
import { Product } from "../../../types";
import { ProductContext } from "../../context/ProductContext";
import PaginationTable from "../../utils/PaginationTable";
import NewProductModal from "./NewProductModal";
import ProductModal from "./ProductModal";

const columnHelper = createColumnHelper<Product>();

const ProductsDashboard = () => {
  const { products } = useContext(ProductContext);
  const [productToViewDetails, setProductToViewDetails] =
    useState<Product | null>(null);
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <span>#{info.getValue()}</span>,
      header: () => <span>ID</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Nome</span>,
    }),
    columnHelper.accessor("quantity_available", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Quantidade Disponível</span>,
    }),
    columnHelper.accessor("manufacturer", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Fabricante</span>,
    }),
    columnHelper.accessor("purchase_price", {
      cell: (info) => (
        <span>
          R$
          {info
            .getValue()
            .toLocaleString("pt-br", { maximumFractionDigits: 2 })}
        </span>
      ),
      header: () => <span>Preço de Compra</span>,
    }),
    columnHelper.accessor("category", {
      cell: (info) => (
        <span
          onClick={() => {
            setProductToViewDetails(info.row.original);
          }}
          className="text-nowrap underline underline-offset-2 text-blue-600 cursor-pointer"
        >
          Ver detalhes
        </span>
      ),
      header: () => {},
    }),
  ];

  const [createProductModalOpen, setCreateProductModalOpen] = useState(false);


  return (
    <>
      <div className="w-full bg-white p-5 rounded-md flex flex-col gap-5 ">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Produtos</h1>
          <button className="btn btn-wide bg-blue-600 text-white hover:text-black" onClick={()=>setCreateProductModalOpen(true)}>
            Adicionar Produto
          </button>
        </div>
        <PaginationTable columns={columns} data={products} pageSize={7} />
      </div>
      {productToViewDetails && (
        <ProductModal
          product={productToViewDetails}
          handleClose={() => {
            setProductToViewDetails(null);
          }}
        />
      )}
      {createProductModalOpen && (
        <NewProductModal handleClose={()=>setCreateProductModalOpen(false)}/>
      )}
    </>
  );
};

export default ProductsDashboard;
