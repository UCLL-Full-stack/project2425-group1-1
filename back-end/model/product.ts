import { Product as ProductPrisma } from '@prisma/client';

export class Product {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly releaseDate: Date;

    constructor(product: { id?: number; name: string; description: string; releaseDate: Date }) {
        this.validate(product);

        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.releaseDate = product.releaseDate;
    }

    static from({ id, name, description, releaseDate }: ProductPrisma): Product {
        return new Product({
            id,
            name,
            description,
            releaseDate
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getReleaseDate(): Date {
        return this.releaseDate;
    }

    private validate(product: { id?: number; name: string; description: string; releaseDate: Date }) {
        if (!product.name?.trim()) {
            throw new Error('Product name is required');
        }
        if (!product.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!product.releaseDate) {
            throw new Error('Release date is required');
        }
    }
}
