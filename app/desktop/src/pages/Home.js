import StatisticsCard from "../components/StatisticsCard";
import ExpensesCard from "../components/ExpensesCard";
import { Grid, Container } from "@material-ui/core";

const Home = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6} md={6} lg={4} key={1}>
          <StatisticsCard type={"Statistics"}></StatisticsCard>
        </Grid>
        <Grid item xs={6} md={6} lg={4} key={2}>
          <ExpensesCard type={"Expenses"}></ExpensesCard>
        </Grid>
        <Grid item xs={6} md={6} lg={4} key={3}>
          <StatisticsCard type={"Statistics"}></StatisticsCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
