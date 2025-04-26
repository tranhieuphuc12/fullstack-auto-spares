import Product from './IProduct';
interface ApiResponse {    
    totalPages: number;
    totalItems: number;
    currentPage: number;
    products: Product[];
}
export default ApiResponse;