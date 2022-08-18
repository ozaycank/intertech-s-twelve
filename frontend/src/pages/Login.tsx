import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
//import Child from "../images/Child.svg";
//import Parent from "../images/Parent.svg";
import Child from "../images/BGChild.svg";
import Parent from "../images/BG.svg";
import CButton from "../images/ChooseChild.svg";
import PButton from "../images/ChooseParent.svg";


function Login() {

  const buttonClick = () => {
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

  const upperText: CSS.Properties = {
    color: "#4E1DAC",
    textAlign: "center",
    fontSize: "2.6rem",
    lineHeight: "2.13rem"
  };

  const middleText: CSS.Properties = {
    textAlign: "center",
    fontSize: "2rem",
    lineHeight: "2.13rem",
    letterSpacing: "-0.02em",

  };

  const lowerText: CSS.Properties = {
    

  };

  const logoLandingStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",

    paddingTop: "3rem",
    paddingRight: "290px",
    paddingLeft: "10em",
  };

 const FYI: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",
    marginTop: '-40px',
    paddingBottom: '20px',
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

  const buttonStyle1: CSS.Properties = {
    position: "absolute",
    
    padding: "2.5rem",
    background: "linear-gradient(90deg, rgba(219, 211, 239, 0.8) 0%, rgba(219, 211, 239, 0) 107.64%)",
    backdropFilter: "blur(20px)",
    borderRadius: "2.5rem",
    width: "15rem",
    transform: "translate(30%, 515%)",
  };

  const buttonStyle2: CSS.Properties = {
    position: "absolute",
    padding: "2.5rem",
    background: "linear-gradient(105.69deg, #FFB8A1 1.97%, rgba(255, 255, 255, 0) 104.4%)",
    backdropFilter: "blur(20px)",
    borderRadius: "2.5rem",
    width: "15rem",
    transform: "translate(30%, 515%)",
  };

  const buttonBox: CSS.Properties = {
    width: "13.625rem",
    height: "3.5rem",
    left: "24.063rem",
    top: "52.438rem",
  };

  const buttonText: CSS.Properties = {
      position: "absolute",
      fontFamily: "Ubuntu, sans-serif",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, 380%)",
      
      fontSize: "2.25rem",
      lineHeight: "2.563rem",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      color: "#000000",

      
  };

  //Tuşlar ve svg için container
  const Container: CSS.Properties = {
    position: "relative",

  };

  //onMouseOver={changeBackground} 
  function changeBackground(e: React.ChangeEvent<any>) {
    e.target.style.background = 'grey';
    e.target.style.borderRadius = "80px";
  };
  

  function mouseOn2(e: React.ChangeEvent<any>) {
    e.target.style.background = '#FFB8A1';
    e.target.style.borderRadius = "80px";
    
  };

  function mouseOff2(e: React.ChangeEvent<any>) {
    e.target.style.background = 'linear-gradient(105.69deg, #FFB8A1 1.97%, rgba(255, 255, 255, 0) 104.4%)';
   
   
  };

  function mouseOn1(e: React.ChangeEvent<any>) {
    e.target.style.background = '#DBD3EF';
    e.target.style.borderRadius = "80px";
    
  };

  function mouseOff1(e: React.ChangeEvent<any>) {
    e.target.style.background = 'linear-gradient(90deg, rgba(219, 211, 239, 0.8) 0%, rgba(219, 211, 239, 0) 107.64%)';
    e.target.style.borderRadius = "80px";
  };

  return (
    <>
      

      <Row>
      <Col flex={1} style = {logoLandingStyle}><Logo /></Col>
      <Col flex={4}></Col>
      </Row>

      <Row>
      <Col flex={2}></Col>
        <Col flex={1} style = {FYI}>
            <Row justify="center">
                <h1><span style={upperText}>Before You Start</span> </h1>
              </Row>
            <Row justify="center">
                <h1 style = {middleText}>How are you planning to use Intertech's Twelve?</h1>
              </Row>
            <Row justify="center">
                <h3 style = {lowerText}>You'll be guided by the role you choose.</h3>
            </Row>
        </Col>
      <Col flex={2}></Col>
      </Row>

      <Row>
        
        <Col flex={2}>
          <Row justify="end">
            <Row style = {Container}>
              <img style = {ChildStyle}  src={Child} alt="Child görseli"/> 
              <Button onMouseEnter={mouseOn1} onMouseLeave={mouseOff1} style = {buttonStyle1} onClick={() => buttonClick()}>  </Button>
              <span style = {buttonText}>Choose</span>
            </Row>
          </Row>
        </Col>
        <Col flex={1}></Col>
        <Col flex={2}>

        <Row justify="start">
            <Row style = {Container}>
              <img style = {ParentStyle} src={Parent} alt="Child görseli"/> 
              <Button  onMouseEnter={mouseOn2} onMouseLeave={mouseOff2} style = {buttonStyle2} onClick={() => buttonClick()}> </Button>
              <span style = {buttonText}>Choose</span> 
            </Row>
          </Row>
        
          
          
          </Col>
      
      </Row>

    </>
  );
}

export default Login;
