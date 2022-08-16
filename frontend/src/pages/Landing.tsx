import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { Button, Divider } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Fox from "../images/MetamaskFox.svg";
import Telbg from "../images/Domuzcuk.svg";


function Landing() {
  const bg: CSS.Properties = {
    backgroundColor: "#F8F4DB"
  };

  const logoLandingStyle: CSS.Properties = {
    position: "absolute",

    left: "119.8px",
    fontFamily: "Inter, sans-serif",
    
  };

  const purpleFontColor: CSS.Properties = {
    color: "#C055D1",
    
  };

  const UpperText: CSS.Properties = {
    fontSize: "1.5em",
    fontFamily: "Inter, sans-serif",
 
  };

  const LowerText: CSS.Properties = {
    fontSize: "1.2em",
    fontFamily: "Inter, sans-serif",
    
   
  };

  return (
    <>
      <div style={bg}>



        <Row>

          <Col span = {16} >

          <Divider type="vertical" style={{ height: "40%" }}>

            <Row >
              <Logo />
            </Row>
            </Divider>

            <Divider type="vertical" style={{ height: "30%" }}>
            <Row>
              <h1>
                Safely transfer your savings to your loved ones with,{" "}
                <span style={purpleFontColor}>Intertech's Twelve</span>{" "}
              </h1>
            </Row>
            </Divider>

            <Divider type="vertical" style={{ height: "20%" }}>
            <Row>
              <h2>
                The reliable, modern, and innovative way to leave a legacy,
                start now!
              </h2>
            </Row>
            </Divider>

            <Divider>
            <Row>
              <Button>
                <img src={Fox} alt="Connect with Metamask" />
                Connect with Metamask
              </Button>
            </Row>
            </Divider>

          </Col>

          <Col span = {8} >
            <Row>
                <img src={Telbg} alt="Domuzun arkasındaki görseller" />
            </Row>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Landing;
