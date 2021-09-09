import { motion } from "framer-motion";
import BarChart from "../components/charts/BarChart";

const Preview = () => {
  const data = [3, 5, 6, 7, 3, 8];
  const info = { data: data, ar: 1.85, radius: 75, legend: true };

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
      <BarChart info={info} />
    </motion.div>
  );
};

export default Preview;
