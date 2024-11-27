import backlogItemDB from '../repository/backlog_item.db';
import { BacklogItem } from '../model/backlog_item';
import { BacklogItemDTO } from '../types';
import { throwError } from '../util';

const getAllBacklogItems = async (): Promise<BacklogItem[]> => backlogItemDB.getAll();

const getBacklogItemById = async (id: number): Promise<BacklogItem> => {
    const backlog_item = await backlogItemDB.getById({ id });
    if (!backlog_item) throw new Error(`Backlog item with id ${id} does not exist.`);
    return backlog_item;
};

const createBacklogItem = async (val: BacklogItemDTO): Promise<BacklogItem> => {
    return await backlogItemDB.create(new BacklogItem({
        title: val.title ?? throwError("title is required"),
        description: val.description ?? throwError("description is required"),
        priority: val.priority ?? throwError("priority is required"),
        estimatedHours: val.estimatedHours ?? throwError("estimatedHours is required"),
        actualHours: val.actualHours ?? 0
    }));
};

export default { getAllBacklogItems, getBacklogItemById, createBacklogItem };
