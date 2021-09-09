import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartSelector = (props) => {
  const data = [5, 8, 3, 5, 7, 3];
  var type = props.chart.type;
  var Chart;
  if (type === "Bar") {
    Chart = <BarChart data={data} chart={props.chart} />;
  } else if (type === "Pie") {
    const info = {
      data: data,
      ar: 1.8,
      radius: 75,
      legend: false,
    };
    Chart = <PieChart chart={props.chart} info={info} />;
  }

  return <div>{Chart}</div>;
};

export default ChartSelector;
