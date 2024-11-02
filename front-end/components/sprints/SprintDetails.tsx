import React from 'react';
import { Sprint } from '@types';

type Props = {
  sprint: Sprint;
};

const SprintDetails: React.FC<Props> = ({ sprint }: Props) => {
  return (
    <>
      {sprint && (
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{sprint.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{sprint.name}</td>
            </tr>
            <tr>
              <td>Start date:</td>
              <td>{sprint.startDate.toString()}</td>
            </tr>
            <tr>
              <td>End date:</td>
              <td>{sprint.endDate.toString()}</td>
            </tr>
            <tr>
              <td>Backlog Item Count:</td>
              <td>{sprint.backlogItems.length}</td>
            </tr>
          </tbody>
        </table>
      )}
      {sprint.backlogItems && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Priority</th>
              <th scope="col">Estimated hours</th>
              <th scope="col">Actual hours</th>
            </tr>
          </thead>
          <tbody>
            {sprint.backlogItems.map((backlog_item, index) => (
              <tr key={index}>
                <td>{backlog_item.id}</td>
                <td>{backlog_item.title}</td>
                <td>{backlog_item.description}</td>
                <td>{backlog_item.priority}</td>
                <td>{backlog_item.estimatedHours}</td>
                <td>{backlog_item.actualHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SprintDetails;
