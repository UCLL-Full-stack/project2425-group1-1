import React, { useState } from "react";
import { Sprint, BacklogItem, ErrorResponse } from "@types";
import SprintService from "@services/SprintService";
import BacklogItemService from "@services/BacklogItemService";
import styles from "@styles/form.module.css";

type Props = {
  sprint: Sprint;
  sprintUpdatedCallback: () => void;
};

const CreateBacklogItemForm: React.FC<Props> = ({ sprint, sprintUpdatedCallback }: Props) => {
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget);
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    let resp = await BacklogItemService.createBacklogItem({
      title: form.get("title") as string,
      description: form.get("description") as string,
      priority: Number(form.get("priority")),
      estimatedHours: Number(form.get("estimatedHours")),
    });

    if (!resp.ok) {
      const error = await resp.json() as ErrorResponse;
      setErrorMessage(error.message);
      return;
    }

    if (sprint.id == undefined)
      return;

    const backlog_item = await resp.json() as BacklogItem;
    resp = await SprintService.addBacklogItemsToSprint(String(sprint.id), [backlog_item.id ?? -1]);
    if (!resp.ok) {
      const error = await resp.json() as ErrorResponse;
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("Successfully added!");
    sprintUpdatedCallback();
  };

  return (
    <>
      {successMessage && (<div className="alert alert-success" role="alert">
        {successMessage}
      </div>
      )}
      {errorMessage && (<div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
      )}
      {sprint && (
        <>
          <form onSubmit={submitHandler} className={styles.classicForm}>
            <label htmlFor="formTitle">Title</label>
            <input className="form-control" id="formTitle" required name="title" />
            <label htmlFor="formDescription">Description</label>
            <input className="form-control" id="formDescription" required name="description" />
            <label htmlFor="formPriority">Priority</label>
            <input className="form-control" id="formPriority" required type="number" name="priority" />
            <label htmlFor="formEstimatedHours">Estimated Hours</label>
            <input className="form-control" id="formEstimatedHours" required type="number" name="estimatedHours" />
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </>
      )}
    </>
  );
};

export default CreateBacklogItemForm;
