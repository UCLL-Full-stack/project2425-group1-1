import React from 'react';
import { User } from '@types';
import { useTranslation } from 'next-i18next';

type Props = {
  users: User[] | null;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{t('common.firstName')}</th>
              <th scope="col">{t('common.lastName')}</th>
              <th scope="col">{t('common.email')}</th>
              <th scope="col">{t('userOverviewTable.role')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverviewTable;
