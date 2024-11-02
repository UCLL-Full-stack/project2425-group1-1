import { Sprint } from '../model/sprint';
import { BacklogItem } from '../model/backlog_item';
import productDB from './product.db';
import backlogItemDB from './backlog_item.db';
import { Product } from '../model/product';


const sprints: Sprint[] = [
    new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-10-14'),
        backlogItems: [<BacklogItem>backlogItemDB.getBacklogItemById({ id: 1 })],
        product: <Product>productDB.getProductById({ id: 1 })
    }),
    new Sprint({
        id: 2,
        name: 'Sprint 2',
        startDate: new Date('2024-11-15'),
        endDate: new Date('2024-11-28'),
        backlogItems: [<BacklogItem>backlogItemDB.getBacklogItemById({ id: 2 })],
        product: <Product>productDB.getProductById({ id: 2 })
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
