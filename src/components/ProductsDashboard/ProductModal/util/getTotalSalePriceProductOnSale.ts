import { ProductSold, Sale } from "../../../../../types";

export const getTotalSalePriceProductOnSale = (sale: Sale, productId: number) => {
    return sale.product_sold
      .filter((productSold: ProductSold) => productSold.product_id === productId)
      .reduce((acc: number, curr: ProductSold) => acc + curr.sale_price, 0);
  };