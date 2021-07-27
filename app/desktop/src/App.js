import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Upcoming from "./pages/Upcoming";
import Home from "./pages/Home";
import NewExpense from "./pages/NewExpense";
import Layout from "./components/Layout";

function App() {
  const my_name = "Ben";

  return (
    <Router>
      <Layout className="no-scroll">
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
          <Route exact path="/NewExpense">
            <NewExpense />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
