import Head from 'next/head';
import Header from '@components/header';

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
      <main>
        <h1>Welcome!</h1>
        <p>
          Agile Scrum Sprint Planner is a full-stack Sprint planner web application designed to
          encourage developers and team leaders to manage their time better and prioritize their
          development goals
        </p>
        <h2>Login Credentials</h2>
        <ul>
          <li>administration@ucll.be : admin</li>
        </ul>
      </main>
    </>
  );
};

export default Home;
