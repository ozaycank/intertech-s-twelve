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
  const [topSenders, setTopSenders] = useState(Array<{type: string, value: number}>);

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

    const addr = await signer.getAddress();
    setWalletAddr(addr);

    let balanceFilter = {
      topics: [
        ethers.utils.id("BalanceChange(address,uint256)"),
        "0x000000000000000000000000" + addr.substring(2),
      ],
    };
    ledger.on(balanceFilter, (_: string, value: ethers.BigNumber) => {
      setBalance(value.toString());
      fetchHistory();
    });
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
    const interf = new ethers.utils.Interface(CONTRACT_ABI);

    const dateFormat = Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "medium",
    });
    
    const events = await provider!.getLogs(transferFilter);
    const promises = events.map(async (event) => {
      const date = (await provider!.getBlock(event.blockNumber)).timestamp;
      const decoded = interf.decodeEventLog("Transfer", event.data, event.topics);
      return {
        key: event.transactionHash,
        sender: decoded.from,
        receiver: `You (${decoded.to})`,
        date: dateFormat.format(new Date(date * 1000)),
        amount: ethers.utils.formatEther(decoded["value"]) + " ETH",
      };
    });

    const txns = await Promise.all(promises);
    txns.reverse();
    setTransactions(txns);
  }

  useEffect(() => {
    if (provider != null && walletAddr != "") {
      fetchHistory();
    }
  }, [walletAddr]);

  useEffect(() => {
    if (transactions.length > 0 && balance !== "0") {
      let senders = new Map<string, ethers.BigNumber>();

      for (const txn of transactions) {
        const amount = ethers.utils.parseEther(txn.amount.slice(0, -4));
        if (senders.has(txn.sender)) {
          senders.set(txn.sender, senders.get(txn.sender)!.add(amount));
        } else {
          senders.set(txn.sender, amount);
        }
      }

      let senderList: Array<{type: string, value: number}> = [];
      for (const [sender, amount] of senders) {
        senderList.push({type: sender, value: amount.mul(100).div(balance).toNumber()});
      }
      senderList.sort((a, b) => (b.value - a.value));
      setTopSenders(senderList);
    }
  }, [transactions]);

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
    marginTop: "1.2em",
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

  const glassText: CSS.Properties = {
    fontFamily: 'Ubuntu',
    fontSize: "1.2em",
    fontWeight: 'bold',
    lineHeight: '1em',
    letterSpacing: '-0.01em',
    color: "#000000",

    margin: "2em 0 0 2em", 
  }

  return (
    <>
      <Row style={navbarContainer}>
        <Col flex={1} style={logoThirdStyle}><Logo /></Col>
        <Col flex={3}></Col>
        <Col flex={0.1}><NavBar addr={walletAddr} balance={ethers.utils.formatEther(balance)} /></Col>
      </Row>


      <Row justify="center">

        <Col style={textsContainer}>
          <Row>
            <h1 style={FirstLineStyle}>Your Account Information</h1>
          </Row>
          <Row>
            <h2 style={secondLineStyle}>When you turn 18 your account will <br />  turn into a parent account,  and you will <br />  be able to withdraw money from your account.</h2>
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

        <Col style={glassContainer} > 
          <Row><span style={glassText}>Impact percentages of your elders who invested in your account:</span> </Row>
          <Row><PieChart pies={topSenders} total={ethers.utils.formatEther(balance) + " ETH"} /></Row>
        </Col>
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
