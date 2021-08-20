import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Upcoming from "./pages/Upcoming";
import Home from "./pages/Home";
import NewExpense from "./pages/NewExpense";
import NewChart from "./pages/NewChart";
import Layout from "./components/Layout";
import Preview from "./pages/Preview";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/expenses/", {
        withCredentials: true,
      })
      .then((res) => setExpenses(res.data.results));
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home expenses={expenses} setExpenses={setExpenses} />
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
