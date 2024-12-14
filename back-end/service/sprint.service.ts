import sprintDB from '../repository/sprint.db';
import backlogItemDB from '../repository/backlog_item.db';
import { Sprint } from '../model/sprint';
import { BacklogItem } from '../model/backlog_item';

const getAllSprints = (): Promise<Sprint[]> => sprintDB.getAll();

const getSprintById = async (id: number): Promise<Sprint> => {
    const sprint = await sprintDB.getById({ id });
    if (!sprint) throw new Error(`Sprint with id ${id} does not exist.`);

    return sprint;
};

const addBacklogItemsToSprint = async (sprint_id: number, backlog_item_ids: number[]): Promise<BacklogItem[]> => {
    const sprint = await sprintDB.getById({ id: sprint_id });
    if (!sprint) throw new Error(`Sprint with id ${sprint_id} does not exist.`);

    const itemsToAdd: BacklogItem[] = [];
    await Promise.all(backlog_item_ids.map(async backlog_item_id => {
        const exists = sprint.getBacklogItems().some(x => x.getId() === backlog_item_id);
        if (exists) throw new Error(`Backlog item with id ${backlog_item_id} already exists in this sprint.`);

        const backlogItem = await backlogItemDB.getById({ id: backlog_item_id });
        if (!backlogItem) throw new Error(`Backlog item with id ${backlog_item_id} does not exist.`);
        itemsToAdd.push(backlogItem);
    }));

    sprint.getBacklogItems().push(...itemsToAdd);
    await sprintDB.save(sprint);

    return itemsToAdd;
};

export default { getAllSprints, getSprintById, addBacklogItemsToSprint };
