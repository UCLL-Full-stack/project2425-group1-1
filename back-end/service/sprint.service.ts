import sprintDB from '../repository/sprint.db';
import { Sprint } from '../model/sprint';

const getAllSprints = (): Sprint[] => sprintDB.getAllSprints();

const getSprintById = (id: number): Sprint => {
    const sprint = sprintDB.getSprintById({ id });
    if (!sprint) throw new Error(`Sprint with id ${id} does not exist.`);
    return sprint;
};

export default { getAllSprints, getSprintById };
