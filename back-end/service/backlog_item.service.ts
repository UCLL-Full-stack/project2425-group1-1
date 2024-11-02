import backlogItemDB from '../repository/backlog_item.db';
import { BacklogItem } from '../model/backlog_item';
import { BacklogItemDTO } from '../types';
import { throwError } from '../util';

const getAllBacklogItems = (): BacklogItem[] => backlogItemDB.getAll();

const getBacklogItemById = (id: number): BacklogItem => {
    const backlog_item = backlogItemDB.getById({ id });
    if (!backlog_item) throw new Error(`Backlog item with id ${id} does not exist.`);
    return backlog_item;
};

const createBacklogItem = (val: BacklogItemDTO): BacklogItem => {
    return backlogItemDB.create(new BacklogItem({
        title: val.title ?? throwError("title is required"),
        description: val.description ?? throwError("description is required"),
        priority: val.priority ?? throwError("priority is required"),
        estimatedHours: val.estimatedHours ?? throwError("estimatedHours is required"),
        actualHours: val.actualHours ?? 0
    }));
};

export default { getAllBacklogItems, getBacklogItemById, createBacklogItem };
