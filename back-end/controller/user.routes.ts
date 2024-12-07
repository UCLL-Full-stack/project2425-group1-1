/**
 * @swagger
 *   components:
 *    schemas:
 *      AuthResponse:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              description: JWT access token.
 *            email:
 *              type: string
 *              description: User e-mail.
 *            role:
 *             type: '#/components/schemas/Role'
 *             description: User role.
 *      AuthRequest:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              description: User e-mail.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            password:
 *              type: string
 *              description: User password.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      UserDTO:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            password:
 *              type: string
 *              description: User password.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [admin, manager, developer]
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { AuthPayload, AuthRequest, Role, UserDTO } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const request = req as Request & { auth: AuthPayload };
            const users = await userService.getAllUsers(request.auth);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);


/**
 * @swagger
 * /users/signup:
 *   post:
 *      summary: Create a new user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserDTO'
 *      responses:
 *         200:
 *            description: The created user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_input = <UserDTO>req.body;
        res.status(200).json(await userService.createUser(user_input));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Authenticate with credentials.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthRequest'
 *      responses:
 *         200:
 *            description: Authentication response with JWT token.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth_req = <AuthRequest>req.body;
        res.status(200).json(await userService.authenticate(auth_req));
    } catch (error) {
        next(error);
    }
});

export { userRouter };
