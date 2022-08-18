import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";



function ParentScreen() {

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

  const historyLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "36px",
    fontWeight: '500',
    lineHeight: '41px',
    letterSpacing: '-0.01em',
    color: "#4E1DAC",
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
        <Col flex={1}>empty</Col>
        <Col flex={2}>balance</Col>
        <Col flex={2}>transfer</Col>
        <Col flex={1}>empty</Col>
      </Row>

      <Row>
        <Col flex={2}>add new receiver</Col>
        <Col flex={2}>my receivers</Col>
      </Row>

      <Row>
        <Col flex={1}>empty</Col>
        <Col flex={3}>
          <Row> <h1 style = {historyLineStyle}>Transaction History</h1></Row> 
          <hr style = {lineStyle}/>
          <Row>History</Row> 
          
        </Col>
        <Col flex={1}>empty</Col>
      </Row>
    </>
  );
}

export default ParentScreen;
