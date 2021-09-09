import { motion } from "framer-motion";
import { useState } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  makeStyles,
  Button,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
  formControl: {
    minWidth: 150,
    display: "block",
  },
  date: {
    display: "inline",
  },
});

const NewChart = () => {
  const classes = useStyles();
  return (
    <div>
      <form action="">
        <fieldset>
          {/* <legend>Create New Chart</legend> */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="bar stacked"
              // onChange={handleChange}
            >
              <MenuItem value="bar stacked">Bar Stacked</MenuItem>
              <MenuItem value="bar grouped">Bar Grouped</MenuItem>
              <MenuItem value="pie">Pie</MenuItem>
              <MenuItem value="line">Line</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Typography>Time Span: </Typography>
            <TextField
              className={classes.date}
              // onChange={(e) => setExpenseDate(e.target.value)}
              type="date"
              variant="outlined"
              required
              // error={titleError}
              size="small"
            />
          </FormControl>
        </fieldset>
      </form>
    </div>
  );
};

export default NewChart;
