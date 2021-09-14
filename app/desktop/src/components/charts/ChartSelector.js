import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartSelector = (props) => {
  function addToData(amt) {
    const amount = parseInt(amt);
    return { amount };
  }

  const data = props.expenses.map((expense) => addToData(expense.amount));
  var data2 = [];
  for (var i in data) {
    data2.push(data[i].amount);
  }
  const info = {
    data: data2,
    ar: 1.85,
    radius: 75,
    legend: props.chart.legend,
  };

  var type = props.chart.type;
  var Chart;
  if (type === "Bar") {
    Chart = <BarChart chart={props.chart} info={info} />;
  } else if (type === "Pie") {
    Chart = <PieChart chart={props.chart} info={info} />;
  }

  return <div>{Chart}</div>;
};

export default ChartSelector;
