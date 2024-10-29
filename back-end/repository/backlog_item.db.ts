import { BacklogItem } from '../model/backlog_item';

const backlogItems: BacklogItem[] = [
    new BacklogItem({
        id: 1,
        title: 'User Authentication',
        description: 'Implement login and registration functionality',
        priority: 1,
        estimatedHours: 8,
        actualHours: 5
    }),
    new BacklogItem({
        id: 2,
        title: 'Dashboard UI',
        description: 'Design and implement the dashboard interface',
        priority: 2,
        estimatedHours: 10,
        actualHours: 6
    }),
];
const getBacklogItemById = ({ id }: { id: number }): BacklogItem | null => {
    try {
        return backlogItems.find((backlog_item) => backlog_item.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllBacklogItems = (): BacklogItem[] => backlogItems;

export default {
    getBacklogItemById,
    getAllBacklogItems
};
