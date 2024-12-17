/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: ID for the team.
 *         name:
 *           type: string
 *           description: Name of the team.
 *         description:
 *           type: string
 *           description: Description of the team.
 *         owner:
 *           $ref: '#/components/schemas/User'
 *           description: The owner of the team.
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: List of team members.
 *         sprints:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Sprint'
 *           description: List of sprints associated with the team.
 */
import express, { NextFunction, Request, Response } from 'express';
import teamService from '../service/team.service';

const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieve all teams
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams/{id}:
 *  get:
 *      summary: Get a team by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The team id.
 *      responses:
 *          200:
 *              description: A team object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Team'
 */
teamRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await teamService.getTeamById(Number(req.params.id));
        res.status(200).json(team);
    } catch (error) {
        next(error);
    }
});

export { teamRouter };
