import backlogItemDB from '../../repository/backlog_item.db';
import backlogItemService from '../../service/backlog_item.service';
import { BacklogItem } from '../../model/backlog_item';
import { BacklogItemDTO } from '../../types';

let mockBacklogItem: BacklogItem;

test('given: a set of backlog items, when: getAllBacklogItems is called, then: it should return all backlog items', async () => {
    // given
    mockBacklogItem = new BacklogItem({
        title: 'Test Backlog Item',
        description: 'This is a test backlog item',
        priority: 1,
        estimatedHours: 5,
        actualHours: 0,
    });
    const mockBacklogItems = [mockBacklogItem];

    backlogItemDB.getAll = jest.fn().mockReturnValue(mockBacklogItems);

    // when
    const result = await backlogItemService.getAllBacklogItems();

    // then
    expect(result).toEqual(mockBacklogItems);
    expect(backlogItemDB.getAll).toHaveBeenCalledTimes(1);
});

test('given: a backlog item ID, when: getBacklogItemById is called, then: it should return the backlog item by ID', async () => {
    // given
    mockBacklogItem = new BacklogItem({
        title: 'Test Backlog Item',
        description: 'This is a test backlog item',
        priority: 1,
        estimatedHours: 5,
        actualHours: 0,
    });
    const id = 1;

    backlogItemDB.getById = jest.fn().mockReturnValue(mockBacklogItem);

    // when
    const result = await backlogItemService.getBacklogItemById(id);

    // then
    expect(result).toEqual(mockBacklogItem);
    expect(backlogItemDB.getById).toHaveBeenCalledWith({ id });
});

test('given: a non-existing backlog item ID, when: getBacklogItemById is called, then: it should throw an error', async () => {
    // given
    const id = 999;

    backlogItemDB.getById = jest.fn().mockReturnValue(null);

    // when
    const getBacklogItem = () => backlogItemService.getBacklogItemById(id);

    // then
    await expect(getBacklogItem).rejects.toThrow(`Backlog item with id ${id} does not exist.`);
});

test('given: a backlog item DTO, when: createBacklogItem is called, then: it should create a new backlog item', async () => {
    // given
    const backlogItemDTO = {
        title: 'New Backlog Item',
        description: 'Description for new backlog item',
        priority: 2,
        estimatedHours: 8,
        actualHours: 0,
    };
    mockBacklogItem = new BacklogItem(backlogItemDTO);

    backlogItemDB.create = jest.fn().mockReturnValue(mockBacklogItem);

    // when
    const result = await backlogItemService.createBacklogItem(backlogItemDTO);

    // then
    expect(result).toEqual(mockBacklogItem);
    expect(backlogItemDB.create).toHaveBeenCalledWith(expect.any(BacklogItem));
});

test('given: a backlog item DTO without a title, when: createBacklogItem is called, then: it should throw an error', async () => {
    // given
    const backlogItemDTO: BacklogItemDTO = {
        description: 'Description',
        priority: 1,
        estimatedHours: 2,
        actualHours: 0,
    };

    // when
    const createBacklogItem = () => backlogItemService.createBacklogItem(backlogItemDTO);

    // then
    await expect(createBacklogItem).rejects.toThrow('title is required');
});

test('given: a backlog item DTO without a description, when: createBacklogItem is called, then: it should throw an error', async () => {
    // given
    const backlogItemDTO: BacklogItemDTO = {
        title: 'Test Item',
        priority: 1,
        estimatedHours: 2,
        actualHours: 0,
    };

    // when
    const createBacklogItem = () => backlogItemService.createBacklogItem(backlogItemDTO);

    // then
    await expect(createBacklogItem).rejects.toThrow('description is required');
});

test('given: a backlog item DTO without a priority, when: createBacklogItem is called, then: it should throw an error', async () => {
    // given
    const backlogItemDTO: BacklogItemDTO = {
        title: 'Test Item',
        description: 'Description',
        estimatedHours: 2,
        actualHours: 0,
    };

    // when
    const createBacklogItem = () => backlogItemService.createBacklogItem(backlogItemDTO);

    // then
    await expect(createBacklogItem).rejects.toThrow('priority is required');
});

test('given: a backlog item DTO without estimated hours, when: createBacklogItem is called, then: it should throw an error', async () => {
    // given
    const backlogItemDTO: BacklogItemDTO = {
        title: 'Test Item',
        description: 'Description',
        priority: 1,
        actualHours: 0,
    };

    // when
    const createBacklogItem = () => backlogItemService.createBacklogItem(backlogItemDTO);

    // then
    await expect(createBacklogItem).rejects.toThrow('estimatedHours is required');
});
