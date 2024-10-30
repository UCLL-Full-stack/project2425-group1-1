import { BacklogItem } from './backlog_item';

export class Sprint {
    private id?: number;
    private name: string;
    private startDate: Date;
    private endDate: Date;
    private backlogItems: BacklogItem[];

    constructor(sprint: {
        id?: number;
        name: string;
        startDate: Date;
        endDate: Date;
        backlogItems: BacklogItem[];
    }) {
        this.validate(sprint);

        this.id = sprint.id;
        this.name = sprint.name;
        this.startDate = sprint.startDate;
        this.endDate = sprint.endDate;
        this.backlogItems = sprint.backlogItems;
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
