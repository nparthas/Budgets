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

const useStyles = makeStyles({
  table: {
    maxWidth: 320,
    padding: "5px",
  },
});

const ExpensesCard = (props) => {
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

  const card_type = props.type.toLowerCase();
  const classes = useStyles();
  return (
    <motion.div
      className={`card ${card_type}`}
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="card-inner">
        <Link to={`/${props.type}`}>
          <div className="card-face">
            <h2 className="card-header">Expenses</h2>
            <TableContainer className={classes.table} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
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
