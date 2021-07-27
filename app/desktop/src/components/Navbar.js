import ".././css/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HomeIcon from "@material-ui/icons/Home";

const Navbar = () => {
  const cur_path = useLocation().pathname;
  const title = cur_path.substring(1);

  var new_expense;
  if (title === "Expenses") {
    new_expense = (
      <Link to="/NewExpense">
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </Link>
    );
  }

  var new_chart;
  if (title === "Statistics") {
    new_chart = (
      <Link to="/NewChart">
        <IconButton disableRipple={true} disableFocusRipple={true}>
          <AddCircleOutlineIcon />
          <p>New Chart</p>
        </IconButton>
      </Link>
    );
  }

  var home = (
    <Link to="/">
      <IconButton disableFocusRipple={true}>
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
