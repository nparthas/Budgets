import ".././css/navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const cur_path = useLocation().pathname;
  const title = cur_path.substring(1);

  var new_expense;
  if (title === "Expenses") {
    new_expense = <Link to="/NewExpense">New</Link>;
  }

  return (
    <nav className="navbar">
      <h1>{title}</h1>
      {/* <h1>Hi</h1> */}
      <div className="links">
        {new_expense}
        <Link to="/">Home</Link>
        {/* <Link to="/Expenses">Ex</Link>
        <Link to="/Upcoming">Up</Link>
        <Link to="/NewExpense">Cr Ex</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
