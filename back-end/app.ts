import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { sprintRouter } from './controller/sprint.routes';
import { backlogItemRouter } from './controller/backlog_item.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import { teamRouter } from './controller/team.routes';

dotenv.config();

const app = express();

// BEGIN Request Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [/^\/api-docs\/?.*/,
            '/users/login',
            '/users/signup',
            '/status']
    })
);
// END Request Middlewares

// BEGIN Routes
app.use('/sprints', sprintRouter);
app.use('/backlog_items', backlogItemRouter);
app.use('/users', userRouter);
app.use('/teams', teamRouter);
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ASSP API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
})));
// END Routes

// BEGIN Response Middlewares
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err.name, message: err.message });
});
// END Response Middlewares

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
