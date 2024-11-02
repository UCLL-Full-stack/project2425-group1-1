import { Team } from '../../model/team';
import { User } from '../../model/user';
import { Sprint } from '../../model/sprint';
import { Product } from '../../model/product';

test('given: valid values for team, when: team is created, then: team is created with those values', () => {
    // given
    const owner = new User({
        id: 1,
        firstName: 'Owner',
        lastName: 'One',
        email: 'owner.one@example.com',
        role: 'owner',
    });

    const member = new User({
        id: 2,
        firstName: 'Member',
        lastName: 'Two',
        email: 'member.two@example.com',
        role: 'developer',
    });

    const sprint = new Sprint({
        id: 1,
        name: 'Sprint 1',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-14'),
        backlogItems: [],
        product: new Product({ id: 1, name: 'Product X', description: 'Product X Description', releaseDate: new Date('2023-10-01') }),
    });

    const teamData = {
        id: 1,
        name: 'Team Alpha',
        description: 'Development team working on project Alpha',
        owner: owner,
        members: [member],
        sprints: [sprint],
    };

    // when
    const team = new Team(teamData);

    // then
    expect(team.getId()).toEqual(teamData.id);
    expect(team.getName()).toEqual(teamData.name);
    expect(team.getDescription()).toEqual(teamData.description);
    expect(team.getOwner()).toEqual(owner);
    expect(team.getMembers()).toContain(member);
    expect(team.getSprints()).toContain(sprint);
});

test('given: missing team name, when: team is created, then: an error is thrown', () => {
    // given
    const teamData = {
        name: '', // empty name
        description: 'Team description',
        owner: new User({
            firstName: 'Owner',
            lastName: 'One',
            email: 'owner.one@example.com',
            role: 'owner',
        }),
    };

    // when
    const createTeam = () => new Team(teamData);

    // then
    expect(createTeam).toThrow('Team name is required');
});

test('given: missing team description, when: team is created, then: an error is thrown', () => {
    // given
    const teamData = {
        name: 'Team Alpha',
        description: '', // empty description
        owner: new User({
            firstName: 'Owner',
            lastName: 'One',
            email: 'owner.one@example.com',
            role: 'owner',
        }),
    };

    // when
    const createTeam = () => new Team(teamData);

    // then
    expect(createTeam).toThrow('Description is required');
});

test('given: valid team without members or sprints, when: team is created, then: team is created with empty members and sprints', () => {
    // given
    const teamData = {
        id: 1,
        name: 'Team Beta',
        description: 'Beta team',
        owner: new User({
            firstName: 'Owner',
            lastName: 'One',
            email: 'owner.one@example.com',
            role: 'owner',
        }),
    };

    // when
    const team = new Team(teamData);

    // then
    expect(team.getMembers()).toEqual([]);
    expect(team.getSprints()).toEqual([]);
});

test('given: a team with multiple members, when: team is created, then: team includes all members', () => {
    // given
    const member1 = new User({
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        role: 'developer',
    });

    const member2 = new User({
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        role: 'tester',
    });

    const teamData = {
        id: 2,
        name: 'Team Gamma',
        description: 'Gamma project team',
        owner: new User({
            firstName: 'Owner',
            lastName: 'Two',
            email: 'owner.two@example.com',
            role: 'owner',
        }),
        members: [member1, member2],
    };

    // when
    const team = new Team(teamData);

    // then
    expect(team.getMembers()).toContain(member1);
    expect(team.getMembers()).toContain(member2);
});
