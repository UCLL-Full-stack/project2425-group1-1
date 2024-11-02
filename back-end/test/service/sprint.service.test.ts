import sprintDB from '../../repository/sprint.db';
import backlogItemDB from '../../repository/backlog_item.db';
import sprintService from '../../service/sprint.service';
import { Sprint } from '../../model/sprint';
import { BacklogItem } from '../../model/backlog_item';
import { Product } from '../../model/product';

let mockSprint: Sprint;
let mockBacklogItem: BacklogItem;
let mockProduct: Product;

beforeEach(() => {
    mockProduct = new Product({
        id: 1,
        name: 'Product 1',
        description: 'A sample product',
        releaseDate: new Date()
    });
});

test('given: a set of sprints, when: getAllSprints is called, then: it should return all sprints', () => {
    // given
    mockSprint = new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date(),
        endDate: new Date(),
        backlogItems: [],
        product: mockProduct,
    });
    const mockSprints = [mockSprint];

    sprintDB.getAll = jest.fn().mockReturnValue(mockSprints);

    // when
    const result = sprintService.getAllSprints();

    // then
    expect(result).toEqual(mockSprints);
    expect(sprintDB.getAll).toHaveBeenCalledTimes(1);
});

test('given: a sprint ID, when: getSprintById is called, then: it should return the sprint by ID', () => {
    // given
    mockSprint = new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date(),
        endDate: new Date(),
        backlogItems: [],
        product: mockProduct,
    });
    const id = 1;

    sprintDB.getById = jest.fn().mockReturnValue(mockSprint);

    // when
    const result = sprintService.getSprintById(id);

    // then
    expect(result).toEqual(mockSprint);
    expect(sprintDB.getById).toHaveBeenCalledWith({ id });
});

test('given: a non-existing sprint ID, when: getSprintById is called, then: it should throw an error', () => {
    // given
    const id = 999;

    sprintDB.getById = jest.fn().mockReturnValue(null);

    // when
    const getSprint = () => sprintService.getSprintById(id);

    // then
    expect(getSprint).toThrow(`Sprint with id ${id} does not exist.`);
});

test('given: a sprint and backlog item IDs, when: addBacklogItemsToSprint is called, then: it should add backlog items to the sprint', () => {
    // given
    mockSprint = new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date(),
        endDate: new Date(),
        backlogItems: [],
        product: mockProduct,
    });

    mockBacklogItem = new BacklogItem({
        id: 1,
        title: 'Backlog Item 1',
        description: 'Description',
        priority: 1,
        estimatedHours: 2,
        actualHours: 0,
    });

    const sprintId = 1;
    const backlogItemIds = [1];

    sprintDB.getById = jest.fn().mockReturnValue(mockSprint);
    backlogItemDB.getById = jest.fn().mockReturnValue(mockBacklogItem);

    // when
    const result = sprintService.addBacklogItemsToSprint(sprintId, backlogItemIds);

    // then
    expect(result).toEqual([mockBacklogItem]);
    expect(mockSprint.getBacklogItems()).toContain(mockBacklogItem);
    expect(sprintDB.getById).toHaveBeenCalledWith({ id: sprintId });
    expect(backlogItemDB.getById).toHaveBeenCalledWith({ id: 1 });
});

test('given: a non-existing sprint ID, when: addBacklogItemsToSprint is called, then: it should throw an error', () => {
    // given
    const sprintId = 999;
    const backlogItemIds = [1];

    sprintDB.getById = jest.fn().mockReturnValue(null);

    // when
    const addItems = () => sprintService.addBacklogItemsToSprint(sprintId, backlogItemIds);

    // then
    expect(addItems).toThrow(`Sprint with id ${sprintId} does not exist.`);
});

test('given: a sprint containing an existing backlog item, when: addBacklogItemsToSprint is called, then: it should throw an error', () => {
    // given
    mockSprint = new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date(),
        endDate: new Date(),
        backlogItems: [mockBacklogItem],
        product: mockProduct,
    });

    const sprintId = 1;
    const backlogItemIds = [1];

    sprintDB.getById = jest.fn().mockReturnValue(mockSprint);
    backlogItemDB.getById = jest.fn().mockReturnValue(mockBacklogItem);

    // when
    const addItems = () => sprintService.addBacklogItemsToSprint(sprintId, backlogItemIds);

    // then
    expect(addItems).toThrow(`Backlog item with id ${backlogItemIds[0]} already exists in this sprint.`);
});

test('given: a sprint and a non-existing backlog item ID, when: addBacklogItemsToSprint is called, then: it should throw an error', () => {
    // given
    mockSprint = new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date(),
        endDate: new Date(),
        backlogItems: [],
        product: mockProduct,
    });

    const sprintId = 1;
    const backlogItemIds = [1];

    sprintDB.getById = jest.fn().mockReturnValue(mockSprint);
    backlogItemDB.getById = jest.fn().mockReturnValue(null);

    // when
    const addItems = () => sprintService.addBacklogItemsToSprint(sprintId, backlogItemIds);

    // then
    expect(addItems).toThrow(`Backlog item with id ${backlogItemIds[0]} does not exist.`);
});
