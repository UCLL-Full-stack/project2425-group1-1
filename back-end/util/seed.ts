// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            password: await bcrypt.hash('admin', 12),
            firstName: 'John',
            lastName: 'Doe',
            email: 'administration@ucll.be',
            role: 'admin',
        },
    });
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
