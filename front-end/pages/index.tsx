import Head from 'next/head';
import Header from '@components/header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h1>{t('home.welcomeMessage')}</h1>
        <p>
          {t('home.appDescription')}
        </p>
        <h2>{t('login.credentials')}</h2>
        <ul>
          <li>administration@ucll.be : admin</li>
        </ul>
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

export default Home;
