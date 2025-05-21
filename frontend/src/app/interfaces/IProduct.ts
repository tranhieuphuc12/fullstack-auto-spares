import Brand from "./IBrand";
import Car from "./ICar";
import Category from "./ICategory";

interface Product {
    _id?: string;
    productId: [string];
    JSAsakashi: string;
    name: string;        
    images: [string];
    price: number;
    description: string;
    stock: number;
    brand: Brand;
    category: Category;
    car: Car;
    createdAt: Date;
    updatedAt: Date;
}
export default Product;