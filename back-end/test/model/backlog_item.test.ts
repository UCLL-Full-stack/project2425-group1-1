import { BacklogItem } from '../../model/backlog_item';

test('given: valid values for backlog item, when: backlog item is created, then: backlog item is created with those values', () => {
    // given
    const backlogData = {
        id: 1,
        title: 'Implement Login',
        description: 'Create login functionality for the app',
        priority: 2,
        estimatedHours: 10,
        actualHours: 12,
    };

    // when
    const backlogItem = new BacklogItem(backlogData);

    // then
    expect(backlogItem.getId()).toEqual(backlogData.id);
    expect(backlogItem.getTitle()).toEqual(backlogData.title);
    expect(backlogItem.getDescription()).toEqual(backlogData.description);
    expect(backlogItem.getPriority()).toEqual(backlogData.priority);
    expect(backlogItem.getEstimatedHours()).toEqual(backlogData.estimatedHours);
    expect(backlogItem.getActualHours()).toEqual(backlogData.actualHours);
});

test('given: missing title, when: backlog item is created, then: an error is thrown', () => {
    // given
    const backlogData = {
        title: '',
        description: 'No title provided',
        priority: 1,
        estimatedHours: 8,
        actualHours: 4,
    };

    // when
    const createBacklogItem = () => new BacklogItem(backlogData);

    // then
    expect(createBacklogItem).toThrow('Title is required');
});

test('given: invalid priority, when: backlog item is created, then: an error is thrown', () => {
    // given
    const backlogData = {
        title: 'Feature Testing',
        description: 'Test feature with invalid priority',
        priority: 0,
        estimatedHours: 5,
        actualHours: 5,
    };

    // when
    const createBacklogItem = () => new BacklogItem(backlogData);

    // then
    expect(createBacklogItem).toThrow('Priority must be a positive integer');
});

test('given: negative estimated hours, when: backlog item is created, then: an error is thrown', () => {
    // given
    const backlogData = {
        title: 'Estimate Testing',
        description: 'Test with negative estimated hours',
        priority: 3,
        estimatedHours: -1,
        actualHours: 4,
    };

    // when
    const createBacklogItem = () => new BacklogItem(backlogData);

    // then
    expect(createBacklogItem).toThrow('Estimated hours must be a non-negative number');
});

test('given: negative actual hours, when: backlog item is created, then: an error is thrown', () => {
    // given
    const backlogData = {
        title: 'Actual Hours Testing',
        description: 'Test with negative actual hours',
        priority: 1,
        estimatedHours: 6,
        actualHours: -3,
    };

    // when
    const createBacklogItem = () => new BacklogItem(backlogData);

    // then
    expect(createBacklogItem).toThrow('Actual hours must be a non-negative number');
});
