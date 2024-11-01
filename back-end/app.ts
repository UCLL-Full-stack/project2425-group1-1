import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { sprintRouter } from './controller/sprint.routes';
import { backlogItemRouter } from './controller/backlog_item.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/sprints', sprintRouter);
app.use('/backlog_items', backlogItemRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err.name, message: err.message });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
