import { motion } from "framer-motion";
import BarChart from "../components/charts/BarChart";

const Statistics = () => {
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

  return (
    <motion.div
      className="statistics"
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <BarChart />
    </motion.div>
  );
};

export default Statistics;
