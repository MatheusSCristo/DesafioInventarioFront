export const getSalesWithProduct = async (productId:number) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/sale/productId?productId=" + productId
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };