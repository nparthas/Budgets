import { motion } from "framer-motion";
import StatisticsPageCard from "../components/StatisticsPageCard";
import Masonry from "react-masonry-css";
import { Container } from "@material-ui/core";

const Statistics = (props) => {
  const charts = props.charts;

  const expandVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <motion.div variants={expandVariants} initial="hidden" animate="visible">
      <Container>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {charts.map((chart) => (
            <div key={chart.id}>
              <StatisticsPageCard
                chart={chart}
                expenses={props.expenses}
              ></StatisticsPageCard>
            </div>
          ))}
        </Masonry>
      </Container>
    </motion.div>
  );
};

export default Statistics;
