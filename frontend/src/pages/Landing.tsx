import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { Button, Divider } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Fox from "../images/MetamaskFox.svg";
import Pig from "../images/pig.png";
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import Login from './Login';
import {useNavigate,} from "react-router-dom";



function Landing() {

  const[walletAddress, setWalletAddress] = useState("");

  let navigate = useNavigate();
  
  async function requestAccount() {
    console.log("Request account...");

    //is Metamask Exist
    if ((window as any).ethereum) {
      console.log("detected");

      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        navigate("/Login");
        
      } catch (error) {
        console.log("Error connecting.");
      }
    } else {
      console.log("Metamask not detected");
    }
  };

  const logoLandingStyle: CSS.Properties = {
    position: 'relative',
    fontFamily: "Inter, sans-serif",
    margin: "0 0 1.625em 7em",
  
    
  };

  const innerText: CSS.Properties = {
    color: "#C055D1",
    fontFamily: "Inter",
    fontSize: "3rem",
    fontWeight: "1200",
    lineHeight: "3.625rem",
  };

  const upperText: CSS.Properties = {
    fontSize: "2rem",
    fontWeight: 'bold',
    fontFamily: "Inter, sans-serif",
    lineHeight: "3rem",

  };

  const upperTextBox: CSS.Properties = {
    width: "42.063rem",
    height: "10.875rem",
    lineHeight: "3.625rem",
    marginLeft: "8.188rem",
  };

  const lowerText: CSS.Properties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "-0.01em",
    
  };

  const lowerTextBox: CSS.Properties = {
    width: "25.625rem",
    height: "4.25rem",
    lineHeight: "1.813rem",
    marginLeft: "8.188rem",
  };

  const buttonStyle: CSS.Properties = {
    padding: "4.375rem",
    background: "linear-gradient(105.69deg, #EDF12D 1.97%, rgba(252, 255, 84, 0) 104.4%)",
    backdropFilter: "blur(20px)",
    borderRadius: "80px",
    width: "62.5rem",
  };

  const buttonBox: CSS.Properties = {
    width: "45rem",
    marginTop: "4.063rem",
    marginLeft: "4rem",
  };

  const buttonText: CSS.Properties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "3rem",
      lineHeight: "3.625rem",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  };

  const pigStyle: CSS.Properties = {
    transform: 'scale(1.2)',
    marginLeft: '1.2rem',
  };

  const foxStyle: CSS.Properties = {
    transform: 'scale(2.2)',
    marginLeft: "2.5rem",
  
  };

  const leftContainer:  CSS.Properties = {
    width: "3rem",
 
  };

  const rightContainer:  CSS.Properties = {
    width: "47%",
    margin: "0 0 0 50em"
  };

  const bigContainer:  CSS.Properties = {
    transform: "translate(0.0001%, 15%)",
    margin: "0 0 0 0"
  };
  

  return (
    <>
     

      <Row justify = "center" style = {bigContainer}>
        
        <Col style = {leftContainer}> 
          <Row style = {logoLandingStyle}>
            <Logo />
          </Row>
          <Row style = {upperTextBox}>
            <h1 style = {upperText} >
              Safely transfer your savings to your loved ones with,
              <span style={innerText}>Intertech's Twelve.</span>
            </h1>
          </Row>
          <Row style = {lowerTextBox}>
            <h2 style = {lowerText} >
              The reliable, modern, and innovative way to leave a legacy, start
              now!
            </h2>
            
          </Row>
          <Row style = {buttonBox}>


            
            <Button style = {buttonStyle} onClick={requestAccount}>  <span style = {buttonText}>Connect with Metamask <img style = {foxStyle} src={Fox} alt="metamask fox" /> </span> </Button>
          </Row>
        </Col>

        <Col style = {rightContainer}>
          <img
            src={Pig}
            style={pigStyle}
            alt="Pig empty"
            width="600"
            height="723"
          ></img>
        </Col>

      </Row>
    </>
  );
}

export default Landing;
