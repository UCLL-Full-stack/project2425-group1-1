const getAllSprints = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/sprints", {
    method: "GET"
  });
};

const getSprintById = (id: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/sprints/" + id, {
    method: "GET"
  });
};

const SprintService = {
  getAllSprints,
  getSprintById
};

export default SprintService;
