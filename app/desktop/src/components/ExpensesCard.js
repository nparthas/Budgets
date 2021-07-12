import { motion } from "framer-motion";
import ".././css/expenses-card.css";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory";

const ExpensesCard = (props) => {
  const expandVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const card_type = props.type.toLowerCase();

  return (
    <motion.div
      className={`card ${card_type}`}
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="card-inner">
        <Link to={`/${props.type}`}>
          <div className="card-face">{/* expenses */}</div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ExpensesCard;
