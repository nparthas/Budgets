import ".././css/card.css";
import { motion } from "framer-motion";
import { useCycle } from "framer-motion";

const FullCard = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isFlipped, toggleFlipped] = useCycle(false, true);

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
    <motion.div
      className="card-full"
      onClick={() => toggleBoth}
      variants={containerVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card-face card-face--front" onClick={toggleBoth}>
          <h2>Dev Card</h2>
        </div>
        <div className="card-face card-face--back" onClick={toggleBoth}>
          <div className="card-content">
            <div className="card-header">
              <h2>Ben Krowchuk</h2>
            </div>
            <div className="card-body">
              <h3>Java</h3>
              <p>blah blah blah</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FullCard;
