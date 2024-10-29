import backlogItemDB from '../repository/backlog_item.db';
import { BacklogItem } from '../model/backlog_item';

const getAllBacklogItems = (): BacklogItem[] => backlogItemDB.getAllBacklogItems();

const getBacklogItemById = (id: number): BacklogItem => {
    const backlog_item = backlogItemDB.getBacklogItemById({ id });
    if (!backlog_item) throw new Error(`Backlog item with id ${id} does not exist.`);
    return backlog_item;
};

export default { getAllBacklogItems, getBacklogItemById };
