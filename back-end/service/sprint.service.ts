import sprintDB from '../repository/sprint.db';
import backlogItemDB from '../repository/backlog_item.db';
import { Sprint } from '../model/sprint';
import { BacklogItem } from '../model/backlog_item';

const getAllSprints = (): Sprint[] => sprintDB.getAllSprints();

const getSprintById = (id: number): Sprint => {
    const sprint = sprintDB.getSprintById({ id });
    if (!sprint) throw new Error(`Sprint with id ${id} does not exist.`);

    return sprint;
};

const addBacklogItemsToSprint = (sprint_id: number, backlog_item_ids: number[]): BacklogItem[] => {
    const sprint = sprintDB.getSprintById({ id: sprint_id });
    if (!sprint) throw new Error(`Sprint with id ${sprint_id} does not exist.`);

    const addedBacklogItems: BacklogItem[] = [];
    backlog_item_ids.forEach(backlog_item_id => {
        const exists = sprint.getBacklogItems().some(x => x.getId() === backlog_item_id);
        if (exists) throw new Error(`Backlog item with id ${backlog_item_id} already exists in this sprint.`);

        const backlogItem = backlogItemDB.getBacklogItemById({ id: backlog_item_id });
        if (!backlogItem) throw new Error(`Backlog item with id ${backlog_item_id} does not exist.`);

        sprintDB.addBacklogItemToSprint(sprint_id, backlogItem);
        addedBacklogItems.push(backlogItem);
    });

    return addedBacklogItems;
};

export default { getAllSprints, getSprintById, addBacklogItemsToSprint };
