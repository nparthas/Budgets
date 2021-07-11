import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Expenses from "./components/Expenses";
import Statistics from "./components/Statistics";
import Upcoming from "./components/Upcoming";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
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
