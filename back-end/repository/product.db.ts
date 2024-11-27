import { Product } from '../model/product';
import database from './database';

const getById = async ({ id }: { id: number }): Promise<Product | null> => {
    try {
        const product = await database.product.findUnique({
            where: { id },
        });
        if (!product) return null;
        return Product.from(product);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAll = async (): Promise<Product[]> => {
    try {
        const products = await database.product.findMany();
        return products.map((x) => Product.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getById,
    getAll,
};
