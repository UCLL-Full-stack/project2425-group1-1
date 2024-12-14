import { User } from './user';
import { Sprint } from './sprint';
import {
    Team as TeamPrisma,
    User as UserPrisma,
    Sprint as SprintPrisma,
    Product as ProductPrisma,
    BacklogItem as BacklogItemPrisma
} from '@prisma/client';

export class Team {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly owner: User;
    readonly members: User[];
    readonly sprints: Sprint[];

    constructor(team: { id?: number; name: string; description: string; owner: User; members?: User[]; sprints?: Sprint[] }) {
        this.validate(team);

        this.id = team.id;
        this.name = team.name;
        this.description = team.description;
        this.owner = team.owner;
        this.members = team.members || [];
        this.sprints = team.sprints || [];
    }

    static from({
        id,
        name,
        description,
        owner,
        members,
        sprints
    }: TeamPrisma & { owner: UserPrisma; members: UserPrisma[]; sprints: (SprintPrisma & { product: ProductPrisma; backlogItems: BacklogItemPrisma[] })[] }): Team {
        return new Team({
            id,
            name,
            description,
            owner: User.from(owner),
            members: members.map((x) => User.from(x)),
            sprints: sprints.map((x) => Sprint.from(x))
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

    getOwner(): User {
        return this.owner;
    }

    getMembers(): User[] {
        return this.members;
    }

    getSprints(): Sprint[] {
        return this.sprints;
    }

    private validate(team: { id?: number; name: string; description: string; owner: User; members?: User[]; sprints?: Sprint[] }) {
        if (!team.name?.trim()) {
            throw new Error('Team name is required');
        }
        if (!team.description?.trim()) {
            throw new Error('Description is required');
        }
    }
}