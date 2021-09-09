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
  const [tags, setTags] = useState([]);

  // useEffect doesnt like using something delacred outside
  // const instance = axios.create({
  //   withCredentials: true,
  //   baseURL: "http://localhost:8000/api/v1/",
  // });

  useEffect(() => {
    const instance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:8000/api/v1/",
    });
    instance
      .post("auth/login/", {
        email: "sept8@test.com",
        password: "September8!",
      })
      .then((res) => {
        // handle success
        // console.log(res);
        instance.get("expenses/").then((res) => setExpenses(res.data.results));
        instance.get("tags/").then((res) => setTags(res.data.results));
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home expenses={expenses} setExpenses={setExpenses} />
          </Route>
          <Route exact path="/Expenses">
            <Expenses expenses={expenses} setExpenses={setExpenses} />
          </Route>
          <Route exact path="/Statistics">
            <Statistics expenses={expenses} setExpenses={setExpenses} />
          </Route>
          <Route exact path="/Upcoming">
            <Upcoming expenses={expenses} setExpenses={setExpenses} />
          </Route>
          <Route exact path="/NewExpense">
            <NewExpense
              expenses={expenses}
              setExpenses={setExpenses}
              tags={tags}
            />
          </Route>
          <Route exact path="/NewChart">
            <NewChart expenses={expenses} setExpenses={setExpenses} />
          </Route>
          <Route exact path="/Preview">
            <Preview expenses={expenses} setExpenses={setExpenses} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
