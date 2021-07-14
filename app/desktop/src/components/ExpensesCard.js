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
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles({
  table: {
    maxWidth: 320,
    padding: "5px",
  },
});

const ExpensesCard = (props) => {
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
      className="card expense-card"
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="card-inner">
        <Link to="/Expenses">
          <div className="card-face">
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
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ExpensesCard;
