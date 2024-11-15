
export const handleRemoveProduct = async (productId:number):Promise<any> => {
    
    try {
      await fetch(
        "http://localhost:5000/api/product?id=" + productId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };