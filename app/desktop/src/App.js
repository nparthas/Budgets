import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Upcoming from "./pages/Upcoming";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const my_name = "Ben";

  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home b={my_name} />
            </Route>
            <Route exact path="/Expenses">
              <Expenses />
            </Route>
            <Route exact path="/Statistics">
              <Statistics />
            </Route>
            <Route exact path="/Upcoming">
              <Upcoming />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
