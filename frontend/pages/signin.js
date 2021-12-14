import Layout from "../components/Layout";
import Link from "next/link";

const signIn = () => {
  return (
    <Layout>
      <h2>signIn Page</h2>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Layout>
  );
};

export default signIn;
