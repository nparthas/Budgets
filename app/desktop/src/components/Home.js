import CardHome from "./CardHome";

const Home = () => {
  return (
    <div>
      <CardHome type={"Statistics"}></CardHome>
      <CardHome type={"Expenses"}></CardHome>
      <CardHome type={"Upcoming"}></CardHome>
    </div>
  );
};

export default Home;
