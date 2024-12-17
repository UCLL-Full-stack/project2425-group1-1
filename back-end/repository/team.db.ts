import { Team } from '../model/team';
import database from './database';

const getById = async ({ id }: { id: number }): Promise<Team | null> => {
    try {
        const team = await database.team.findUnique({
            where: { id },
            include: {
                owner: true,
                members: true,
                sprints: {
                    include: {
                        product: true,
                        backlogItems: true,
                    },
                },
            },
        });
        if (!team) return null;
        return Team.from(team);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAll = async (): Promise<Team[]> => {
    try {
        const teams = await database.team.findMany({
            include: {
                owner: true,
                members: true,
                sprints: {
                    include: {
                        product: true,
                        backlogItems: true,
                    },
                },
            },
        });
        return teams.map((x) => Team.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const save = async (team: Team): Promise<Team> => {
    try {
        const updatedTeam = await database.team.update({
            where: { id: team.getId() },
            data: {
                name: team.getName(),
                description: team.getDescription(),
                ownerId: team.getOwner().getId(),
                members: {
                    set: team.getMembers().map(member => ({ id: member.getId() })),
                },
                sprints: {
                    set: team.getSprints().map(sprint => ({ id: sprint.getId() })),
                },
            },
            include: {
                owner: true,
                members: true,
                sprints: {
                    include: {
                        product: true,
                        backlogItems: true,
                    },
                },
            },
        });
        return Team.from(updatedTeam);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getById,
    getAll,
    save
};
