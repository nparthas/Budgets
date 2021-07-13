import StatisticsCard from "./StatisticsCard";
import ExpensesCard from "./ExpensesCard";

const Home = () => {
  return (
    <div>
      <StatisticsCard type={"Statistics"}></StatisticsCard>
      <ExpensesCard type={"Expenses"}></ExpensesCard>
      <StatisticsCard type={"Upcoming"}></StatisticsCard>
    </div>
  );
};

export default Home;
