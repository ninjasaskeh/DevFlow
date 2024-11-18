import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default Home;
