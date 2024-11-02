import backlogItemDB from '../repository/backlog_item.db';
import { BacklogItem } from '../model/backlog_item';
import { BacklogItemDTO } from '../types';

const getAllBacklogItems = (): BacklogItem[] => backlogItemDB.getAllBacklogItems();

const getBacklogItemById = (id: number): BacklogItem => {
    const backlog_item = backlogItemDB.getBacklogItemById({ id });
    if (!backlog_item) throw new Error(`Backlog item with id ${id} does not exist.`);
    return backlog_item;
};

const createBacklogItem = (val: BacklogItemDTO): BacklogItem => {
    return backlogItemDB.createBacklogItem(new BacklogItem({
        title: val.title ?? (() => { throw new Error("title is required") })(),
        description: val.description ?? (() => { throw new Error("description is required") })(),
        priority: val.priority ?? (() => { throw new Error("priority is required") })(),
        estimatedHours: val.estimatedHours ?? (() => { throw new Error("estimatedHours is required") })(),
        actualHours: val.actualHours ?? 0
    }));
};

export default { getAllBacklogItems, getBacklogItemById, createBacklogItem };
