import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import { Sprint } from '@types';
import SprintService from '@services/SprintService';
import SprintOverviewTable from '@components/sprints/SprintOverviewTable';

const Lecturers: React.FC = () => {
    const [sprints, setSprints] = useState<Array<Sprint>>();

    const getSprints = async () => {
        const resp = await SprintService.getAllSprints();
        setSprints(await resp.json());
    };

    useEffect(() => { getSprints() }, []);

    return (
        <>
            <Head>
                <title>Sprints</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Sprints</h1>
                <section>
                    <h2>Sprints overview</h2>
                    {
                        sprints && (<SprintOverviewTable sprints={sprints} />)
                    }
                </section>
            </main>
        </>
    );
};
export default Lecturers;