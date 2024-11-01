import { Product } from '../model/product';

const products: Product[] = [
    new Product({
        id: 1,
        name: 'Prod1',
        description: 'Implement login and registration functionality',
        releaseDate: new Date('2024-10-01')
    }),
    new Product({
        id: 2,
        name: 'Prod2',
        description: 'Design and implement the dashboard interface',
        releaseDate: new Date('2024-10-01')
    }),
];

const getProductById = ({ id }: { id: number }): Product | null => {
    try {
        return products.find((product) => product.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllProducts = (): Product[] => products;

export default {
    getProductById,
    getAllProducts
};
