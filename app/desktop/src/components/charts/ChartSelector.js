import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartSelector = (props) => {
  var type = props.chart.type;
  var Chart;
  if (type === "Bar") {
    Chart = <BarChart chart={props.chart} />;
  } else if (type === "Pie") {
    const info = {
      data: [24, 26, 31, 14, 6],
      ar: 1.8,
      radius: 75,
      legend: false,
    };
    Chart = <PieChart chart={props.chart} info={info} />;
  }

  return <div>{Chart}</div>;
};

export default ChartSelector;
