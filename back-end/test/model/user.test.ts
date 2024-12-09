import { User } from '../../model/user';
import { Role } from '../../types';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given
    const userData = {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'aaa',
        role: 'user' as Role,
    };

    // when
    const user = new User(userData);

    // then
    expect(user.getId()).toEqual(userData.id);
    expect(user.getFirstName()).toEqual(userData.firstName);
    expect(user.getLastName()).toEqual(userData.lastName);
    expect(user.getEmail()).toEqual(userData.email);
    expect(user.getRole()).toEqual(userData.role);
});

test('given: missing first name, when: user is created, then: an error is thrown', () => {
    // given
    const userData = {
        firstName: '',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'aaa',
        role: 'user' as Role,
    };

    // when
    const createUser = () => new User(userData);

    // then
    expect(createUser).toThrow('First name is required');
});

test('given: missing last name, when: user is created, then: an error is thrown', () => {
    // given
    const userData = {
        firstName: 'Jane',
        lastName: '',
        email: 'jane.doe@example.com',
        password: 'aaa',
        role: 'user' as Role,
    };

    // when
    const createUser = () => new User(userData);

    // then
    expect(createUser).toThrow('Last name is required');
});

test('given: missing email, when: user is created, then: an error is thrown', () => {
    // given
    const userData = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: '',
        password: 'aaa',
        role: 'user' as Role,
    };

    // when
    const createUser = () => new User(userData);

    // then
    expect(createUser).toThrow('Email is required');
});
