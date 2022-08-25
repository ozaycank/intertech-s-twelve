import { Pie } from "@ant-design/charts";
import React from "react";
import styled from "styled-components";
import "./PieChart.css";


const Wrapper = styled.div`
  margin: "1em 0 0 0";
`;

type DataType = "0x3696656EC7ab88b098defB751B7401B5f6d8976F" | "0x3696656EC7ab88b098defB751B7401B5f6d8976G" | "0x3696656EC7ab88b098defB751B7401B5f6d8976H";

interface PieChartData {
  type: string;
  value: number;
}

const pieChartData: PieChartData[] = [
  {
    type: " 0x3696656EC7ab88b098defB751B7401B5f6d8976F",
    value: 30
  },
  {
    type: " 0x3696656EC7ab88b098defB751B7401B5f6d8976G",
    value: 25
  },
  {
    type: " 0x3696656EC7ab88b098defB751B7401B5f6d8976H",
    value: 45
  },

];

const config = {
  appendPadding: 10,
  data: pieChartData,
  angleField: "value",
  colorField: "type",
  color: ["rgb(223, 212, 244)","rgb(254, 197, 122)","rgb(255, 183, 160)"] ,
  radius: 1,
  innerRadius: 0.6,
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
      formatter: function formatter() {
        return `3.02 ETH`;
      }
    }
  }
};

function PieChart() {
  return (
    <Wrapper style = {{width: "30em", margin: "0 0 0 3em"}}>
      <Pie {...config} />
    </Wrapper>
  );
}

export default PieChart;