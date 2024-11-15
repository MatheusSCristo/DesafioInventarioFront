export type Product={
    id:number,
    name:string,
    category:string,
    quantity_available:number,
    purchase_price:number,
    description:string,
    createdAt:string,
    manufacturer:string,
    min_quantity_threshold:number,
    all_time_quantity:number,
}

export type ProductSold={
    id:number,
    product:Product,
    product_id:number,
    quantity_sold:number,
    sale_id:number,
    createdAt:string,
    sale_price:number,
}

export type Sale={
    id:number,
    total_price:number,
    createdAt:string,
    discount:number,
    product_sold:ProductSold[]
}