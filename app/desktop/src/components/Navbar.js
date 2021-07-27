import ".././css/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { IconButton, makeStyles } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HomeIcon from "@material-ui/icons/Home";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  button: {
    "&:hover": {
      background: blueGrey[500],
    },
  },
});

const Navbar = () => {
  const classes = useStyles();
  const cur_path = useLocation().pathname;
  const title = cur_path.substring(1);

  var new_expense;
  if (title === "Expenses") {
    new_expense = (
      <Link to="/NewExpense">
        <IconButton className={classes.button} size="small">
          <AddCircleOutlineIcon />
        </IconButton>
      </Link>
    );
  }

  var new_chart;
  if (title === "Statistics") {
    new_chart = (
      <Link to="/NewChart">
        <IconButton
          disableRipple={true}
          size="small"
          className={classes.button}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Link>
    );
  }

  var home = (
    <Link to="/">
      <IconButton className={classes.button} disableRipple={true} size="small">
        <HomeIcon />
      </IconButton>
    </Link>
  );

  return (
    <nav className="navbar">
      <h1>{title}</h1>
      {/* <h1>Hi</h1> */}
      {new_expense}
      {new_chart}
      <div className="links">
        {home}
        {/* <Link to="/Expenses">Ex</Link>
        <Link to="/Upcoming">Up</Link>
        <Link to="/NewExpense">Cr Ex</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
