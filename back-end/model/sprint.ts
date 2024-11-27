import { BacklogItem } from './backlog_item';
import { Product } from './product';
import {
    Sprint as SprintPrisma,
    Product as ProductPrisma,
    BacklogItem as BacklogItemPrisma
} from '@prisma/client';

export class Sprint {
    private id?: number;
    private name: string;
    private startDate: Date;
    private endDate: Date;
    private backlogItems: BacklogItem[];
    private product: Product;

    constructor(sprint: {
        id?: number;
        name: string;
        startDate: Date;
        endDate: Date;
        backlogItems: BacklogItem[];
        product: Product;
    }) {
        this.validate(sprint);

        this.id = sprint.id;
        this.name = sprint.name;
        this.startDate = sprint.startDate;
        this.endDate = sprint.endDate;
        this.backlogItems = sprint.backlogItems;
        this.product = sprint.product;
    }

    static from({
        id,
        name,
        startDate,
        endDate,
        product,
        backlogItems
    }: SprintPrisma & { product: ProductPrisma; backlogItems: BacklogItemPrisma[] }): Sprint {
        return new Sprint({
            id,
            name,
            startDate,
            endDate,
            backlogItems: backlogItems.map((x) => BacklogItem.from(x)),
            product: Product.from(product)
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getBacklogItems(): BacklogItem[] {
        return this.backlogItems;
    }

    getProduct(): Product {
        return this.product;
    }

    private validate(sprint: {
        id?: number;
        name: string;
        startDate: Date;
        endDate: Date;
        backlogItems: BacklogItem[];
    }) {
        if (!sprint.name?.trim()) {
            throw new Error('Sprint name is required');
        }
        if (!sprint.startDate) {
            throw new Error('Start date is required');
        }
        if (!sprint.endDate) {
            throw new Error('End date is required');
        }
    }
}
