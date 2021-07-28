import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Upcoming from "./pages/Upcoming";
import Home from "./pages/Home";
import NewExpense from "./pages/NewExpense";
import NewChart from "./pages/NewChart";
import Layout from "./components/Layout";
import Preview from "./pages/Preview";

function App() {
  const my_name = "Ben";

  return (
    <Router>
      <Layout>
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
          <Route exact path="/NewChart">
            <NewChart />
          </Route>
          <Route exact path="/Preview">
            <Preview />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
