import Head from "next/head";
import Header from "@components/header";
import UserSignupForm from "@components/users/UserSignupForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const Signup: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('signup.signUp')}</title>
            </Head>
            <Header />
            <main>
                <h1>{t('signup.signUp')}</h1>
                <section>
                    <UserSignupForm />
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

export default Signup;
