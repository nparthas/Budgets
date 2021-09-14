import { motion } from "framer-motion";
import { useParams } from "react-router";
import ChartSelector from "../components/charts/ChartSelector";
import { useState, useEffect } from "react";

const Preview = (props) => {
  const { id } = useParams();
  const [chart, setChart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9000/charts/${id}`)
      .then((res) => res.json())
      .then((data) => setChart(data));
  }, [id]);

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
      <ChartSelector expenses={props.expenses} chart={chart} />
    </motion.div>
  );
};

export default Preview;
