import { BacklogItem } from '../model/backlog_item';
import database from './database';

const getById = async ({ id }: { id: number }): Promise<BacklogItem | null> => {
    try {
        const backlogItem = await database.backlogItem.findUnique({
            where: { id },
        });
        if (!backlogItem) return null;
        return BacklogItem.from(backlogItem);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAll = async (): Promise<BacklogItem[]> => {
    try {
        const backlogItems = await database.backlogItem.findMany();
        return backlogItems.map((x) => BacklogItem.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const create = async (value: BacklogItem): Promise<BacklogItem> => {
    try {
        const newItem = await database.backlogItem.create({
            data: {
                title: value.getTitle(),
                description: value.getDescription(),
                priority: value.getPriority(),
                estimatedHours: value.getEstimatedHours(),
                actualHours: value.getActualHours(),
            },
        });
        return BacklogItem.from(newItem);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getById,
    getAll,
    create,
};
