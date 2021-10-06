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
} from "@material-ui/core";
// import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    height: "550px",
    maxHeight: "550px",
    // background: blueGrey[700],
  },
});

const Upcoming = (props) => {
  const expenses = props.expenses;
  const classes = useStyles();

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
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Tags</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell component="th" scope="row">
                  {expense.notes}
                </TableCell>
                <TableCell align="right">{expense.date}</TableCell>
                <TableCell align="right">{expense.id}</TableCell>
                <TableCell align="right">{expense.tags}</TableCell>
                <TableCell align="right">{expense.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default Upcoming;
