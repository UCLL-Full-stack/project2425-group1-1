import { Sprint } from '../model/sprint';
import { BacklogItem } from '../model/backlog_item';

const sprints: Sprint[] = [
    new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-10-14'),
        backlogItems: [new BacklogItem({
            id: 1,
            title: 'User Authentication',
            description: 'Implement login and registration functionality',
            priority: 1,
            estimatedHours: 8,
            actualHours: 5
        })],
    }),
    new Sprint({
        id: 2,
        name: 'Sprint 2',
        startDate: new Date('2024-11-15'),
        endDate: new Date('2024-11-28'),
        backlogItems: [new BacklogItem({
            id: 2,
            title: 'Dashboard UI',
            description: 'Design and implement the dashboard interface',
            priority: 2,
            estimatedHours: 10,
            actualHours: 6
        })],
    }),
];

const getSprintById = ({ id }: { id: number }): Sprint | null => {
    try {
        return sprints.find((sprint) => sprint.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllSprints = (): Sprint[] => sprints;

const addBacklogItemToSprint = (id: number, backlog_item: BacklogItem): BacklogItem => {
    const sprint = getSprintById({ id: id });
    if (!sprint) throw new Error(`Sprint with id ${id} does not exist.`);
    sprint.getBacklogItems().push(backlog_item);
    return backlog_item;
};

export default {
    getSprintById,
    getAllSprints,
    addBacklogItemToSprint
};
