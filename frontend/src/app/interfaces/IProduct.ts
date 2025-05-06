interface Product {
    _id: string;
    productId: string;
    name: string;        
    images: [string];
    price: number;
    description: string;
    stock: number;
    brand: string;
    categoryId: string;
    carId: string;
    createdAt: Date;
    updatedAt: Date;
}
export default Product;