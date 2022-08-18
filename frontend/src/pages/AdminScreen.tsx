import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Admin from "../images/AdminIcon.svg";

function AdminScreen() {

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

  const adminStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "36px",
    fontWeight: '500',
    lineHeight: '41px',
    color: "#000000",
  };

  const adminBoxStyle: CSS.Properties = {
    position: "relative",
    height: "17em",
    left: "0px",
    right: "0px",
    top: "0px",
    
    marginBottom: "0.9743589743589743em",
  };



  return (
    <>

        <Row style = {navbarContainer}>
          <Col flex={1} style = {logoThirdStyle}><Logo /></Col>
          <Col flex={3}>empty</Col>
          <Col flex={1}>address</Col>
        </Row>

        <Row>
          <Col flex={1}>empty</Col>
          <Col flex={1}>transaction</Col>
          <Col flex={1} style = {adminBoxStyle}>
            <Row justify="center" ><img src={Admin} alt="Admin görseli"/></Row>
            <Row justify="center" ><h1 style = {adminStyle}>Admin</h1></Row>
            </Col>
          <Col flex={1}>amount</Col>
          <Col flex={1}>empty</Col>
        </Row>

        
        <Row>
          <Col flex={2}>empty</Col>
          <Col flex={1}>searchbar</Col>
          <Col flex={2}>empty</Col>
        </Row>

        <Row>
          <Col flex={1}>empty</Col>
          <Col flex={3}>history</Col>
          <Col flex={1}>empty</Col>

        </Row>
     
    </>
  );
}

export default AdminScreen;
