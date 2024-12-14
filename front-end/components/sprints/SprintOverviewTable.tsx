import React from 'react';
import { Sprint } from '@types';
import { useTranslation } from 'next-i18next';

type Props = {
  sprints: Sprint[] | null;
  selectSprint: (sprint: Sprint) => void;
};

const SprintOverviewTable: React.FC<Props> = ({ sprints, selectSprint }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {sprints && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{t('common.name')}</th>
              <th scope="col">{t('common.startDate')}</th>
              <th scope="col">{t('common.endDate')}</th>
              <th scope="col">{t('common.backlogItemCount')}</th>
            </tr>
          </thead>
          <tbody>
            {sprints.map((sprint, index) => (
              <tr key={index} onClick={() => { selectSprint(sprint) }} role="button">
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

export default SprintOverviewTable;
