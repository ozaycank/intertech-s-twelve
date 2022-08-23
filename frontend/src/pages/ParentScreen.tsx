import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import AddReceiverForm from "../components/AddReceiverForm";
import ReceiverList from "../components/ReceiverList";
import DepositWithdrawForm from "../components/DepositWithdrawForm";
import HistoryTable from "../components/HistoryTable";
import NavBar from "../components/NavBar";
import TransferForm from "../components/TransferForm";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../Contract';


function ParentScreen() {
  const [walletAddr, setWalletAddr] = useState("");
  const [accountBalance, setAccountBalance] = useState("0");
  const [receivers, setReceivers] = useState(Array<{ addr: string, nickname: string }>);
  const [ledger, setLedger] = useState<ethers.Contract>();

  let navigate = useNavigate();

  const initMetaMask = async () => {
    if ((window as any).ethereum == null) {
      navigate("/");
    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    if (walletAddr === addr && ledger != null) {
      return; // This means nothing else needs to be changed here.
    }

    ledger?.removeAllListeners();
    
    const tmpLedger = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    setLedger(tmpLedger);
    
    // Re-route user if necessary
    if (await tmpLedger.isRegistered()) {
      if (!(await tmpLedger.isAdult())) {
        navigate("/Child");
        return;
      }
    } else {
      navigate("/Login");
      return;
    }
    
    const tmpAddress = await signer.getAddress();
    setWalletAddr(tmpAddress);
    
    tmpLedger.getBalance().then((balance: string) => { setAccountBalance(balance) }).catch(console.error);

    let balanceFilter = {
      topics: [
        ethers.utils.id("BalanceChange(address,uint256)"),
        "0x000000000000000000000000" + tmpAddress.substring(2)
      ]
    };
    tmpLedger.on(balanceFilter, (_: string, value: ethers.BigNumber) => {
      setAccountBalance(value.toString())
    });

    let receiversFilter = {
      topics: [
        ethers.utils.id("ReceiverChange(address,bool,address,string)"),
        "0x000000000000000000000000" + tmpAddress.substring(2)
      ]
    };
    tmpLedger.on(receiversFilter, receiverEventListener);

    return tmpLedger;
  };

  const fetchReceivers = async (contract: ethers.Contract) => {
    if (contract != null) {
      let receiverList = await contract.getReceivers();
      receiverList.map((a: any) => {
        return { addr: a['addr'], nickname: a['nickname'] };
      })
      setReceivers(receiverList);
    }
  }

  useEffect(() => {
    initMetaMask().then((contract) => {
      fetchReceivers(contract!).catch(console.error)
    });

    (window as any).ethereum?.removeAllListeners();
    (window as any).ethereum?.on('accountsChanged', () => {
      console.log("Changed accounts")
      initMetaMask().then((contract) => {
        fetchReceivers(contract!).catch(console.error)
      });
      console.log("Account Changed!")
    });
  }, []);

  const receiverEventListener = (_: string, added: boolean, receiver: string, nickname: string, event: any) => {
    if (added) {
      setReceivers((receiverList) => receiverList.concat([{ addr: receiver, nickname: nickname }]));
    } else {
      setReceivers((receiverList) => {
        let list = receiverList.concat();
        const index = list.findIndex(a => a.addr === receiver);
        if (index !== -1) {
          list.splice(index, 1);
        }
        return list;
      });
    }
  }

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

  const logoThirdStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",
    paddingLeft: "1em",
    marginBottom: "10em",
    transform: "scale(0.9)",
  };

  const navbarContainer: CSS.Properties = {
    position: "relative",
    height: "8.75em",
    left: "0px",
    right: "0px",
    top: "0px",
    background:
      "linear-gradient(270deg, #BEA8F5 0%, rgba(190, 168, 245, 0) 100%)",
    paddingBottom: "11em",
  };

  const textStyle: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: "41px",
    letterSpacing: "-0.01em",
    color: "#4E1DAC",

  };

  const receiverLineStyle: CSS.Properties = {
    position: "absolute",
    width: "33em",
    border: "1px solid #4E1DAC",
  };

  const glassContainer: CSS.Properties = {
    position: "relative",
    height: "40em",
    width: "60em",

    right: "0em",
    marginTop: "2em",
    marginLeft: "16em",
    marginRight: "16em",
    marginBottom: "3em",
    backdropFilter: "blur(20px)",
    background:
      "linear-gradient(105.69deg, #FFFFFF 1.97%, rgba(255, 255, 255, 0) 200%)",
    boxShadow:
      "-2px 2px 12px rgba(0, 0, 0, 0.25), inset -2px 2px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2.5rem",
  };


  //receiverlar için container

  const middleContainer: CSS.Properties = {
    margin: "3em 6em 2.25em 14em",
  };

  const addNewReceiverStyle: CSS.Properties = {
    marginTop: "2em",
  };

  const myReceiversStyle: CSS.Properties = {
    marginTop: "2em",
  };

  const histTextStyle: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: "41px",
    letterSpacing: "-0.01em",
    color: "#4E1DAC",
    marginLeft: "3em",
    marginTop: "2em",
  };

  const historyLineStyle: CSS.Properties = {
    position: "absolute",
    width: "87%",
    left: "6.4%",
    border: "1px solid #4E1DAC",
  };

  const tableStyle: CSS.Properties = {
    marginTop: "4em",
  };

  // exchange,amount ve transfer için container

  const exchangeContainer: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontWeight: "bold",

    lineHeight: "41px",
    paddingLeft: "3em",
    marginBottom: "10em",
    marginTop: "2em"
  };

  const amountContainer: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    lineHeight: "41px",

    margin: "2em 4em 0 4em",

  };

  const transferContainer: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontWeight: "bold",

    marginBottom: "10em",
  };


  return (
    <>
      <Row style={navbarContainer}>
        <Col flex={1} style={logoThirdStyle}>
          <Logo />
        </Col>
        <Col flex={3}></Col>
        <Col flex={1}><NavBar addr={walletAddr} balance={ethers.utils.formatEther(accountBalance)} /></Col>
      </Row>

      <Row>
        <Col flex={1}></Col>
        <Col flex={4} style={glassContainer}>
          <Row style={exchangeContainer}>
            <h1>ETH Exchange Values:</h1>
          </Row>
          <Row>
            <Col flex={1}></Col>
            <Col flex={2} style={amountContainer}>
              <h2>Withdraw / Deposit</h2>
              <DepositWithdrawForm
                onDeposit={async (amount) => {
                  const tx = await ledger!.deposit({ value: amount });
                  await tx.wait();
                }}
                onWithdraw={async (amount) => {
                  const tx = await ledger!.withdraw(amount);
                  await tx.wait();
                }} />
            </Col>
            <Col flex={2} style={transferContainer}>
              <h2>Transfer</h2>
              <TransferForm receivers={receivers} onTransfer={async (addr, amount) => {
                const tx = await ledger!.send(addr, amount);
                await tx.wait();
              }} />
            </Col>
            <Col flex={1}></Col>
          </Row>
        </Col>

        <Col flex={1}></Col>
      </Row>

      <Row style={middleContainer}>
        <Col flex={1}></Col>
        <Col flex={2}>
          <Row> <h1 style={textStyle}>Add New Receiver</h1></Row>
          <hr style={receiverLineStyle} />
          <Row style={addNewReceiverStyle}><AddReceiverForm onSubmit={async (addr, nickname) => {
            const tx = await ledger!.registerReceiver(addr, nickname);
            await tx.wait();
          }} />
          </Row>
        </Col>
        <Col flex={2}>
          <Row>
            <h1 style={textStyle}>My Receivers</h1>
          </Row>
          <hr style={receiverLineStyle} />
          <Row style={myReceiversStyle}>
            <ReceiverList receivers={receivers} onRemove={async (address) => {
              const tx = await ledger!.forgetReceiver(address);
              await tx.wait();
            }} />
          </Row>
        </Col>
        <Col flex={1}></Col>
      </Row>

      <Row>
        <h1 style={histTextStyle}>Transaction History</h1>
      </Row>
      <Row>
        <hr style={historyLineStyle} />
      </Row>

      <Row>
        <Col flex={1}></Col>
        <Col flex={3} style={tableStyle}><HistoryTable data={data} /></Col>
        <Col flex={1}>  </Col>
      </Row>
    </>
  );
}

export default ParentScreen;
