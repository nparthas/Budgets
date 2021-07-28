import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    height: "550px",
    maxHeight: "550px",
    // background: blueGrey[700],
  },
});

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const classes = useStyles();

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

  return (
    <motion.div variants={expandVariants} initial="hidden" animate="visible">
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Expense</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Edit</TableCell>
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
                <TableCell align="right">
                  <IconButton size="small" color="secondary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default Expenses;
