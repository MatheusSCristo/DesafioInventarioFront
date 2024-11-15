import { ProductSold } from "../../../../../types";

export const getQuantityProductSoldOnSale = (
  productsSold: ProductSold[],
  productId: number
) => {
  return productsSold
    .filter((productSold: ProductSold) => productSold.product_id === productId)
    .reduce((acc: number, curr: ProductSold) => acc + curr.quantity_sold, 0);
};
