import Layout from "../components/Layout";
import Link from "next/link";

const signUp = () => {
  return (
    <Layout>
      <h2>signUp Page</h2>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Layout>
  );
};

export default signUp;
