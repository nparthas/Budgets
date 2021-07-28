import { motion } from "framer-motion";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  form: {
    background: blueGrey[700],
    padding: "20px 5px",
  },
  button: {
    backgroundColor: blueGrey[900],
    "&:hover": {
      backgroundColor: blueGrey[500],
    },
  },
});

const Expenses = () => {
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
      fetch("http://localhost:8000/expenses", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, category, amount }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <motion.div
      variants={expandVariants}
      initial="hidden"
      animate="visible"
      className={classes.form}
    >
      <Container size="sm">
        <Typography variant="h6" component="h2" gutterBottom>
          Create a New Expense
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            onChange={(e) => setTitle(e.target.value)}
            label="Expense Description"
            variant="outlined"
            fullWidth
            required
            error={titleError}
          />
          <TextField
            className={classes.field}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            error={detailsError}
          />

          <FormControl className={classes.field}>
            <FormLabel>Expense Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
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
        </form>
      </Container>
    </motion.div>
  );
};

export default Expenses;
