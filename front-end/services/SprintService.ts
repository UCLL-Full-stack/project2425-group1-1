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

const addBacklogItemsToSprint = (id: string, backlog_item_ids: number[]) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/sprints/" + id + "/backlog_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(backlog_item_ids)
  });
};

const SprintService = {
  getAllSprints,
  getSprintById,
  addBacklogItemsToSprint
};

export default SprintService;
