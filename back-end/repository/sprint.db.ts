import { Sprint } from '../model/sprint';
import database from './database';

const getById = async ({ id }: { id: number }): Promise<Sprint | null> => {
    try {
        const sprint = await database.sprint.findUnique({
            where: { id },
            include: {
                backlogItems: true,
                product: true,
            },
        });
        if (!sprint) return null;
        return Sprint.from(sprint);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAll = async (): Promise<Sprint[]> => {
    try {
        const sprints = await database.sprint.findMany({
            include: {
                backlogItems: true,
                product: true,
            },
        });
        return sprints.map((x) => Sprint.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getById,
    getAll,
};
