import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartSelector = (props) => {
  function addToData(amt) {
    const amount = parseInt(amt);
    return { amount };
  }
  const chart = props.chart;
  const data = props.expenses.map((expense) => addToData(expense.amount));
  var data2 = [];
  for (var i in data) {
    data2.push(data[i].amount);
  }
  var ar;
  var rad;
  if (chart.size === "sm") {
    ar = 1.6;
    rad = 75;
  } else {
    ar = 0.63;
    rad = 130;
  }

  const info = {
    data: data2,
    radius: rad,
    legend: chart.legend,
    ar: ar,
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
