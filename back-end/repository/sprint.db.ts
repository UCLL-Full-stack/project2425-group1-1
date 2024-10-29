import { Sprint } from '../model/sprint';
import { BacklogItem } from '../model/backlog_item';
import { Product } from '../model/product';
import { Team } from '../model/team';

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

const team = new Team({
    id: 1,
    name: 'Developer Team',
    description: 'Team responsible for the project development'
});

const sprints: Sprint[] = [
    new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-10-14'),
        backlogItems: backlogItems,
        team: team,
    }),
    new Sprint({
        id: 2,
        name: 'Sprint 2',
        startDate: new Date('2024-11-15'),
        endDate: new Date('2024-11-28'),
        backlogItems: backlogItems,
        team: team,
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

export default {
    getSprintById,
    getAllSprints
};
