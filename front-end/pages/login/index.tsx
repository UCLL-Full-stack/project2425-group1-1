import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const Login: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('common.login')}</title>
            </Head>
            <Header />
            <main>
                <h1>{t('common.login')}</h1>
                <section>
                    <UserLoginForm />
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

export default Login;
