import { Pie } from "@ant-design/charts";
import { FC } from "react";
import styled from "styled-components";
import "./PieChart.css";


const Wrapper = styled.div`
  margin: "1em 0 0 0";
`;

interface PieChartData {
  type: string;
  value: number;
}

interface PieChartProps {
  pies: PieChartData[],
  total: string,
}

const PieChart: FC<PieChartProps> = ({pies, total}) => {
  const config = {
    appendPadding: 10,
    data: pies,
    angleField: "value",
    colorField: "type",
    color: ["rgb(223, 212, 244)", "rgb(254, 197, 122)", "rgb(255, 183, 160)"],
    radius: 1,
    innerRadius: 0.65,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14
      }
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        formatter: () => total,
      }
    }
  };

  return (
    <Wrapper style={{ width: "30em", margin: "0 0 0 3em" }}>
      <Pie {...config} />
    </Wrapper>
  );
}

export default PieChart;