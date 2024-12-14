import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import { User } from '@types';
import UserService from '@services/UserService';
import UserOverviewTable from '@components/users/UserOverviewTable';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const Users: React.FC = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<Array<User>>();

    const getUsers = async () => {
        const resp = await UserService.getAllUsers();
        setUsers(await resp.json());
    };

    useEffect(() => { getUsers() }, []);

    return (
        <>
            <Head>
                <title>{t('users.title')}</title>
            </Head>
            <Header />
            <main>
                <h1>{t('users.title')}</h1>
                <section>
                    <h2>{t('users.overview')}</h2>
                    {
                        users && (<UserOverviewTable users={users} />)
                    }
                </section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Users;
