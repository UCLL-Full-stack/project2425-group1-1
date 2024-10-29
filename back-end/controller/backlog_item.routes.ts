/**
 * @swagger
 * components:
 *   schemas:
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
 */
import express, { NextFunction, Request, Response } from 'express';
import backlogItemService from '../service/backlog_item.service';

const backlogItemRouter = express.Router();

/**
 * @swagger
 * /backlog_items:
 *   get:
 *     summary: Retrieve all backlog items
 *     responses:
 *       200:
 *         description: A list of backlog items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BacklogItem'
 */
backlogItemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const backlog_items = await backlogItemService.getAllBacklogItems();
        res.status(200).json(backlog_items);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /backlog_items/{id}:
 *  get:
 *      summary: Get a backlog item by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The backlog item id.
 *      responses:
 *          200:
 *              description: A backlog item object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BacklogItem'
 */
backlogItemRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const backlog_item = await backlogItemService.getBacklogItemById(Number(req.params.id));
        res.status(200).json(backlog_item);
    } catch (error) {
        next(error);
    }
});

export { backlogItemRouter };