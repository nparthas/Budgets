import { motion } from "framer-motion";
import ".././css/statistics-card.css";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
  card: {
    width: 330,
  },
  background: {
    backgroundColor: blueGrey[800],
  },
  content: {
    margin: 0,
    padding: 0,
  },
});

const StatisticsPageCard = (props) => {
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

  const data = expenses.map((expense) => addToData(expense.id, expense.amount));
  const classes = useStyles();

  return (
    <motion.div
      className={classes.card}
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className={classes.background}>
        <CardHeader
          title="Pie Chart"
          action={
            <Link to="/Preview" className={classes.link}>
              <IconButton>
                <ZoomOutMapIcon />
              </IconButton>
            </Link>
          }
        />
        <CardContent className={classes.content}>
          <Link to="/Preview" className={classes.link}>
            <VictoryPie
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#f9f9f9",
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 20,
                  fill: "#f9f9f9",
                },
              }}
              height={200}
              data={data}
              x="id"
              y="amount"
              colorScale={"red"}
            />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsPageCard;
