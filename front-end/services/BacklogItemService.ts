import { BacklogItem } from "@types";

const createBacklogItem = (backlog_item: BacklogItem) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/backlog_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(backlog_item)
  });
};

const BacklogItemService = {
  createBacklogItem
};

export default BacklogItemService;
