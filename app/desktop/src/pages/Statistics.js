import { motion } from "framer-motion";
import StatisticsPageCard from "../components/StatisticsPageCard";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Container } from "@material-ui/core";

const Statistics = () => {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/charts")
      .then((res) => res.json())
      .then((data) => setCharts(data));
  }, []);

  const expandVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
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
              <StatisticsPageCard chart={chart}></StatisticsPageCard>
            </div>
          ))}
        </Masonry>
      </Container>
    </motion.div>
  );
};

export default Statistics;
