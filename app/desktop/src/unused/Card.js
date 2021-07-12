import ".././css/card.css";
import { motion, useCycle } from "framer-motion";
import { Link } from "react-router-dom";

const Card = (props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isFlipped, toggleFlipped] = useCycle(true, false);

  const toggleBoth = () => {
    toggleFlipped();
    toggleOpen();
  };

  const containerVariants = {
    closed: {
      clipPath: "circle(30px at 30px 30px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      clipPath: "circle(600px at 40px 40px)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  return (
    <div className="card">
      <motion.div
        className="card-small"
        onClick={() => toggleBoth}
        variants={containerVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
          <div className="card-face card-face--front" onClick={toggleBoth}>
            <Link to={`/${props.type}`}>{props.type}</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
