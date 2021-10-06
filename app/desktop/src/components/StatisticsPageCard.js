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
import ChartSelector from "./charts/ChartSelector";

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
    margin: "0px 15px",
    padding: 0,
    height: (chart) => {
      if (chart.size === "sm") {
        return 183;
      } else return 473;
    },
  },
  avatar: {
    backgroundColor: (chart) => {
      if (chart.category === "Work") {
        return yellow[700];
      }
      if (chart.category === "Money") {
        return green[500];
      }
      if (chart.category === "Todos") {
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
            <Link to={`/Preview/${chart.id}`} className={classes.link}>
              <IconButton>
                <ZoomOutMapIcon />
              </IconButton>
            </Link>
          }
          title={chart.title}
          subheader={chart.category}
        />
        <CardContent className={classes.content}>
          <ChartSelector expenses={props.expenses} chart={chart} data={data} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsPageCard;
