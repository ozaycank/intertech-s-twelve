import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider,Statistic, Avatar } from "antd";
import "antd/dist/antd.css";
import { UserOutlined } from '@ant-design/icons';
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Navbar from "../components/NavBar";
import type { countdownValueType } from 'antd/es/statistic/utils';


const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK


function ChildScreen() {

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

  const textBoxStyle: CSS.Properties = {
    marginTop: "203px",
    marginLeft: "60px",
    marginBottom: "93px",
  };

  const lineStyle: CSS.Properties = {
    position: "absolute",
    width: "1320px",
    height: "0px",
    left: "60px",
    

    border: "1px solid #4E1DAC"
  }

  return (
    <>
      <Row style = {navbarContainer}>
          <Col flex={1} style = {logoThirdStyle}><Logo /></Col>
          <Col flex={3}>empty</Col>
          <Col flex={1}>address</Col>
        </Row>
      <Row>
        <Col flex={2} style = {textBoxStyle}>
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

        <Col flex={3}>Percentage</Col>


      </Row>
     
      <Row>
        <Col flex={1}>empty</Col>
        <Col flex={3}>
          <Row> <h1 style = {FirstLineStyle}>Transaction History</h1></Row> 
          <hr style = {lineStyle}/>
          <Row>History</Row> 
          
        </Col>
        <Col flex={1}>empty</Col>
      </Row>
    </>
  );
}

export default ChildScreen;
