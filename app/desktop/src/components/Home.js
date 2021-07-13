import StatisticsCard from "./StatisticsCard";
import ExpensesCard from "./ExpensesCard";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 15900, 6.0, 24, 1),
  createData("Ice cream sandwich", 23700, 9.0, 37, 2),
  createData("Eclair", 26200, 16.0, 24, 3),
  createData("Cupcake", 30500, 3.7, 67, 4),
];

const Home = () => {
  return (
    <div>
      <StatisticsCard
        type={"Statistics"}
        protein={rows.protein}
        calories={rows.calories}
      ></StatisticsCard>
      <ExpensesCard type={"Expenses"} data={rows}></ExpensesCard>
      {/* <StatisticsCard type={"Upcoming"} data={rows}></StatisticsCard> */}
    </div>
  );
};

export default Home;
