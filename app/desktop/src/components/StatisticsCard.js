import { motion } from "framer-motion";
import ".././css/statistics-card.css";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory";
import { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";

const useStyles = makeStyles({
  table: {
    maxWidth: 320,
    padding: "5px",
  },
  link: {
    textDecoration: "none",
  },
});

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
  const classes = useStyles();

  return (
    // <motion.div
    //   className="card"
    //   variants={expandVariants}
    //   initial="hidden"
    //   animate="visible"
    // >
    <Card>
      <CardHeader
        title="Statistics"
        action={
          <Link to="/Statistics" className={classes.link}>
            <IconButton>
              <EqualizerIcon />
            </IconButton>
          </Link>
        }
      />
      <CardContent>
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
          colorScale={"grayscale"}
          // labelRadius={({ innerRadius }) => innerRadius + 40}
          innerRadius={0}
        />
      </CardContent>
    </Card>
    // </motion.div>
  );
};

export default StatisticsCard;
