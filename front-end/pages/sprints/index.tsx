import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import { Sprint } from '@types';
import SprintService from '@services/SprintService';
import SprintOverviewTable from '@components/sprints/SprintOverviewTable';
import SprintDetails from '@components/sprints/SprintDetails';
import CreateBacklogItemForm from '@components/sprints/CreateBacklogItemForm';

const Sprints: React.FC = () => {
    const [sprints, setSprints] = useState<Array<Sprint>>();
    const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);

    const getSprints = async () => {
        const resp = await SprintService.getAllSprints();
        setSprints(await resp.json());
    };

    const sprintUpdatedCallback = async () => {
        const resp = await SprintService.getAllSprints();
        const new_sprints = await resp.json() as Array<Sprint>;
        setSprints(new_sprints);
        setSelectedSprint(new_sprints.find(x => x.id == selectedSprint?.id) ?? null);
    };

    useEffect(() => { getSprints() }, []);

    return (
        <>
            <Head>
                <title>Sprints</title>
            </Head>
            <Header />
            <main>
                <h1>Sprints</h1>
                <section>
                    <h2>Sprints overview</h2>
                    {
                        sprints && (<SprintOverviewTable sprints={sprints} selectSprint={setSelectedSprint} />)
                    }

                    {selectedSprint && (
                        <>
                            <h2>Add new backlog item to {selectedSprint.name}</h2>
                            <CreateBacklogItemForm sprint={selectedSprint} sprintUpdatedCallback={sprintUpdatedCallback} />
                            <h2>Details of {selectedSprint.name}</h2>
                            <SprintDetails sprint={selectedSprint} />
                        </>
                    )}
                </section>
            </main>
        </>
    );
};
export default Sprints;