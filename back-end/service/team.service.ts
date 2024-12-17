import teamDB from '../repository/team.db';
import { Team } from '../model/team';

const getAllTeams = (): Promise<Team[]> => teamDB.getAll();

const getTeamById = async (id: number): Promise<Team> => {
    const team = await teamDB.getById({ id });
    if (!team) throw new Error(`Team with id ${id} does not exist.`);

    return team;
};

export default { getAllTeams, getTeamById };
