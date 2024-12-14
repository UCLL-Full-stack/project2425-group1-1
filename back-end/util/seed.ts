// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.backlogItem.deleteMany();
    await prisma.sprint.deleteMany();
    await prisma.product.deleteMany();
    await prisma.team.deleteMany();
    await prisma.user.deleteMany();

    const adminUser = await prisma.user.create({
        data: {
            password: await bcrypt.hash('admin', 12),
            firstName: 'John',
            lastName: 'Doe',
            email: 'administration@ucll.be',
            role: 'admin',
        },
    });

    const product = await prisma.product.create({
        data: {
            name: 'Sample Product',
            description: 'This is a sample product.',
            releaseDate: new Date(),
        },
    });

    const team = await prisma.team.create({
        data: {
            name: 'Development Team',
            description: 'Team responsible for product development',
            ownerId: adminUser.id,
        },
    });

    const user1 = await prisma.user.create({
        data: {
            password: await bcrypt.hash('alice', 12),
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice@ucll.be',
            role: 'user',
            teamMemberships: { connect: { id: team.id } },
        },
    });

    const user2 = await prisma.user.create({
        data: {
            password: await bcrypt.hash('bob', 12),
            firstName: 'Bob',
            lastName: 'Johnson',
            email: 'bob@ucll.be',
            role: 'user',
            teamMemberships: { connect: { id: team.id } },
        },
    });

    const sprint = await prisma.sprint.create({
        data: {
            name: 'Sprint 1',
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
            productId: product.id,
            teamId: team.id,
        },
    });

    const backlogItem = await prisma.backlogItem.create({
        data: {
            title: 'Setup project repository',
            description: 'Initialize the project repository with necessary configurations.',
            priority: 1,
            estimatedHours: 8,
            actualHours: 0,
            sprints: { connect: { id: sprint.id } },
        },
    });

    console.log('Seed data created.');
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
