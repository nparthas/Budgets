import { motion } from "framer-motion";
import { useState } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  makeStyles,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  form: {
    width: "350px",
    background: "grey",
    padding: "20px 5px",
  },
  button: {
    marginRight: "20px",
    backgroundColor: blueGrey[900],
    "&:hover": {
      backgroundColor: blueGrey[500],
    },
  },
  button_right: {
    float: "right",
    backgroundColor: blueGrey[900],
    "&:hover": {
      backgroundColor: blueGrey[500],
    },
  },
});

const Expenses = (props) => {
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

  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/api/v1/",
  });
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (amount === 0) {
      setDetailsError(true);
    }
    if (title && amount) {
      postExpense()
        .then(() =>
          instance
            .get("expenses/")
            .then((res) => props.setExpenses(res.data.results))
        )
        .then(() => history.push("/"));
    }
  };

  const postExpense = () => {
    return instance
      .post("expenses/", {
        tags: [category.toString()],
        date: expenseDate,
        period: 1,
        amount: amount,
        notes: title.toString(),
      })
      .then((res) => {
        // handle success
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  };

  return (
    <motion.div
      variants={expandVariants}
      initial="hidden"
      animate="visible"
      className={classes.form}
    >
      <Container size="sm">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Create a New Expense</legend>
            <TextField
              className={classes.field}
              onChange={(e) => setTitle(e.target.value)}
              label="Name"
              variant="outlined"
              required
              fullWidth
              error={titleError}
              size="small"
            />
            <TextField
              // className={classes.field}
              // onChange={(e) => setTitle(e.target.value)}
              label="Notes"
              variant="outlined"
              required
              fullWidth
              error={titleError}
              size="small"
            />
            <TextField
              className={classes.field}
              onChange={(e) => setAmount(e.target.value)}
              label="Amount"
              variant="outlined"
              type="number"
              rows={1}
              required
              fullWidth
              error={detailsError}
              size="small"
            />
            <TextField
              className={classes.field}
              onChange={(e) => setExpenseDate(e.target.value)}
              type="date"
              variant="outlined"
              required
              fullWidth
              error={titleError}
              size="small"
            />

            <FormControl className={classes.field}>
              <fieldset>
                <legend>Expense Tags</legend>
                <RadioGroup
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {props.tags.map((tag) => (
                    <FormControlLabel
                      id={tag.id}
                      value={tag.name}
                      control={<Radio />}
                      label={tag.name}
                    />
                  ))}
                </RadioGroup>
              </fieldset>
            </FormControl>
            <Button
              type="reset"
              color="primary"
              className={classes.button}
              variant="contained"
            >
              Reset
            </Button>
            <Button
              type="submit"
              color="primary"
              className={classes.button_right}
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </fieldset>
        </form>
      </Container>
    </motion.div>
  );
};

export default Expenses;
