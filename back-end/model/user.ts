export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private role: string;

    constructor(user: { id?: number; firstName: string; lastName: string; email: string; role: string }) {
        this.validate(user);

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
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

    getRole(): string {
        return this.role;
    }

    private validate(user: { id?: number; firstName: string; lastName: string; email: string; role: string }) {
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }
}
