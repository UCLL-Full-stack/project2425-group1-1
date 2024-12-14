# Back-end

## Prerequisites
We're using SQLite so no database server is necessary.

## Starting the application

Run the following commands in a terminal (**in the `back-end` folder**), to get the application up and running.

```bash
npm install --save-dev
npx prisma generate
npx prisma migrate dev -n init
npx ts-node util/seed.ts
npm start
```
