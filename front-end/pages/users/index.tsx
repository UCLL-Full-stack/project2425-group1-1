import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import { User } from '@types';
import UserService from '@services/UserService';
import UserOverviewTable from '@components/users/UserOverviewTable';

const Users: React.FC = () => {
    const [users, setUsers] = useState<Array<User>>();

    const getUsers = async () => {
        const resp = await UserService.getAllUsers();
        setUsers(await resp.json());
    };

    useEffect(() => { getUsers() }, []);

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main>
                <h1>Users</h1>
                <section>
                    <h2>Users overview</h2>
                    {
                        users && (<UserOverviewTable users={users} />)
                    }
                </section>
            </main>
        </>
    );
};
export default Users;
