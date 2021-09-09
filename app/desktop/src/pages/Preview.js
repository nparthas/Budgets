import { motion } from "framer-motion";
import BarChart from "../components/charts/BarChart";

const Preview = () => {
  const data = [3, 5, 6, 7, 3, 8];
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
      <BarChart data={data} />
    </motion.div>
  );
};

export default Preview;
