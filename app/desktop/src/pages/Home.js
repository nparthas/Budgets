import StatisticsCard from "../components/StatisticsCard";
import ExpensesCard from "../components/ExpensesCard";
import { Container } from "@material-ui/core";
import Masonry from "react-masonry-css";
import UpcomingCard from "../components/UpcomingCard";

const Home = (props) => {
  const breakpoints = {
    default: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <div key={1}>
          <StatisticsCard
            type={"Statistics"}
            expenses={props.expenses}
            setExpenses={props.setExpenses}
          ></StatisticsCard>
        </div>
        <div key={2}>
          <ExpensesCard
            type={"Expenses"}
            expenses={props.expenses}
            setExpenses={props.setExpenses}
          ></ExpensesCard>
        </div>
        <div key={3}>
          <UpcomingCard
            type={"Upcoming"}
            expenses={props.expenses}
            setExpenses={props.setExpenses}
          ></UpcomingCard>
        </div>
      </Masonry>
    </Container>
  );
};

export default Home;
