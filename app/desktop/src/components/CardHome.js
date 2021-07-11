import { motion } from "framer-motion";
import ".././css/card.css";
import { Link } from "react-router-dom";

const CardHome = (props) => {
  const linkVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.6,
        damping: 8,
      },
    },
  };

  const expandVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
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
      className="card"
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="card-inner">
        <Link to={`/${props.type}`}>
          <div className="card-face card-face--front">{props.type}</div>
        </Link>
      </div>
    </motion.div>
  );
};

export default CardHome;
