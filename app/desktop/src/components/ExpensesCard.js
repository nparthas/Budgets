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
import axios from "axios";

const useStyles = makeStyles({
  table: {
    maxWidth: "98%",
    height: 437,
    maxHeight: 437,
    padding: "5px",
    // background: blueGrey[100],
  },
  link: {
    textDecoration: "none",
  },
  card: {
    backgroundColor: blueGrey[800],
  },
  expensecard: {
    height: "540px",
    maxHeight: "540px",
    // width: "330px",
  },
});

const ExpensesCard = () => {
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

  const logStuff = () => {
    return axios
      .get("https://google.ca")
      .then((res) => {
        // handle success
        console.log(res);
        return res;
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  };

  const classes = useStyles();
  return (
    <motion.div
      className={classes.expensecard}
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <button onClick={logStuff}>Log Using Axios</button>
      <Card elevation={2} className={classes.card}>
        <CardHeader
          title="Expenses"
          action={
            <Link to="/NewExpense" className={classes.link}>
              <IconButton>
                <AttachMoneyIcon />
              </IconButton>
            </Link>
          }
        />
        <CardContent>
          <Link to="/Expenses" className={classes.link}>
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

export default ExpensesCard;
