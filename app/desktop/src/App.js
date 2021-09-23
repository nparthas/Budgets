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
import { createTheme, ThemeProvider } from "@material-ui/core";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [charts, setCharts] = useState([]);
  const [tags, setTags] = useState([]);

  const theme = createTheme({});

  theme.overrides = {
    MuiCardHeader: {
      root: {
        padding: "16px 16px 6px",
      },
    },
    MuiCardContent: {
      root: {
        "&:last-child": {
          paddingBottom: "15px",
        },
      },
    },
  };

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
        // Set charts future
        // instance.get("charts/").then((res) => setCharts(res.data.results));
        instance.get("tags/").then((res) => setTags(res.data.results));
        // setCharts for now
        fetch("http://localhost:9000/charts")
          .then((res) => res.json())
          .then((data) => setCharts(data));
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
              <Statistics
                expenses={expenses}
                setExpenses={setExpenses}
                charts={charts}
                setCharts={setCharts}
              />
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
            <Route exact path="/Preview/:id">
              <Preview
                expenses={expenses}
                setExpenses={setExpenses}
                charts={charts}
              />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
