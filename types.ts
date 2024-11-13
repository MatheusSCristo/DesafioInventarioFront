export type Product={
    id:number,
    name:string,
    category:string,
    quantity_available:number,
    purchase_price:number,
    description:string,
    createdAt:Date,
    manufacturer:string,
    min_quantity_threshold:number,
}

export type ProductSold={
    id:number,
    product:Product,
    product_id:number,
    quantity_sold:number,
    sale_id:number,
    createdAt:Date,
    sale_price:number,
}

export type Sale={
    id:number,
    total_price:number,
    createdAt:Date,
    discount:number,
    product_sold:ProductSold[]
}