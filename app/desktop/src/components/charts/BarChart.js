import { Bar } from "react-chartjs-2";
// import { RdYlGn6 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

const BarChart = (props) => {
  const data = props.info.data;

  return (
    <div>
      <Bar
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: data,
              backgroundColor:
                // RdYlGn6,
                [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
              borderColor:
                // RdYlGn6,
                [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
              borderWidth: 1,
              stack: "Stack 0",
            },
            {
              label: "Quantity",
              data: data,
              backgroundColor: ["orange", "green"],
              borderColor: ["red", "green"],
              stack: "Stack 1",
            },
            {
              label: "Quantity2",
              data: data,
              backgroundColor: ["blue", "red"],
              borderColor: ["red", "blue"],
              stack: "Stack 3",
            },
          ],
        }}
        options={{
          aspectRatio: 2,
          maintainAspectRatio: true,
          responsive: true,
          scales: {
            y: {
              stacked: true,
              beginAtZero: true,
            },
            x: {
              stacked: true,
            },
          },
          plugins: {
            legend: {
              display: props.info.legend,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
