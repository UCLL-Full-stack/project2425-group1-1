const getAllSprints = () => {
  const token = JSON.parse(localStorage.getItem("auth") ?? "null")?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/sprints", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
};

const getSprintById = (id: string) => {
  const token = JSON.parse(localStorage.getItem("auth") ?? "null")?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/sprints/" + id, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
};

const addBacklogItemsToSprint = (id: string, backlog_item_ids: number[]) => {
  const token = JSON.parse(localStorage.getItem("auth") ?? "null")?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/sprints/" + id + "/backlog_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
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
