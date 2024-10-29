import { User } from './user';

export class Team {
    private id?: number;
    private name: string;
    private description: string;
    private owner?: User;
    private members: User[];

    constructor(team: { id?: number; name: string; description: string; owner?: User; members?: User[] }) {
        this.validate(team);

        this.id = team.id;
        this.name = team.name;
        this.description = team.description;
        this.owner = team.owner;
        this.members = team.members || [];
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

    private validate(team: { id?: number; name: string; description: string; owner?: User; members?: User[] }) {
        if (!team.name?.trim()) {
            throw new Error('Team name is required');
        }
        if (!team.description?.trim()) {
            throw new Error('Description is required');
        }
    }
}
