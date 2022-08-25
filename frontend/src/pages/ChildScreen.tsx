import CSS from "csstype";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { Col, Row, Statistic } from "antd";
import "antd/dist/antd.css";
import PieChart from "../components/PieChart";
import HistoryTable from "../components/HistoryTable";
import Clock from "../images/ClockIcon.svg";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, CONTRACT_BLOCK } from '../Contract';

const { Countdown } = Statistic;

function ChildScreen() {
  const [time, setTime] = useState(0);
  const [walletAddr, setWalletAddr] = useState("");
  const [balance, setBalance] = useState("0");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [transactions, setTransactions] = useState(Array<any>);

  let navigate = useNavigate();
  let ledger: ethers.Contract;

  const initMetaMask = async () => {
    if ((window as any).ethereum == null) {
      navigate("/");
    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    setProvider(provider);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    signer.getAddress().then((addr: string) => setWalletAddr(addr));
    ledger = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Re-route user if necessary
    if (await ledger.isRegistered()) {
      if ((await ledger.isAdult())) {
        navigate("/Parent");
        return;
      }
    } else {
      navigate("/");
      return;
    }

    ledger.getAdultTime().then((t: number) => setTime(t * 1000));
    ledger.getBalance().then((b: string) => setBalance(b));
  }

  useEffect(() => {
    initMetaMask();

    (window as any).ethereum?.removeAllListeners();
    (window as any).ethereum?.on('accountsChanged', () => {
      initMetaMask();
    });
  }, []);

  const fetchHistory = async () => {
    let transferFilter = {
      address: CONTRACT_ADDRESS,
      fromBlock: CONTRACT_BLOCK,
      topics: [
        ethers.utils.id("Transfer(address,address,uint256)"),
        null,
        "0x000000000000000000000000" + walletAddr.substring(2)
      ]
    };
    const events = await provider!.getLogs(transferFilter)
    const interf = new ethers.utils.Interface(CONTRACT_ABI);

    let txns: Array<{
      key: string;
      sender: string;
      receiver: string;
      date: string;
      amount: string;
    }> = [];

    for (const event of events) {
      const date = (await provider!.getBlock(event.blockNumber)).timestamp;
      const decoded = interf.decodeEventLog("Transfer", event.data, event.topics);
      txns.push({
        key: event.transactionHash,
        sender: decoded.from,
        receiver: `You (${decoded.to})`,
        date: new Date(date * 1000).toLocaleString(),
        amount: ethers.utils.formatEther(decoded["value"]) + " ETH",
      });
    }

    txns.reverse();
    setTransactions(txns);
  }


  useEffect(() => {
    if (provider != null && walletAddr != "") {
      fetchHistory();
    }
  }, [walletAddr]);

  const logoThirdStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",
    paddingLeft: "1em",
    marginBottom: "10em",
    transform: 'scale(0.9)'

  };

  const navbarContainer: CSS.Properties = {
    position: "relative",height: "12em",
    background: "linear-gradient(270deg, #BEA8F5 0%, rgba(190, 168, 245, 0) 100%)",
  };

  const FirstLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "36px",
    fontWeight: '500',
    lineHeight: '41px',
    letterSpacing: '-0.01em',
    color: "#4E1DAC",
  };

  const secondLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "21px",
    fontWeight: '500',
    lineHeight: '41px',
    letterSpacing: '-0.01em',
    color: "#000000",

    paddingBottom: "4em",
  };


  const thirdLineStyle: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "1.2em",
    fontWeight: 'bold',
    lineHeight: '1em',
    letterSpacing: '-0.01em',
    color: "#000000",
  };

  const textsContainer: CSS.Properties = {
    padding: "8em 8em 0 4em",
  };

  const histTextStyle: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: "41px",
    letterSpacing: "-0.01em",
    color: "#4E1DAC",
    marginLeft: "4em",
    marginTop: "0.2em",
  };

  const historyLineStyle: CSS.Properties = {
    position: "absolute",
    width: "82%",
    left: "9em",
    border: "1px solid #4E1DAC",
  };

  const tableStyle: CSS.Properties = {
    margin: "4em 4em 0 4em",
  };

  const clockStyle: CSS.Properties = {
    marginRight: "2em",
  };

  const glassContainer: CSS.Properties = {
    position: "relative",
    height: "30em",
    width: "42em",
    margin: "4em 10em 0 4em",

    backdropFilter: "blur(20px)",
    background:
      "linear-gradient(105.69deg, #FFFFFF 1.97%, rgba(255, 255, 255, 0) 200%)",
    boxShadow:
      "-2px 2px 12px rgba(0, 0, 0, 0.25), inset -2px 2px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2.5rem",
  };

  return (
    <>
      <Row style={navbarContainer}>
        <Col flex={1} style={logoThirdStyle}><Logo /></Col>
        <Col flex={3}></Col>
        <Col flex={1}><NavBar addr={walletAddr} balance={ethers.utils.formatEther(balance)} /></Col>
      </Row>


      <Row justify="center">

        <Col style={textsContainer}>
          <Row>
            <h1 style={FirstLineStyle}>Your Account Information</h1>
          </Row>
          <Row>
            <h2 style={secondLineStyle}>Child Account</h2>
          </Row>
          <Row>
            <h2 style={thirdLineStyle}>Time remaining before you can withdraw your balance.</h2>
          </Row>
          <Row>
            <img style={clockStyle} src={Clock} alt="Clock img" />
            <Countdown style={{
              margin: "1em 0 0 0",
              fontFamily: "Ubuntu",
              fontSize: "1em",
              fontWeight: "bold",
            }}
              value={time}
              format="Y year D day H hour"
            />
          </Row>
        </Col>

        <Col style={glassContainer} ><PieChart /></Col>
      </Row>

      <Row>
        <h1 style={histTextStyle}>Transaction History</h1>
      </Row>
      <Row>
        <hr style={historyLineStyle} />
      </Row>

      <Row justify="center">
        <Col flex={1}></Col>
        <Col flex={2} style={tableStyle}><HistoryTable data={transactions} /></Col>
        <Col flex={1}></Col>
      </Row>
    </>
  );
}

export default ChildScreen;
