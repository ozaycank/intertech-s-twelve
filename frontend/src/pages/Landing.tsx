import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { Button, notification } from "antd";
import { useState } from "react";
import Fox from "../images/MetamaskFox.svg";
import Pig from "../images/pig.png";
import { useNavigate } from "react-router-dom";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../Contract';
import { ethers } from 'ethers';



function Landing() {
  const [connecting, setConnecting] = useState(false);
  let navigate = useNavigate();

  const openInstallMetaMaskNotification = () => {
    const key = `open${Date.now()}`; // a unique id for the notification
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          notification.close(`${Date.now()}`);
          window.open('https://metamask.io');
        }}
      >
        Install Metamask
      </Button>
    );
    notification.open({
      message: 'MetaMask Is Not Installed',
      description: 'You need to have MetaMask installed to use this application.',
      btn,
      key
    });
  }

  const initMetaMask = async () => {
    setConnecting(true);
    //@ts-ignore
    if (!window.ethereum) {
      openInstallMetaMaskNotification();
      return;
    }

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const ledger = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    setConnecting(false);
    
    if (await ledger.isRegistered()) {
      if (await ledger.isAdult()) {
        navigate("/Parent");
      } else {
        navigate("/Child");
      }
    } else {
      navigate("/Login");
    }
  }

  const logoLandingStyle: CSS.Properties = {
    fontFamily: "Inter, sans-serif",
    margin: "9em 0 1.625em 5em",
  };

  const innerText: CSS.Properties = {
    color: "#C055D1",
    fontFamily: "Inter",
    fontSize: "3rem",
    fontWeight: "1200",
    lineHeight: "4rem",
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
    lineHeight: "4rem",
    marginLeft: "6rem",
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
    marginLeft: "6rem",
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
    marginTop: "9em",
  };

  const foxStyle: CSS.Properties = {
    transform: 'scale(2.2)',
    marginLeft: "2rem",

  };

  return (
    <>


      <Row justify="center" >

        <Col>
          <Row style={logoLandingStyle}>
            <Logo />
          </Row>
          <Row style={upperTextBox}>
            <h1 style={upperText} >
              Safely transfer your savings to your loved ones with,
              <span style={innerText}> Intertech's Twelve.</span>
            </h1>
          </Row>
          <Row style={lowerTextBox}>
            <h2 style={lowerText} >
              The reliable, modern, and innovative way to leave a legacy, start
              now!
            </h2>

          </Row>
          <Row style={buttonBox}>
            <Button style={buttonStyle} onClick={initMetaMask} disabled={connecting}>
              <span style={buttonText}>Connect with Metamask <img style={foxStyle} src={Fox} alt="metamask fox" /></span>
            </Button>
          </Row>
        </Col>

        <Col>
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
