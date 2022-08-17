import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Admin from "../images/AdminIcon.svg";


function AdminScreen() {

  const adminStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "36px",
    fontWeight: '500',
    lineHeight: '41px',
    color: "#000000",
  };

  const adminBoxStyle: CSS.Properties = {
    marginTop: "144px",
    marginBottom: "0.9743589743589743em",
  };

  return (
    <>
        <Row>
          <Col flex={1}>logo</Col>
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
