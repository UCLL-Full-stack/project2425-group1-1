/**
 * @swagger
 * components:
 *   schemas:
 *     Sprint:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: ID for the sprint.
 *         name:
 *           type: string
 *           description: Name of the sprint.
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the sprint.
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: End date of the sprint.
 *         backlogItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BacklogItem'
 *           description: List of backlog items associated with the sprint.
 *         team:
 *           $ref: '#/components/schemas/Team'
 *           description: The team responsible for the sprint.
 *     BacklogItem:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: ID for the backlog item.
 *         title:
 *           type: string
 *           description: Title of the backlog item.
 *         description:
 *           type: string
 *           description: Detailed description of the backlog item.
 *         priority:
 *           type: number
 *           description: Priority of the backlog item.
 *         estimatedHours:
 *           type: number
 *           description: Estimated hours to complete the backlog item.
 *         actualHours:
 *           type: number
 *           description: Actual hours spent on the backlog item.
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
 *         members:
 *           type: array
 *           description: List of team members.
 */
import express, { NextFunction, Request, Response } from 'express';
import sprintService from '../service/sprint.service';

const sprintRouter = express.Router();

/**
 * @swagger
 * /sprints:
 *   get:
 *     summary: Retrieve all sprints
 *     responses:
 *       200:
 *         description: A list of sprints.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sprint'
 */
sprintRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sprints = await sprintService.getAllSprints();
        res.status(200).json(sprints);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /sprints/{id}:
 *  get:
 *      summary: Get a sprint by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The sprint id.
 *      responses:
 *          200:
 *              description: A sprint object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Sprint'
 */
sprintRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sprint = sprintService.getSprintById(Number(req.params.id));
        res.status(200).json(sprint);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /sprints/{id}/backlog_items:
 *   post:
 *     summary: Add backlog items to a sprint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The sprint id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: integer
 *     responses:
 *       200:
 *         description: Successfully added backlog items to the sprint.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BacklogItem'
 */
sprintRouter.post('/:id/backlog_items', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sprint_id = Number(req.params.id);
        const backlog_item_ids = <number[]>req.body;
        res.status(200).json(sprintService.addBacklogItemsToSprint(sprint_id, backlog_item_ids));
    } catch (error) {
        next(error);
    }
});

export { sprintRouter };