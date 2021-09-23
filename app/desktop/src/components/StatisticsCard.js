import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { blueGrey } from "@material-ui/core/colors";
import PieChart from "./charts/PieChart";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
  card: {
    // width: "330px",
  },
  background: {
    backgroundColor: blueGrey[800],
  },
  content: {
    margin: 0,
    padding: 0,
    height: 183,
  },
});

const StatisticsCard = (props) => {
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

  function addToData(id, amt) {
    const amount = parseInt(amt);
    return { amount };
  }

  const data = props.expenses.map((expense) =>
    addToData(expense.amount, expense.amount)
  );
  var data2 = [];
  for (var i in data) {
    data2.push(data[i].amount);
  }
  const info = { data: data2, ar: 1.85, radius: 85, legend: false };

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
          title="Statistics"
          action={
            <Link to="/Statistics" className={classes.link}>
              <IconButton>
                <EqualizerIcon />
              </IconButton>
            </Link>
          }
        />
        <CardContent className={classes.content}>
          <PieChart info={info}></PieChart>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsCard;
