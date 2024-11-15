type NewSaleType = {
  product_sold: {
    product_id: number;
    quantity_sold: number;
    unit_price: number;
  }[];
  discount: number;
};

export const handleAddSale = async (sale: NewSaleType) => {
  try {
    const response = await fetch("http://localhost:5000/api/sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
