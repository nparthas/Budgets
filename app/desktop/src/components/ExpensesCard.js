import { motion } from "framer-motion";
import ".././css/expenses-card.css";
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

const useStyles = makeStyles({
  table: {
    maxWidth: 290,
    maxHeight: 325,
    padding: "5px",
  },
  link: {
    textDecoration: "none",
  },
  card: {
    height: 440,
    maxHeight: 440,
    backgroundColor: "salmon",
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

  const classes = useStyles();
  return (
    <motion.div
      className="expense-card"
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <Card elevation={2} className={classes.card}>
        <CardHeader
          title="Expenses"
          action={
            <Link to="/Expenses" className={classes.link}>
              <IconButton>
                <AttachMoneyIcon />
              </IconButton>
            </Link>
          }
        />
        <CardContent>
          <Link to="/Expenses" className={classes.link}>
            <TableContainer className={classes.table} component={Paper}>
              <Table aria-label="simple table">
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
