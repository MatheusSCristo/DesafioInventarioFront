import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductContext } from "../../../context/ProductContext";

const registerSchema = z.object({
  name: z.string().min(1, "É necessário informar um valor para o campo"),
  category: z.string().min(1, "É necessário informar um valor para o campo"),
  price: z
    .string()
    .min(1, "É necessário informar um valor para o campo")
    .refine((value) => !isNaN(Number(value)), {
      message: "O valor deve ser um número",
    }),
  quantity: z
    .string()
    .min(1, "É necessário informar um valor para o campo")
    .refine((value) => !isNaN(Number(value)), {
      message: "O valor deve ser um número",
    }),
  manufacturer: z
    .string()
    .min(1, "É necessário informar um valor para o campo"),
  description: z.string().min(1, "É necessário informar um valor para o campo"),
});

type FormData = z.infer<typeof registerSchema>;

type Input = {
  name: keyof FormData;
  label: string;
};
const NewProductModal = ({handleClose}:{handleClose:()=>void}) => {
  const { setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    const body = {
      name: data.name,
      price: data.price,
      category: data.category,
      quantity_available: data.quantity,
      description: data.description,
      manufacturer: data.manufacturer,
    };
    setError(false);
    setSucess(false);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      setProducts((prev) => [...prev, responseData]);
      setSucess(true);
      reset();
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputs: Input[] = [
    { label: "Nome do Produto", name: "name" },
    { label: "Categoria", name: "category" },
    { label: "Preço de Compra", name: "price" },
    { label: "Quantidade", name: "quantity" },
    { label: "Fabricante", name: "manufacturer" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-transparent">
      <div className="relative bg-white w-[30%] h-fit flex flex-col p-10 gap-5 rounded-xl border-gray-300 border">
        <span
          className="absolute top-5 right-5 cursor-pointer text-2xl font-bold"
          onClick={handleClose}
        >
          X
        </span>
        <h1 className="text-xl font-semibold">Novo Produto</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input) => (
            <div className="flex flex-col items-end gap-2" key={input.name}>
              <div className="flex justify-between items-center w-full">
                <span>{input.label}</span>
                <input
                  type="text"
                  placeholder={`Insira ${input.label.toLowerCase()}`}
                  className="input input-bordered w-full max-w-xs"
                  {...register(input.name)}
                />
              </div>
              {errors[input.name]?.message && (
                <span className="text-red-50">
                  {errors[input.name]?.message}
                </span>
              )}
            </div>
          ))}

          <div className="flex flex-col items-end">
            <div className="flex items-center justify-between w-full">
              <span>Descrição</span>
              <textarea
                placeholder="Descreva o produto..."
                className="input input-bordered w-full max-w-xs"
                {...register("description")}
              />
            </div>
            {errors.description && (
              <span className="text-red-50">{errors.description?.message}</span>
            )}
          </div>
          <div className="flex self-end gap-2 ">
            <button className="btn text-black border-gray-300 border" onClick={handleClose} type="button">
              Descartar
            </button>
            <button
              className="btn  bg-blue-600 text-white hover:text-black"
              type="submit"
            >
              Adicionar Produto
            </button>
          </div>
          <div className="flex justify-center w-full">
            {loading && (
              <img
                src="/src/assets/icons/loading.svg"
                className="w-[50px] h-[50px]"
              />
            )}
            {sucess && (
              <span className="text-green-500">
                Produto adicionado com sucesso
              </span>
            )}
            {error && (
              <span className="text-red-50">
                Houve um problema, tente novamente
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
