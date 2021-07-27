import { motion } from "framer-motion";

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
      <p>this is a graph Preview</p>
    </motion.div>
  );
};

export default Statistics;
