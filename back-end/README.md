# Back-end

## Starting the application

Run the following commands in a terminal (**within the `back-end` folder**), to get the application up and running.

```console
> npm install
> npx prisma migrate dev
> npx ts-node .\util\seed.ts
> npm start
```

## Testing

Open your browser and navigate to <http://localhost:3000/status>.
A message saying "Back-end is running..." should appear.
If this is the case, you have succesfully completed the installation process.
