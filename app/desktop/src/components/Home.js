import CardHome from "./CardHome";

const Home = () => {
  return (
    <div>
      <CardHome type={"Expenses"}></CardHome>
      <CardHome type={"Statistics"}></CardHome>
      <CardHome type={"Upcoming"}></CardHome>
    </div>
  );
};

export default Home;
