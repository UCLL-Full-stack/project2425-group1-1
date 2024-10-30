import React from 'react';
import { Sprint } from '@types';

type Props = {
  sprints: Sprint[] | null;
};

const TeamOverviewTable: React.FC<Props> = ({ sprints }: Props) => {
  return (
    <>
      {sprints && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Start date</th>
              <th scope="col">End date</th>
              <th scope="col">Backlog item count</th>
            </tr>
          </thead>
          <tbody>
            {sprints.map((sprint, index) => (
              <tr key={index} onClick={() => { }} role="button">
                <td>{sprint.name}</td>
                <td>{sprint.startDate.toString()}</td>
                <td>{sprint.endDate.toString()}</td>
                <td>{sprint.backlogItems.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TeamOverviewTable;
