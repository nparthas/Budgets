import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  makeStyles,
  Avatar,
} from "@material-ui/core";
// import { DeleteOutlined } from "@material-ui/icons";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import { blueGrey, blue, green, pink, yellow } from "@material-ui/core/colors";
import BarChart from "./charts/BarChart";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
  card: {
    width: "100%",
  },
  background: {
    backgroundColor: blueGrey[800],
  },
  content: {
    margin: 0,
    padding: 0,
  },
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[500];
      }
      if (note.category === "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

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

const StatisticsPageCard = (props) => {
  const classes = useStyles(props.chart);
  const expenses = props.expenses;
  const chart = props.chart;

  function addToData(id, amt) {
    const amount = parseInt(amt);
    return { id, amount };
  }

  const data = expenses.map((expense) => addToData(expense.id, expense.amount));

  return (
    <motion.div
      //   className={classes.card}
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <Card elevation={2} className={classes.background}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {chart.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <Link to="/Preview" className={classes.link}>
              <IconButton>
                <ZoomOutMapIcon />
              </IconButton>
            </Link>
          }
          title={chart.title}
          subheader={chart.category}
        />
        <CardContent className={classes.content}>
          <BarChart />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsPageCard;
