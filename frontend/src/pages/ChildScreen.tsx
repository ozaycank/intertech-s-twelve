import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider,Statistic, Avatar } from "antd";
import "antd/dist/antd.css";
import { UserOutlined } from '@ant-design/icons';
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";

import type { countdownValueType } from 'antd/es/statistic/utils';
import PieChart from "../components/PieChart";
import HistoryTable from "../components/HistoryTable";
import Clock from "../images/ClockIcon.svg";
import NavBar from "../components/NavBar";


const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK


function ChildScreen() {

  //table
  interface DataType {
    key: string;
    sender: string;
    receiver: string;
    date: string;
    amount: string;
  }

  const data: DataType[] = [
    {
      key: '1',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.2 ETH',
    },
    {
      key: '2',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.3 ETH',
    },
    {
      key: '3',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.1 ETH',
    },
    {
      key: '4',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '1 ETH',
    },
    {
      key: '5',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '4 ETH',
    },
    {
      key: '6',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.5 ETH',
    },
    {
      key: '7',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '1.3 ETH',
    },
    {
      key: '8',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '2.1 ETH',
    },
    {
      key: '9',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '1.1 ETH',
    },
    {
      key: '10',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '10 ETH',
    },
    {
      key: '11',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.26 ETH',
    },
    {
      key: '12',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.89 ETH',
    },
  ];

  const logoThirdStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",
    paddingLeft: "1em",
    marginBottom: "10em",
    transform: 'scale(0.7)'

  };

  const navbarContainer: CSS.Properties = {
    position: "relative",
    height: "8.75em",
    background: "linear-gradient(270deg, #BEA8F5 0%, rgba(190, 168, 245, 0) 100%)",
    paddingBottom: "11em",
  
  };

  const FirstLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "36px",
    fontWeight: '500',
    lineHeight: '41px',
    letterSpacing: '-0.01em',
    color: "#4E1DAC",
  };

  const secondLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "21px",
    fontWeight: '500',
    lineHeight: '41px',
    letterSpacing: '-0.01em',
    color: "#000000",

    paddingBottom: "4em",
  };


  const thirdLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "18px",
    fontWeight: '500',
    lineHeight: '21px',
    letterSpacing: '-0.01em',
    color: "#000000",
    
  };

  const textsContainer: CSS.Properties = {

    padding: "8em 8em 0 4em",

  };

  const histTextStyle: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: "41px",
    letterSpacing: "-0.01em",
    color: "#4E1DAC",
    marginLeft: "4em",
    marginTop: "0.2em",
  };

  const historyLineStyle: CSS.Properties = {
    position: "absolute",
    width: "82%",
    left: "9em",
    border: "1px solid #4E1DAC",
  };

  const tableStyle: CSS.Properties = {
   margin: "4em 4em 0 4em",
  };

  const clockStyle: CSS.Properties = {
    marginRight: "2em",
   };
 
   const glassContainer: CSS.Properties = {
    position: "relative",
    height: "30em",
    width: "40em", 
   
    margin:"4em 10em 0 4em",
  
    

    backdropFilter: "blur(20px)",
    background:
      "linear-gradient(105.69deg, #FFFFFF 1.97%, rgba(255, 255, 255, 0) 200%)",
    boxShadow:
      "-2px 2px 12px rgba(0, 0, 0, 0.25), inset -2px 2px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2.5rem",
  };

  return (
    <>
      <Row style = {navbarContainer}>
          <Col flex={1} style = {logoThirdStyle}><Logo /></Col>
          <Col flex={2}></Col>
          <Col flex={1}><NavBar addr="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" balance="1.02" /></Col>
        </Row>


      <Row justify = "center">
      
        <Col style = {textsContainer}>
          <Row>
            <h1 style = {FirstLineStyle}>Your Account Information</h1>
          </Row>
          <Row>
            <h2 style = {secondLineStyle}>Child Account</h2>
          </Row>
          <Row>
            <h2 style = {thirdLineStyle}>Time remaining before you can withdraw your balance.</h2>
          </Row>
          <Row><img style = {clockStyle} src={Clock} alt="Clock img"/> <Countdown title="Day Level" value={deadline} format="D : H : m : s" /> </Row>
        </Col>

        <Col style = {glassContainer}><PieChart/></Col>
      
        
      </Row>
     
        <Row> 
          <h1 style = {histTextStyle}>Transaction History</h1>
        </Row> 
        <Row>
          <hr style={historyLineStyle} />
        </Row>
          

        <Row justify = "center">
          <Col flex={1}></Col>
          <Col flex={2} style = {tableStyle}><HistoryTable data={data}/></Col>
          <Col flex={1}></Col>
        </Row>
    </>
  );
}

export default ChildScreen;
