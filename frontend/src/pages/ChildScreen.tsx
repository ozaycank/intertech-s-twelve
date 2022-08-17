import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";


function ChildScreen() {

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
      <Row>
        <Col flex={1}>logo</Col>
        <Col flex={3}>boşluk</Col>
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
          <Row>CountDown</Row>
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