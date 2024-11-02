import { BacklogItem } from './backlog_item';
import { Product } from './product';

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
