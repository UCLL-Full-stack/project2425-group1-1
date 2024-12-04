import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;

    constructor(user: { id?: number; firstName: string; lastName: string; email: string; password: string; role: Role }) {
        this.validate(user);

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    static from({
        id,
        firstName,
        lastName,
        email,
        password,
        role
    }: UserPrisma): User {
        return new User({
            id,
            firstName,
            lastName,
            email,
            password,
            role: role as Role
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    private validate(user: { id?: number; firstName: string; lastName: string; email: string; password: string; role: Role }) {
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }
}
