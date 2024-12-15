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
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-15'),
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

    const sprint2 = await prisma.sprint.create({
        data: {
            name: 'Sprint 2',
            startDate: new Date('2023-10-01'),
            endDate: new Date('2023-10-15'),
            productId: product.id,
            teamId: team.id,
        },
    });

    const backlogItem2 = await prisma.backlogItem.create({
        data: {
            title: 'Develop feature X',
            description: 'Implement the feature X as per the requirements.',
            priority: 2,
            estimatedHours: 16,
            actualHours: 0,
            sprints: { connect: { id: sprint2.id } },
        },
    });

    const backlogItem3 = await prisma.backlogItem.create({
        data: {
            title: 'Test feature Y',
            description: 'Perform testing on feature Y to ensure it meets the criteria.',
            priority: 3,
            estimatedHours: 10,
            actualHours: 0,
            sprints: { connect: { id: sprint2.id } },
        },
    });

    const user3 = await prisma.user.create({
        data: {
            password: await bcrypt.hash('charlie', 12),
            firstName: 'Charlie',
            lastName: 'Brown',
            email: 'charlie@ucll.be',
            role: 'user',
            teamMemberships: { connect: { id: team.id } },
        },
    });

    const user4 = await prisma.user.create({
        data: {
            password: await bcrypt.hash('dave', 12),
            firstName: 'Dave',
            lastName: 'Wilson',
            email: 'dave@ucll.be',
            role: 'user',
            teamMemberships: { connect: { id: team.id } },
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
