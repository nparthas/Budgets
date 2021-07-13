import { Link } from "react-router-dom";
import ".././css/expenses.css";
import { motion } from "framer-motion";

const Expenses = () => {
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
      className="expenses"
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Expenses</h2>
      <p>this is an expense</p>
      <Link to="/">Back</Link>
    </motion.div>
  );
};

export default Expenses;
