import { Product, ProductSold, Sale } from "../../../../../types";

export const getMediumPrice = (salesWithProduct:Sale[],product:Product) => {
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