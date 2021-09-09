import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
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
    background: "yellow",
    padding: "20px 5px",
  },
  button: {
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
  const [category, setCategory] = useState("money");

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
        tags: [],
        date: "2021-08-20",
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
              label="Notes"
              variant="outlined"
              required
              error={titleError}
              size="small"
            />
            <TextField
              className={classes.field}
              onChange={(e) => setAmount(e.target.value)}
              label="Expense Amount"
              variant="outlined"
              type="number"
              rows={1}
              required
              error={detailsError}
              size="small"
            />

            <FormControl className={classes.field}>
              <fieldset>
                <legend>Expense Tags</legend>
                <RadioGroup
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="money"
                    control={<Radio />}
                    label="Money"
                  />
                </RadioGroup>
              </fieldset>
            </FormControl>

            <Button
              type="submit"
              color="primary"
              className={classes.button}
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
