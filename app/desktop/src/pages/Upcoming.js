import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Upcoming = () => {
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
    <motion.div variants={expandVariants} initial="hidden" animate="visible">
      <h2>Upcoming</h2>
      <p>this is an upcoming expense</p>
      <Link to="/">Back</Link>
    </motion.div>
  );
};

export default Upcoming;
