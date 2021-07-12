import StatisticsCard from "./StatisticsCard";

const Home = () => {
  return (
    <div>
      <StatisticsCard type={"Statistics"}></StatisticsCard>
      <StatisticsCard type={"Expenses"}></StatisticsCard>
      <StatisticsCard type={"Upcoming"}></StatisticsCard>
    </div>
  );
};

export default Home;
