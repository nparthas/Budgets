import { makeStyles } from "@material-ui/core";
import Navbar from "./Navbar";

const useStyles = makeStyles({
  page: {
    margin: "20px auto",
    padding: "5px 20px 20px",
  },
});

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.page}>{children}</div>
    </div>
  );
}
