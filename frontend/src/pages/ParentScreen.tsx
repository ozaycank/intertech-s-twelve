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
import { CONTRACT_ADDRESS, CONTRACT_ABI, CONTRACT_BLOCK } from "../Contract";

function ParentScreen() {
  const [walletAddr, setWalletAddr] = useState("");
  const [accountBalance, setAccountBalance] = useState("0");
  const [receivers, setReceivers] = useState(
    Array<{ addr: string; nickname: string }>
  );
  const [transactions, setTransactions] = useState(Array<any>);

  const [ethToUSD, setEthToUSD] = useState("");
  const [ethToEUR, setEthToEUR] = useState("");
  const [ethToTRY, setEthToTRY] = useState("");
  const [ethToGBP, setEthToGBP] = useState("");
  const [ethToBTC, setEthToBTC] = useState("");


  const [ledger, setLedger] = useState<ethers.Contract>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  let navigate = useNavigate();

  const initMetaMask = async () => {
    if ((window as any).ethereum == null) {
      navigate("/");
    }

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    if (walletAddr === addr && ledger != null) {
      return; // This means nothing else needs to be changed here.
    }

    ledger?.removeAllListeners();

    const tmpLedger = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    setProvider(provider);
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

    tmpLedger
      .getBalance()
      .then((balance: string) => {
        setAccountBalance(balance);
      })
      .catch(console.error);

    let balanceFilter = {
      topics: [
        ethers.utils.id("BalanceChange(address,uint256)"),
        "0x000000000000000000000000" + tmpAddress.substring(2),
      ],
    };
    tmpLedger.on(balanceFilter, (_: string, value: ethers.BigNumber) => {
      setAccountBalance(value.toString());
    });

    let receiversFilter = {
      topics: [
        ethers.utils.id("ReceiverChange(address,bool,address,string)"),
        "0x000000000000000000000000" + tmpAddress.substring(2),
      ],
    };
    tmpLedger.on(receiversFilter, receiverEventListener);

    return tmpLedger;
  };

  const fetchReceivers = async (contract: ethers.Contract) => {
    if (contract != null) {
      let receiverList = await contract.getReceivers();
      setReceivers(receiverList);
    }
  };

  useEffect(() => {
    initMetaMask()
      .then((contract) => {
        fetchReceivers(contract!);
      })
      .catch(console.error);

    (window as any).ethereum?.removeAllListeners();
    (window as any).ethereum?.on("accountsChanged", () => {
      initMetaMask().then((contract) => {
        fetchReceivers(contract!).catch(console.error);
      });
    });
  }, []);

  const fetchHistory = async () => {
    const sendFilter = {
      address: CONTRACT_ADDRESS,
      fromBlock: CONTRACT_BLOCK,
      topics: [
        ethers.utils.id("Transfer(address,address,uint256)"),
        "0x000000000000000000000000" + walletAddr.substring(2),
      ],
    };

    const receiveFilter = {
      address: CONTRACT_ADDRESS,
      fromBlock: CONTRACT_BLOCK,
      topics: [
        ethers.utils.id("Transfer(address,address,uint256)"),
        null,
        "0x000000000000000000000000" + walletAddr.substring(2),
      ],
    };

    const [sendEvents, receiveEvents] = await Promise.all([
      provider!.getLogs(sendFilter), 
      provider!.getLogs(receiveFilter)
    ]);
    
    const interf = new ethers.utils.Interface(CONTRACT_ABI);

    const sendPromises = sendEvents.map(async (event) => {
      const date = (await provider!.getBlock(event.blockNumber)).timestamp;
      const decoded = interf.decodeEventLog("Transfer", event.data, event.topics);
      return {
        key: event.transactionHash,
        sender: `You (${decoded.from})`,
        receiver: decoded.to,
        date: date.toString(),
        amount: ethers.utils.formatEther(decoded["value"]) + " ETH",
      };
    });

    const receivePromises = receiveEvents.map(async (event) => {
      const date = (await provider!.getBlock(event.blockNumber)).timestamp;
      const decoded = interf.decodeEventLog("Transfer", event.data, event.topics);
      return {
        key: event.transactionHash,
        sender: decoded.from,
        receiver: `You (${decoded.to})`,
        date: date.toString(),
        amount: ethers.utils.formatEther(decoded["value"]) + " ETH",
      };
    });

    const dateFormat = Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "medium",
    });

    const txns = await Promise.all(sendPromises.concat(receivePromises));
    txns.sort((a, b) => parseInt(b.date) - parseInt(a.date));
    txns.forEach((txn) => {
      txn.date = dateFormat.format(new Date(parseInt(txn.date) * 1000));
    });
    setTransactions(txns);
  };

  useEffect(() => {
    if (provider != null && walletAddr !== "") {
      fetchHistory();
    }
  }, [walletAddr]);

  const receiverEventListener = (
    _: string,
    added: boolean,
    receiver: string,
    nickname: string,
    event: any
  ) => {
    if (added) {
      setReceivers((receiverList) =>
        receiverList.concat([{ addr: receiver, nickname: nickname }])
      );
    } else {
      setReceivers((receiverList) => {
        let list = receiverList.concat();
        const index = list.findIndex((a) => a.addr === receiver);
        if (index !== -1) {
          list.splice(index, 1);
        }
        return list;
      });
    }
  };

  const logoThirdStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",
    paddingLeft: "1em",
    marginBottom: "10em",
    transform: "scale(0.9)",
  };

  const navbarContainer: CSS.Properties = {
    position: "relative",
    height: "12em",
    background:
      "linear-gradient(270deg, #BEA8F5 0%, rgba(190, 168, 245, 0) 100%)",
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
    paddingLeft: "10em",
    marginBottom: "10em",
    marginTop: "2em",
  };

  const amountContainer: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    lineHeight: "41px",

    margin: "1em 4em 0 4em",
  };

  const transferContainer: CSS.Properties = {
    fontFamily: "Ubuntu",
    fontWeight: "bold",

    margin: "-6em 0 0 0",
  };

  //API
  useEffect(() => {
    fetch("https://exchange-rates.abstractapi.com/v1/live/?api_key=9b626d5b57974e3ab328bc8325f56568&base=ETH&target=USD,EUR,TRY,GBP,BTC", {
    })
      .then((response) => response.json())
      .then((data) =>
          {
        setEthToUSD(
          (Math.round(parseFloat(data.exchange_rates.USD) * 1000) / 1000).toString()
        );
        setEthToEUR(
          (Math.round(parseFloat(data.exchange_rates.EUR) * 1000) / 1000).toString()
        );
        setEthToTRY(
          (Math.round(parseFloat(data.exchange_rates.TRY) * 1000) / 1000).toString()
        );
        setEthToGBP(
          (Math.round(parseFloat(data.exchange_rates.GBP) * 1000) / 1000).toString()
        );
        setEthToBTC(
          (Math.round(parseFloat(data.exchange_rates.BTC) * 1000) / 1000).toString()
        )
          }
          
      );
  }, []);

  return (
    <>
      <Row style={navbarContainer}>
        <Col flex={1} style={logoThirdStyle}>
          <Logo />
        </Col>
        <Col flex={3}></Col>
        <Col flex={0.1}>
          <NavBar
            addr={walletAddr}
            balance={ethers.utils.formatEther(accountBalance)}
          />
        </Col>
      </Row>

      <Row>
        <Col flex={1}></Col>
        <Col flex={4} style={glassContainer}>
          <Row style={exchangeContainer}>
            <h1> ETH Exchange Values: {ethToUSD} {ethToEUR} {ethToTRY} {ethToGBP} {ethToBTC}</h1>
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
                }}
              />
            </Col>
            <Col flex={2} style={transferContainer}>
              <h2>Transfer</h2>
              <TransferForm
                receivers={receivers}
                onTransfer={async (addr, amount) => {
                  const tx = await ledger!.send(addr, amount);
                  await tx.wait();
                  fetchHistory();
                }}
              />
            </Col>
            <Col flex={1}></Col>
          </Row>
        </Col>

        <Col flex={1}></Col>
      </Row>

      <Row style={middleContainer}>
        <Col flex={1}></Col>
        <Col flex={2}>
          <Row>
            {" "}
            <h1 style={textStyle}>Add New Receiver</h1>
          </Row>
          <hr style={receiverLineStyle} />
          <Row style={addNewReceiverStyle}>
            <AddReceiverForm
              onSubmit={async (addr, nickname) => {
                const tx = await ledger!.registerReceiver(addr, nickname);
                await tx.wait();
              }}
            />
          </Row>
        </Col>
        <Col flex={2}>
          <Row>
            <h1 style={textStyle}>My Receivers</h1>
          </Row>
          <hr style={receiverLineStyle} />
          <Row style={myReceiversStyle}>
            <ReceiverList
              receivers={receivers}
              onRemove={async (address) => {
                const tx = await ledger!.forgetReceiver(address);
                await tx.wait();
              }}
            />
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
        <Col flex={3} style={tableStyle}>
          <HistoryTable data={transactions} />
        </Col>
        <Col flex={1}> </Col>
      </Row>
    </>
  );
}

export default ParentScreen;
