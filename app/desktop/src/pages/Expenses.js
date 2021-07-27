import { motion } from "framer-motion";
import ".././css/expenses.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Expenses = () => {
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

  return (
    <motion.div variants={expandVariants} initial="hidden" animate="visible">
      {/* app bar */}
      <nav className="bar">
        <h1>Expenses</h1>
        <div className="links">
          <Link to="/NewExpense">New</Link>
        </div>
      </nav>
      <TableContainer className="table" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expense</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell component="th" scope="row">
                  {expense.title}
                </TableCell>
                <TableCell align="right">{expense.id}</TableCell>
                <TableCell align="right">{expense.category}</TableCell>
                <TableCell align="right">{expense.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default Expenses;
