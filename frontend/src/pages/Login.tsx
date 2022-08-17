import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Child from "../images/Child.svg";
import Parent from "../images/Parent.svg";
import CButton from "../images/ChooseChild.svg";
import PButton from "../images/ChooseParent.svg";

function Login() {


  const imageClick = () => {
    console.log('Click');
  } 


  const bg: CSS.Properties = {
    backgroundColor: "#F8F4DB",
    position: "relative",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",

  
  };

  const purpleFontColor: CSS.Properties = {
    color: "#4E1DAC",
  };

  const logoLandingStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",

    paddingTop: "20px",
    paddingRight: "290px",
    paddingLeft: "10em",
  };

 const FYI: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",
    marginTop: '-20px',
    paddingBottom: '40px',
 };

  const ChildStyle: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",

   marginBottom: '10px',

  };

  const ParentStyle: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",

    marginBottom: '10px',

  };

  const CButtonStyle: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",

    

  };



  return (
    <>
      
      <body style = {bg}>

      <Row>
        <Col span={12} style = {logoLandingStyle}><Logo /></Col>
        <Col span={12}>col-12</Col>
      </Row>

      <Row>
        <Col span={4}>col-4</Col>
        <Col span={16} style = {FYI}>
            
            <Row justify="center">
                <h1><span style={purpleFontColor}>Before You Start</span> </h1>
              </Row>
            <Row justify="center">
                <h1>How are you planning to use Intertech's Twelve?</h1>
              </Row>
            <Row justify="center">
                <h3>You'll be guided by the role you choose.</h3>
            </Row>
            
            </Col>
        <Col span={4}>col-4</Col>
      </Row>

      
      <Row  justify="space-between">
      <Col span={4}>col-4</Col>
        <Col span={4} >
          
          <Row style = {ChildStyle} ><img src={Child} alt="Child görseli" onClick={() => imageClick()} /></Row>
          
            
        </Col>
        
        <Col span={4}>
          
        <Row style = {ParentStyle}><img src={Parent} alt="Parent görseli" onClick={() => imageClick()}/></Row>
                

        </Col>
        <Col span={4}>col-4</Col>
      </Row>
      </body>
    </>
  );
}

export default Login;
