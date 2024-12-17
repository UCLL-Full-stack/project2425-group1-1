import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import { ErrorResponse, Sprint } from '@types';
import SprintService from '@services/SprintService';
import SprintOverviewTable from '@components/sprints/SprintOverviewTable';
import SprintDetails from '@components/sprints/SprintDetails';
import CreateBacklogItemForm from '@components/sprints/CreateBacklogItemForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const Sprints: React.FC = () => {
    const { t } = useTranslation();
    const [sprints, setSprints] = useState<Array<Sprint>>();
    const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();

    const getSprints = async () => {
        const resp = await SprintService.getAllSprints();
        if (!resp.ok) {
            const error = await resp.json() as ErrorResponse;
            setErrorMessage(error.message);
            return;
        }
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
                <title>{t('sprints.title')}</title>
            </Head>
            <Header />
            <main>
                <h1>{t('sprints.title')}</h1>
                <section>
                    <h2>{t('sprints.overview')}</h2>
                    {
                        sprints && (<SprintOverviewTable sprints={sprints} selectSprint={setSelectedSprint} />)
                    }
                    {errorMessage && (<div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                    )}
                    {selectedSprint && (
                        <>
                            <h2>{t('sprints.addNewBacklogItem', { sprintName: selectedSprint.name })}</h2>
                            <CreateBacklogItemForm sprint={selectedSprint} sprintUpdatedCallback={sprintUpdatedCallback} />
                            <h2>{t('sprints.detailsOf', { sprintName: selectedSprint.name })}</h2>
                            <SprintDetails sprint={selectedSprint} />
                        </>
                    )}
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

export default Sprints;