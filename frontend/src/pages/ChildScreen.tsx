import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider,Statistic, Avatar } from "antd";
import "antd/dist/antd.css";
import { UserOutlined } from '@ant-design/icons';
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Navbar from "../components/NavBar";
import type { countdownValueType } from 'antd/es/statistic/utils';
import PieChart from "../components/PieChart";
import HistoryTable from "../components/HistoryTable";


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
    left: "0px",
    right: "0px",
    top: "0px",
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
  };


  const thirdLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "18px",
    fontWeight: '500',
    lineHeight: '21px',
    letterSpacing: '-0.01em',
    color: "#000000",
  };

  const textBoxContainer: CSS.Properties = {
    marginTop: "203px",
    marginLeft: "60px",
    marginBottom: "93px",
  };


  const histTextStyle: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: "41px",
    letterSpacing: "-0.01em",
    color: "#4E1DAC",
    marginLeft: "5em",
    marginTop: "2em",
  };

  const historyLineStyle: CSS.Properties = {
    position: "absolute",
    width: "110em",
    left: "13em",
    border: "1px solid #4E1DAC",
  };

  const tableStyle: CSS.Properties = {
   marginTop: "4em",
  };

  return (
    <>
      <Row style = {navbarContainer}>
          <Col flex={1} style = {logoThirdStyle}><Logo /></Col>
          <Col flex={3}>empty</Col>
          <Col flex={1}>address</Col>
        </Row>


      <Row style = {textBoxContainer}>


        <Col flex={2}>
          <Row>
            <h1 style = {FirstLineStyle}>Your Account Information</h1>
          </Row>
          <Row>
            <h2 style = {secondLineStyle}>Child Account</h2>
          </Row>
          <Row>
            <h2 style = {thirdLineStyle}>Time remaining before you can withdraw your balance.</h2>
          </Row>
          <Row> <Countdown title="Day Level" value={deadline} format="D : H : m : s" /> </Row>
        </Col>

        <Col flex={3}><PieChart/></Col>


      </Row>
     
      <Row> 
          <h1 style = {histTextStyle}>Transaction History</h1>
        </Row> 
        <Row>
          <hr style={historyLineStyle} />
        </Row>
          

        <Row>
          <Col flex={1}></Col>
          <Col flex={3} style = {tableStyle}><HistoryTable data={data}/></Col>
          <Col flex={1}></Col>
        </Row>
    </>
  );
}

export default ChildScreen;
