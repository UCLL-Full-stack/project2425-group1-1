import { User } from './user';
import { Sprint } from './sprint';

export class Team {
    private id?: number;
    private name: string;
    private description: string;
    private owner?: User;
    private members: User[];
    private sprints: Sprint[];

    constructor(team: { id?: number; name: string; description: string; owner?: User; members?: User[]; sprints?: Sprint[] }) {
        this.validate(team);

        this.id = team.id;
        this.name = team.name;
        this.description = team.description;
        this.owner = team.owner;
        this.members = team.members || [];
        this.sprints = team.sprints || [];
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

    getOwner(): User | undefined {
        return this.owner;
    }

    getMembers(): User[] {
        return this.members;
    }

    getSprints(): Sprint[] {
        return this.sprints;
    }

    private validate(team: { id?: number; name: string; description: string; owner?: User; members?: User[]; sprints?: Sprint[] }) {
        if (!team.name?.trim()) {
            throw new Error('Team name is required');
        }
        if (!team.description?.trim()) {
            throw new Error('Description is required');
        }
    }
}
