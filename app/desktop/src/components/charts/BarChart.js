import { Bar } from "react-chartjs-2";

const BarChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
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
              data: [18, 23, 4, 2, 3, 4],
              backgroundColor: "orange",
              borderColor: "red",
              stack: "Stack 0",
            },
            {
              label: "Quantity2",
              data: [18, 23, 4, 2, 3, 4],
              backgroundColor: "blue",
              borderColor: "red",
              stack: "Stack 1",
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
        }}
      />
    </div>
  );
};

export default BarChart;
