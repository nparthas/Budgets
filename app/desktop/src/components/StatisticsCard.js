import { motion } from "framer-motion";
import ".././css/statistics-card.css";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory";
import { useEffect, useState } from "react";

const StatisticsCard = (props) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

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

  function addToData(id, amt) {
    const amount = parseInt(amt);
    return { id, amount };
  }

  const data = expenses.map((expense) =>
    addToData(expense.category, expense.amount)
  );

  return (
    <motion.div
      className="card statistics"
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="card-inner">
        <Link to="/Statistics">
          <div className="card-face">
            <VictoryPie
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#333",
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 20,
                  fill: "#333",
                },
              }}
              data={data}
              x="id"
              y="amount"
              colorScale={"blue"}
              labelRadius={({ innerRadius }) => innerRadius + 40}
              innerRadius={0}
            />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default StatisticsCard;
