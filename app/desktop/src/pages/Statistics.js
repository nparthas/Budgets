import { motion } from "framer-motion";
import ".././css/statistics.css";

const Statistics = () => {
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

  return (
    <motion.div
      className="statistics"
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Statistics</h2>
      <p>this is a statistic</p>
    </motion.div>
  );
};

export default Statistics;
