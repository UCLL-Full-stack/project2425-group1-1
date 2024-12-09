import Head from "next/head";
import Header from "@components/header";
import UserSignupForm from "@components/users/UserSignupForm";

const Signup: React.FC = () => {
    return (
        <>
            <Head>
                <title>Sign-up</title>
            </Head>
            <Header />
            <main>
                <h1>Sign-up</h1>
                <section>
                    <UserSignupForm />
                </section>
            </main>
        </>
    );
};

export default Signup;
