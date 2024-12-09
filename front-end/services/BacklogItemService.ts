import { BacklogItem } from "@types";

const createBacklogItem = (backlog_item: BacklogItem) => {
  const token = JSON.parse(localStorage.getItem("auth") ?? "null")?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/backlog_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(backlog_item)
  });
};

const BacklogItemService = {
  createBacklogItem
};

export default BacklogItemService;
