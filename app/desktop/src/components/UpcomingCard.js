import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    maxWidth: 290,
    maxHeight: 157,
    padding: "5px",
  },
  link: {
    textDecoration: "none",
  },
  card: {
    width: "330px",
    background: blueGrey[800],
  },
  content: {
    margin: 0,
    padding: "0px 15px",
  },
});

const UpcomingCard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

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

  const classes = useStyles();
  return (
    <motion.div variants={expandVariants} initial="hidden" animate="visible">
      <Card elevation={2} className={classes.card}>
        <CardHeader
          title="Upcoming"
          action={
            <Link to="/Upcoming" className={classes.link}>
              <IconButton>
                <AttachMoneyIcon />
              </IconButton>
            </Link>
          }
        />
        <CardContent className={classes.content}>
          <Link to="/Upcoming" className={classes.link}>
            <TableContainer className={classes.table} component={Paper}>
              <Table aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Expense</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell component="th" scope="row">
                        {expense.title}
                      </TableCell>
                      <TableCell align="right">{expense.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpcomingCard;
