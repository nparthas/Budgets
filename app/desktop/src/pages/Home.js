import StatisticsCard from "../components/StatisticsCard";
import ExpensesCard from "../components/ExpensesCard";
import { Grid, Container } from "@material-ui/core";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Home = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6} md={6} lg={6} key={1}>
          <StatisticsCard type={"Statistics"}></StatisticsCard>
        </Grid>
        <Grid item xs={6} md={6} lg={6} key={2}>
          <ExpensesCard type={"Expenses"}></ExpensesCard>
        </Grid>
        {/* <StatisticsCard type={"Upcoming"} data={rows}></StatisticsCard> */}
      </Grid>
    </Container>
  );
};

export default Home;
