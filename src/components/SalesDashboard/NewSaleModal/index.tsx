import { useContext, useState } from "react";
import { Product } from "../../../../types";
import { ProductContext } from "../../../context/ProductContext";
import { SalesContext } from "../../../context/SalesContext";
import { handleAddSale } from "./util/handleAddSale";

type ProductsInputType = {
  product: Product;
  quantity: number;
  unit_price: number;
};

const NewSaleModal = ({ handleClose }: { handleClose: () => void }) => {
  const [productsAdded, setProductsAdded] = useState<ProductsInputType[]>([
    {quantity:0} as ProductsInputType,
  ]);
  const { products } = useContext(ProductContext);

  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const { setSales } = useContext(SalesContext);

  const handleClickToAddSale = async () => {
    if (totalValue <= 0) return;
    const filteredProducts = productsAdded.filter(
      (product) =>
        product.product &&
        !isNaN(product.quantity) &&
        !isNaN(product.unit_price)
    );
    const body = {
      discount,
      product_sold: filteredProducts.map((product) => {
        return {
          product_id: product.product.id,
          quantity_sold: product.quantity,
          unit_price: product.unit_price,
        };
      }),
    };
    setError(false);
    setSucess(false);
    setLoading(true);
    try {
      const sale = await handleAddSale(body);
      setSales((prevSales) => [...prevSales, sale]);
      setSucess(true);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const product = products.find((product) => product.name === e.target.value);
    if (!product) return;
    const newProductsAdded = [...productsAdded];
    newProductsAdded[index].product = product;
    setProductsAdded(newProductsAdded);
  };

  const handleAddPrecoUnitario = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newProductsAdded = [...productsAdded];
    newProductsAdded[index].unit_price = parseFloat(e.target.value);
    setProductsAdded(newProductsAdded);
  };

  const handleSelectQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newProductsAdded = [...productsAdded];
    newProductsAdded[index].quantity = parseInt(e.target.value);
    setProductsAdded(newProductsAdded);
  };

  const handleAddInput = () => {
    setProductsAdded([...productsAdded, {quantity:0} as ProductsInputType]);
  };

  const totalValue =
    productsAdded
      .map((product) => product.quantity * product.unit_price)
      .filter((item) => !isNaN(item))
      .reduce((acc, curr) => acc + curr, 0) - discount;

  const handleRemoveInput = (index: number) => {
    if (productsAdded.length === 1) {
      return;
    }
    const newProductsAdded = [...productsAdded];
    newProductsAdded.splice(index, 1);
    setProductsAdded(newProductsAdded);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-transparent z-10">
      <div className="relative bg-white  h-fit flex flex-col p-10 gap-5 rounded-xl border-gray-300 border">
        <span
          className="absolute top-5 right-5 cursor-pointer text-2xl font-bold"
          onClick={handleClose}
        >
          X
        </span>
        <h1 className="text-xl font-semibold ">Nova Venda</h1>
        <div className="flex flex-col gap-5">
          <h2>Adicionar Produtos</h2>
          {productsAdded.map((item, index) => (
            <div className="relative flex gap-5 p-3 cursor-pointer" key={index}>
              <span
                className="absolute top-0 left-0"
                onClick={() => handleRemoveInput(index)}
              >
                <svg
                  fill="#FF5378"
                  width="15px"
                  height="15px"
                  viewBox="0 0 512 512"
                  id="_15_Subtract"
                  data-name="15 Subtract"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group_40" data-name="Group 40">
                    <g id="Group_39" data-name="Group 39">
                      <path
                        id="Path_20"
                        data-name="Path 20"
                        d="M256,0C114.625,0,0,114.625,0,256,0,397.391,114.625,512,256,512c141.391,0,256-114.609,256-256C512,114.625,397.391,0,256,0Zm0,448C149.969,448,64,362.031,64,256S149.969,64,256,64c106.047,0,192,85.969,192,192S362.047,448,256,448ZM128,288H384V224H128Z"
                        fillRule="evenodd"
                      />
                    </g>
                  </g>
                </svg>
              </span>
              <select
                className="select select-bordered focus:outline-none"
                onChange={(e) => handleSelectProduct(e, index)}
              >
                <option disabled >
                  Selecionar produto
                </option>
                {products.map((product) => (
                  <option key={product.id}>{product.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Preço Unitário"
                className="input input-bordered "
                onChange={(e) => {
                  handleAddPrecoUnitario(e, index);
                }}
              />

              <select
                name="select"
                className="select select-bordered focus:outline-none w-1/4"
                onChange={(e) => handleSelectQuantity(e, index)}
              >
                {[
                  ...Array(
                    productsAdded[index].product
                      ? productsAdded[index].product.quantity_available + 1
                      : 0
                  ).keys(),
                ].map((qnt) => (
                  <option key={qnt}>{qnt}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex justify-center w-full ">
            <span
              onClick={handleAddInput}
              className="w-[30px] h-[30px] cursor-pointer flex items-center justify-center border border-gray-300 text-black text-2xl font-bold leading-tight rounded-lg"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.43182 17.2102V0.335226H10.2955V17.2102H7.43182ZM0.426137 10.2045V7.34091H17.3011V10.2045H0.426137Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Desconto</h2>
              <input
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                type="text"
                className="input input-bordered w-1/4"
                placeholder="R$0,00"
              />
            </div>
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Preço Total</h2>
              <h2 className="font-semibold">
                R$
                {(totalValue || 0).toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>
          <div className="flex self-end gap-2 ">
            <button
              onClick={handleClose}
              className="btn text-black border-gray-300 border"
              type="button"
            >
              Descartar
            </button>
            <button
              onClick={handleClickToAddSale}
              className="btn  bg-blue-600 text-white hover:text-black"
              type="submit"
            >
              Adicionar Venda
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
          {loading && (
            <img
              src="/src/assets/icons/loading.svg"
              className="w-[50px] h-[50px]"
            />
          )}
          {sucess && (
            <span className="text-green-500">Venda adicionada com sucesso</span>
          )}
          {error && (
            <span className="text-red-50">
              Houve um problema, tente novamente
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewSaleModal;
