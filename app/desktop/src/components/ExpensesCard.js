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
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    height: 440,
    maxHeight: 440,
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
  content: {
    margin: 0,
    padding: "0px 15px",
  },
});

const ExpensesCard = (props) => {
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
    <motion.div
      className={classes.expensecard}
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
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
        <CardContent className={classes.content}>
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
                  {props.expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell component="th" scope="row">
                        {expense.notes}
                      </TableCell>
                      <TableCell align="right">{expense.amount}</TableCell>
                    </TableRow>
                  ))}
                  {props.expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell component="th" scope="row">
                        {expense.notes}
                      </TableCell>
                      <TableCell align="right">{expense.amount}</TableCell>
                    </TableRow>
                  ))}
                  {props.expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell component="th" scope="row">
                        {expense.notes}
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
