import { User } from '../model/user';
import database from './database';

const getByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const user = await database.user.findUnique({
            where: { email },
        });
        if (!user) return null;
        return User.from(user);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const user = await database.user.findUnique({
            where: { id },
        });
        if (!user) return null;
        return User.from(user);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAll = async (): Promise<User[]> => {
    try {
        const users = await database.user.findMany();
        return users.map((x) => User.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const create = async (value: User): Promise<User> => {
    try {
        const newItem = await database.user.create({
            data: {
                firstName: value.getFirstName(),
                lastName: value.getLastName(),
                email: value.getEmail(),
                password: value.getPassword(),
                role: value.getRole(),
            },
        });
        return User.from(newItem);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getByEmail,
    getById,
    getAll,
    create
};
