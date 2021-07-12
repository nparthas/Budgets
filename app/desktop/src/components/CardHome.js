import { motion } from "framer-motion";
import ".././css/card.css";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory";

const CardHome = (props) => {
  const expandVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  const card_type = props.type.toLowerCase();

  return (
    <motion.div
      className={`card ${card_type}`}
      variants={expandVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="card-inner">
        <Link to={`/${props.type}`}>
          <div className="card-face">
            <VictoryPie
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#333",
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 20,
                  fill: "#333",
                },
              }}
              data={data}
              x="quarter"
              y="earnings"
              colorScale={["purple", "silver", "cyan", "lime"]}
              labelRadius={({ innerRadius }) => innerRadius + 40}
              innerRadius={0}
            />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default CardHome;
