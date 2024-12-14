import React from 'react';
import { Sprint } from '@types';
import { useTranslation } from 'next-i18next';

type Props = {
  sprint: Sprint;
};

const SprintDetails: React.FC<Props> = ({ sprint }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {sprint && (
        <table>
          <tbody>
            <tr>
              <td>{t('sprintDetails.id')}:</td>
              <td>{sprint.id}</td>
            </tr>
            <tr>
              <td>{t('common.name')}:</td>
              <td>{sprint.name}</td>
            </tr>
            <tr>
              <td>{t('common.startDate')}:</td>
              <td>{sprint.startDate.toString()}</td>
            </tr>
            <tr>
              <td>{t('common.endDate')}:</td>
              <td>{sprint.endDate.toString()}</td>
            </tr>
            <tr>
              <td>{t('sprintDetails.product')}:</td>
              <td>{sprint.product.name}</td>
            </tr>
          </tbody>
        </table>
      )}
      {sprint.backlogItems && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{t('sprintDetails.backlogItems.id')}</th>
              <th scope="col">{t('sprintDetails.backlogItems.title')}</th>
              <th scope="col">{t('sprintDetails.backlogItems.description')}</th>
              <th scope="col">{t('sprintDetails.backlogItems.priority')}</th>
              <th scope="col">{t('sprintDetails.backlogItems.estimatedHours')}</th>
              <th scope="col">{t('sprintDetails.backlogItems.actualHours')}</th>
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
