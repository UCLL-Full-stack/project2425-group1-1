import bcrypt from 'bcrypt';
import { User } from '../model/user';
import userDB from '../repository/user.db';
import { UserDTO, AuthResponse, AuthRequest, AuthPayload } from '../types';
import { generateJWTtoken, throwError } from '../util'

const getAllUsers = async ({ user_id, role }: AuthPayload): Promise<UserDTO[]> => {
    let users: User[];
    if (role == "admin")
        users = await userDB.getAll();
    else
        users = [await userDB.getById({ id: user_id }) ?? throwError("user is null")];
    return users.map(({ password, ...user }) => user);
}

const createUser = async ({
    firstName, lastName, email, password
}: UserDTO): Promise<UserDTO> => {
    if (firstName == undefined) throw new Error("firstName is required");
    if (lastName == undefined) throw new Error("lastName is required");
    if (email == undefined) throw new Error("email is required");
    if (password == undefined) throw new Error("password is required");

    if (await userDB.getByEmail({ email }))
        throw new Error(`User with email: ${email} already exists.`);

    password = await bcrypt.hash(password, 12);
    const { password: hashedPassword, ...user } = await userDB.create(new User({
        firstName,
        lastName,
        email,
        password,
        role: "user"
    }));
    return user;
};

const authenticate = async ({
    email, password
}: AuthRequest): Promise<AuthResponse> => {
    if (email == undefined) throw new Error("email is required");
    if (password == undefined) throw new Error("password is required");

    const user = await userDB.getByEmail({ email });
    if (!user)
        throw new Error('Invalid credentials.');

    if (!bcrypt.compare(password, user.getPassword()))
        throw new Error('Invalid credentials.');

    return {
        token: generateJWTtoken({
            user_id: user.getId() ?? throwError("id is null"),
            role: user.getRole()
        }),
        email: user.getEmail(),
        role: user.getRole()
    };
};

export default { createUser, getAllUsers, authenticate };
