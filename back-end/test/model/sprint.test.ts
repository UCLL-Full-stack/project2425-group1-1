import { Sprint } from '../../model/sprint';
import { Product } from '../../model/product';
import { BacklogItem } from '../../model/backlog_item';

test('given: valid values for sprint, when: sprint is created, then: sprint is created with those values', () => {
    // given
    const product = new Product({
        id: 1,
        name: 'Product X',
        description: 'Description for Product X',
        releaseDate: new Date('2023-10-01'),
    });

    const backlogItem = new BacklogItem({
        id: 1,
        title: 'Initial Setup',
        description: 'Set up the project repository and CI/CD pipeline',
        priority: 1,
        estimatedHours: 8,
        actualHours: 7,
    });

    const sprintData = {
        id: 1,
        name: 'Sprint 1',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-14'),
        backlogItems: [backlogItem],
        product: product,
    };

    // when
    const sprint = new Sprint(sprintData);

    // then
    expect(sprint.getId()).toEqual(sprintData.id);
    expect(sprint.getName()).toEqual(sprintData.name);
    expect(sprint.getStartDate()).toEqual(sprintData.startDate);
    expect(sprint.getEndDate()).toEqual(sprintData.endDate);
    expect(sprint.getBacklogItems()).toContain(backlogItem);
    expect(sprint.getProduct()).toEqual(product);
});

test('given: missing name, when: sprint is created, then: an error is thrown', () => {
    // given
    const sprintData = {
        name: '',  // empty name
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-14'),
        backlogItems: [],
        product: new Product({
            id: 1,
            name: 'Product X',
            description: 'Description for Product X',
            releaseDate: new Date('2023-10-01'),
        }),
    };

    // when
    const createSprint = () => new Sprint(sprintData);

    // then
    expect(createSprint).toThrow('Sprint name is required');
});
