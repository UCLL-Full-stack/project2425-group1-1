import { BacklogItem } from './backlog_item';
import { Team } from './team';

export class Sprint {
    private id?: number;
    private name: string;
    private startDate: Date;
    private endDate: Date;
    private backlogItems: BacklogItem[];
    private team: Team;

    constructor(sprint: {
        id?: number;
        name: string;
        startDate: Date;
        endDate: Date;
        backlogItems: BacklogItem[];
        team: Team;
    }) {
        this.validate(sprint);

        this.id = sprint.id;
        this.name = sprint.name;
        this.startDate = sprint.startDate;
        this.endDate = sprint.endDate;
        this.backlogItems = sprint.backlogItems;
        this.team = sprint.team;
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

    getTeam(): Team {
        return this.team;
    }

    private validate(sprint: {
        id?: number;
        name: string;
        startDate: Date;
        endDate: Date;
        backlogItems: BacklogItem[];
        team: Team;
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
        if (!Array.isArray(sprint.backlogItems)) {
            throw new Error('Backlog items must be an array');
        }
        if (!sprint.team) {
            throw new Error('Team is required');
        }
    }
}
