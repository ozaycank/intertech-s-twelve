import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { Button, Divider } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Fox from "../images/MetamaskButton.jsx";
import Pig from "../images/pig.png";




function Landing() {

  const[walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("Request account...");

    //is Metamask Exist
    if ((window as any).ethereum) {
      console.log("detected");

      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts);
      } catch (error) {
        console.log("Error connecting.");
      }
    } else {
      console.log("Metamask not detected");
    }
  }

  const bg: CSS.Properties = {
    backgroundColor: "#F8F4DB",
    position: 'relative',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    

    paddingTop: '125px',
    paddingBottom: '170px',
    paddingRight: '62px',
    paddingLeft: ' 78px',

  };

  

  const logoLandingStyle: CSS.Properties = {
    position: 'relative',
    fontFamily: "Inter, sans-serif",
   
    marginTop: '125px',
    marginBottom: '26px',
    marginRight: '290px',
    marginLeft: '41.8px',
    
  };

  const purpleFontColor: CSS.Properties = {
    color: "#C055D1",
    
  };

  const UpperText: CSS.Properties = {
    position: 'relative',
    fontSize: "1.5em",
    fontFamily: "Inter, sans-serif",

    marginRight: '90px',
    marginBottom: '46px',
    marginTop: '26px',
    marginLeft: '53px',
  };

  const LowerText: CSS.Properties = {
    position: 'relative',
    fontSize: "1.2em",
    fontFamily: "Inter, sans-serif",

    marginRight: '336px',
    marginBottom: '65px',
    marginTop: '46px',
    marginLeft: '132px',
  };

  const ButtonStyle: CSS.Properties = {
    position: 'relative',

    marginRight: '529px',
    marginBottom: '1.584em',
    marginTop: '5.336em',
    marginLeft: '78px',

  };

  return (
    <body style={bg}>

      <Row>
        <Col flex={3}>
          <Row style={logoLandingStyle}>
            <Logo />
          </Row>

          <Row style={UpperText}>
            <h1>
              Safely transfer your savings to your loved ones with,{" "}
              <span style={purpleFontColor}>Intertech's Twelve.</span>{" "}
            </h1>
          </Row>

          <Row style={LowerText}>
            <h2>
              The reliable, modern, and innovative way to leave a legacy, start
              now!
            </h2>
          </Row>

          <Row style={ButtonStyle}>
            <Button onClick={requestAccount}>Connect with Metamask</Button>
          </Row></Col>
        <Col flex={2}><Row>
            <img src={Pig} alt="Pig empty" width="600" height="723"></img>
          </Row></Col>
      </Row>

    </body>
  );
}

export default Landing;
