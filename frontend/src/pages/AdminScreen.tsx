import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Divider, Input, Space, Table, Tag  } from "antd";
import "antd/dist/antd.css";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useState } from "react";
import Admin from "../images/AdminIcon.svg";
import { AudioOutlined } from '@ant-design/icons';
import type {ColumnsType} from 'antd/es/table';
import HistoryTable from "../components/HistoryTable";
import NavBar from "../components/NavBar";
import Clock from "../images/Clock.svg";


function AdminScreen() {

  //table
  interface DataType {
    key: string;
    sender: string;
    receiver: string;
    date: string;
    amount: string;
  }

  const data: DataType[] = [
    {
      key: '1',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.2 ETH',
    },
    {
      key: '2',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.3 ETH',
    },
    {
      key: '3',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.1 ETH',
    },
    {
      key: '4',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '1 ETH',
    },
    {
      key: '5',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '4 ETH',
    },
    {
      key: '6',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.5 ETH',
    },
    {
      key: '7',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '1.3 ETH',
    },
    {
      key: '8',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '2.1 ETH',
    },
    {
      key: '9',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '1.1 ETH',
    },
    {
      key: '10',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '10 ETH',
    },
    {
      key: '11',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.26 ETH',
    },
    {
      key: '12',
      sender: '0xb794f5ea0ba39494ce839613fffba74279579268',
      receiver: '0xc463f5ea0ba39494ce83964689fba74279579268',
      date: '12.08.2022 - 14:36:23',
      amount: '0.89 ETH',
    },
  ];

  //searchbar
  const { Search } = Input;

  const onSearch = (value: string) => console.log(value);

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
    height: "15em",
    left: "0px",
    right: "0px",
    top: "0px",
    marginTop: "1em",
    
    marginBottom: "0.9743589743589743em",
  };

  const leftGlassContainer: CSS.Properties = {
    position: "relative",
    marginTop: "2em",
    height: "10em",
    width: "8.5em",

    padding: "20px",
    backdropFilter: "blur(20px)",
    background: "linear-gradient(105.69deg, #FFFFFF 1.97%, rgba(255, 255, 255, 0) 200%)",
    boxShadow: "-2px 2px 12px rgba(0, 0, 0, 0.25), inset -2px 2px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2.5rem",
   
  };

  const leftUpperTextStyle: CSS.Properties = {
    position: "relative",
    transform: "translate(12%, 30%)",
    margin: "0 0 0 1.5em",

  };

  const leftLowerTextStyle: CSS.Properties = {
    position: "relative",
    

    fontFamily: 'Ubuntu',
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: "2rem",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.01em",

  };

  const rightGlassContainer: CSS.Properties = {
    position: "relative",
    height: "10em",
    width: "8.5em",
    left: "0px",
    right: "0px",
    top: "0px",
    marginTop: "2em",

    padding: "20px",
    backdropFilter: "blur(20px)",
    background: "linear-gradient(105.69deg, #FFFFFF 1.97%, rgba(255, 255, 255, 0) 200%)",
    boxShadow: "-2px 2px 12px rgba(0, 0, 0, 0.25), inset -2px 2px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2.5rem",
   
  };

  const rightUpperTextStyle: CSS.Properties = {
    position: "relative",
    transform: "translate(20%)",
    margin: "0 3.72em 0 0",

  };

  const rightLowerTextStyle: CSS.Properties = {
    position: "relative",


    fontFamily: 'Ubuntu',
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: "2rem",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "-0.01em",
  };

  const searchBarStyle: CSS.Properties = {
    position: "relative",
    background: "#FFFFFF",
    backdropFilter: "blur(12px)",
    boxShadow: "-2px 2px 12px rgba(0, 0, 0, 0.25), inset -2px 2px 12px rgba(0, 0, 0, 0.25), inset -2px 2px 12px rgba(0, 0, 0, 0.25)",

    width: "400px",
    marginLeft: "3em",
    marginBottom: "2.5em",
  }; 

  return (
    <>
        <Row style = {navbarContainer}>
          <Col flex={1} style = {logoThirdStyle}><Logo /></Col>
          <Col flex={3}>-</Col>
          <Col flex={1}><NavBar addr="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" balance="1.02" /></Col>
        </Row>

        <Row>
          <Col flex={1}></Col>
            <Col flex={1} style = {leftGlassContainer}>
                  
                  <Row  justify="center"><h1>TOTAL TRANSFER</h1></Row>
                  <Row  justify="center" style = {leftLowerTextStyle}><h1>9</h1></Row>
            
            </Col>
          <Col flex={1} style = {adminBoxStyle}>
            <Row justify="center" ><img src={Admin} alt="Admin görseli"/></Row>
            <Row justify="center" ><h1 style = {adminStyle}>Admin</h1></Row>
            </Col>
        <Col flex={1} style = {rightGlassContainer}>
          
          <Row  justify="center"><h1>TOTAL AMOUNT</h1></Row>
          <Row  justify="center" style = {rightLowerTextStyle}><h1>128 ETH</h1></Row>
        </Col>
          <Col flex={1}></Col>
        </Row>

        
        <Row>
          <Col flex={2}></Col>
          <Col flex={1} style = {searchBarStyle}> <Search className= "rowClassName1" style = {{textAlign: 'center'}} placeholder="search an address" allowClear onSearch={onSearch}/>  </Col>
          <Col flex={2}></Col>
        </Row>

        <Row>
          <Col flex={1}></Col>
          <Col flex={3}><HistoryTable data={data}/></Col>
          <Col flex={1}></Col>
        </Row>
    </>
  );
}

export default AdminScreen;
