import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Agile Scrum Sprint Planner</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Welcome!</h1>
        <div className={styles.description}>
          <p>
            Agile Scrum Sprint Planner is a full-stack Sprint planner web application designed to<br />
            encourage developers and team leaders to manage their time better and prioritize their
            development goals
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
