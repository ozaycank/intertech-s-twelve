import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";

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

function ParentScreen() {


  return (
    <>
      <Row>
        <Col flex={1}>logo</Col>
        <Col flex={3}>boşluk</Col>
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
