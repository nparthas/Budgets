import ".././css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <h1>Navbar</h1> */}
      <div className="links">
        <Link to="/">Home</Link>
        {/* <Link to="/Expenses">Ex</Link>
        <Link to="/Upcoming">Up</Link>
        <Link to="/NewExpense">Cr Ex</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
