import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Input } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../images/AdminIcon.svg";
import HistoryTable from "../components/HistoryTable";
import NavBar from "../components/NavBar";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, CONTRACT_BLOCK } from '../Contract';


interface DataType {
  key: string,
  sender: string,
  receiver: string,
  date: string,
  amount: string,
}

function AdminScreen() {
  const [totalTransfers, setTotalTransfers] = useState("0");
  const [totalTransferred, setTotalTransfferred] = useState("0");
  const [transactions, setTransactions] = useState(Array<DataType>);
  const [filteredTransactions, setFilteredTransactions] = useState(Array<DataType>);

  let navigate = useNavigate();

  const fetchData = async () => {
    if ((window as any).ethereum == null) {
      navigate("/");
      return;
    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const ledger = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    ledger.totalTransfers().then((t: ethers.BigNumber) => setTotalTransfers(t.toString()));
    ledger.totalTransferred().then((t: ethers.BigNumber) => setTotalTransfferred(t.toString()));

    let transferFilter = {
      address: CONTRACT_ADDRESS,
      fromBlock: CONTRACT_BLOCK,
      topics: [ethers.utils.id("Transfer(address,address,uint256)")]
    };

    const events = await provider.getLogs(transferFilter)
    const interf = new ethers.utils.Interface(CONTRACT_ABI);

    const dateFormat = Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "medium",
    });

    const promises = events.map(async (event) => {
      const date = (await provider!.getBlock(event.blockNumber)).timestamp;
      const decoded = interf.decodeEventLog("Transfer", event.data, event.topics);
      return {
        key: event.transactionHash,
        sender: decoded.from as string,
        receiver: decoded.to as string,
        date: dateFormat.format(new Date(date * 1000)),
        amount: ethers.utils.formatEther(decoded["value"]) + " ETH",
      };
    });

    const txns = await Promise.all(promises);
    txns.reverse();
    setTransactions(txns);
    setFilteredTransactions(txns);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //searchbar
  const { Search } = Input;

  const onSearch = (value: string) => {
    setFilteredTransactions(transactions.filter((element) =>
      element.sender.toLowerCase().includes(value.trim().toLowerCase())
      || element.receiver.toLowerCase().includes(value.trim().toLowerCase())
    ));
  };

  const logoThirdStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",
    paddingLeft: "1em",
    marginBottom: "10em",
    transform: 'scale(0.8)'
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
      <Row style={navbarContainer}>
        <Col flex={1} style={logoThirdStyle}><Logo /></Col>
        <Col flex={3}></Col>
        <Col flex={1}></Col>
      </Row>

      <Row>
        <Col flex={1}></Col>
        <Col flex={1} style={leftGlassContainer}>

          <Row justify="center"><h1>TOTAL TRANSFERS</h1></Row>
          <Row justify="center" style={leftLowerTextStyle}><h1>{totalTransfers}</h1></Row>

        </Col>
        <Col flex={1} style={adminBoxStyle}>
          <Row justify="center" ><img src={Admin} alt="Admin Indicator" /></Row>
          <Row justify="center" ><h1 style={adminStyle}>Admin</h1></Row>
        </Col>
        <Col flex={1} style={rightGlassContainer}>

          <Row justify="center"><h1>TOTAL AMOUNT</h1></Row>
          <Row justify="center" style={rightLowerTextStyle}><h1>{ethers.utils.formatEther(totalTransferred)} ETH</h1></Row>
        </Col>
        <Col flex={1}></Col>
      </Row>


      <Row>
        <Col flex={2}></Col>
        <Col flex={1} style={searchBarStyle}>
          <Search
            className="rowClassName1"
            style={{ textAlign: 'center' }}
            placeholder="search an address"
            allowClear
            onSearch={onSearch} />
        </Col>
        <Col flex={2}></Col>
      </Row>

      <Row>
        <Col flex={1}></Col>
        <Col flex={3}><HistoryTable data={filteredTransactions} /></Col>
        <Col flex={1}></Col>
      </Row>
    </>
  );
}

export default AdminScreen;
