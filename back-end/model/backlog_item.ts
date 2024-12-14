import { BacklogItem as BacklogItemPrisma } from '@prisma/client';

export class BacklogItem {
    readonly id?: number;
    readonly title: string;
    readonly description: string;
    readonly priority: number;
    readonly estimatedHours: number;
    readonly actualHours: number;

    constructor(backlogItem: {
        id?: number;
        title: string;
        description: string;
        priority: number;
        estimatedHours: number;
        actualHours: number;
    }) {
        this.validate(backlogItem);

        this.id = backlogItem.id;
        this.title = backlogItem.title;
        this.description = backlogItem.description;
        this.priority = backlogItem.priority;
        this.estimatedHours = backlogItem.estimatedHours;
        this.actualHours = backlogItem.actualHours;
    }

    static from({ id, title, description, priority, estimatedHours, actualHours }: BacklogItemPrisma): BacklogItem {
        return new BacklogItem({
            id,
            title,
            description,
            priority,
            estimatedHours,
            actualHours
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getPriority(): number {
        return this.priority;
    }

    getEstimatedHours(): number {
        return this.estimatedHours;
    }

    getActualHours(): number {
        return this.actualHours;
    }

    private validate(backlogItem: {
        id?: number;
        title: string;
        description: string;
        priority: number;
        estimatedHours: number;
        actualHours: number;
    }) {
        if (!backlogItem.title?.trim()) {
            throw new Error('Title is required');
        }
        if (!backlogItem.description?.trim()) {
            throw new Error('Description is required');
        }
        if (backlogItem.priority === undefined || backlogItem.priority < 1) {
            throw new Error('Priority must be a positive integer');
        }
        if (backlogItem.estimatedHours === undefined || backlogItem.estimatedHours < 0) {
            throw new Error('Estimated hours must be a non-negative number');
        }
        if (backlogItem.actualHours === undefined || backlogItem.actualHours < 0) {
            throw new Error('Actual hours must be a non-negative number');
        }
    }
}
