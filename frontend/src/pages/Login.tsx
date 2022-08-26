import CSS from "csstype";
import Logo from "../components/Logo";
import { Col, Row, Button, Modal, DatePicker, Form, notification } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import ChildImg from "../images/BGChild.svg";
import ParentImg from "../images/BG.svg";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../Contract';

function Login() {
  let navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  let ledger: ethers.Contract;

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current.valueOf() < moment().subtract(18,'years').valueOf();
    
  };

  const initMetaMask = async () => {
    if ((window as any).ethereum == null) {
      navigate("/");
    }

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    ledger = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Re-route user if necessary
    if (await ledger.isRegistered()) {
      if ((await ledger.isAdult())) {
        navigate("/Parent");
        return;
      } else {
        navigate("/Child");
        return;
      }
    }
  }

  useEffect(() => {
    initMetaMask();

    (window as any).ethereum?.removeAllListeners();
    (window as any).ethereum?.on('accountsChanged', () => {
      initMetaMask();
    });
  }, []);

  const registerUser = async (birthdate: any) => {
    if (ledger == null) {
      await initMetaMask();
    }

    const tx = await ledger.createAccount(birthdate);
    await tx.wait();
  }

  const createChildAccount = async (values: any) => {
    setLoading(true);
    try {
      await registerUser(values.birthdate.add(18, 'y').unix());
      navigate("/Child");
    } catch (e: any) {
      notification.open({
        message: "Transaction Failed.",
        description: e.message,
      });
    } finally {
      setLoading(false);
    }
  }

  const createParentAccount = async () => {
    setLoading(true);
    try {
      await registerUser(0);
      navigate("/Parent");
    } catch (e: any) {
      notification.open({
        message: "Transaction Failed.",
        description: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const childButtonClick = () => {
    setVisible(true);
  };

  const upperText: CSS.Properties = {
    color: "#4E1DAC",
    textAlign: "center",
    fontSize: "2.6rem",
    lineHeight: "2.13rem",
  };

  const middleText: CSS.Properties = {
    textAlign: "center",
    fontSize: "2rem",
    lineHeight: "2.13rem",
    letterSpacing: "-0.02em",
  };

  const logoLoginStyle: CSS.Properties = {
    position: "relative",
    fontFamily: "Inter, sans-serif",

    paddingTop: "1rem",
    paddingRight: "18.125em",
    paddingLeft: "8em",
  };

  const FYI: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",
    marginTop: "-1px",
    paddingBottom: "20px",
    marginLeft: "2em",
  };

  const ChildStyle: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",
    marginBottom: "10px",
  };

  const ParentStyle: CSS.Properties = {
    fontFamily: "Ubuntu, sans-serif",
    marginBottom: "10px",
  };

  const buttonStyle1: CSS.Properties = {
    position: "absolute",

    padding: "2.5rem",
    background:
      "linear-gradient(90deg, rgba(219, 211, 239, 0.8) 0%, rgba(219, 211, 239, 0) 107.64%)",
    backdropFilter: "blur(20px)",
    borderRadius: "2.5rem",
    width: "15rem",
    transform: "translate(30%, 485%)",
    fontSize: "2.25rem",
    borderWidth: "0.1em",
    lineHeight: "0.1rem",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: "#000000",
    textAlign: "center",
    verticalAlign: "center",
  };

  const buttonStyle2: CSS.Properties = {
    position: "absolute",
    padding: "2.5rem",
    background:
      "linear-gradient(105.69deg, #FFB8A1 1.97%, rgba(255, 255, 255, 0) 104.4%)",
    backdropFilter: "blur(20px)",
    borderRadius: "2.5rem",
    width: "15rem",
    transform: "translate(30%, 485%)",
    fontSize: "2.25rem",
    borderWidth: "0.1em",
    lineHeight: "0.1rem",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: "#000000",
    textAlign: "center",
    verticalAlign: "center",
  };
  //Tuşlar ve svg için container
  const Container: CSS.Properties = {
    position: "relative",
  };

  return (
    <>
      <Row>
        <Col flex={1} style={logoLoginStyle}>
          <Logo />
        </Col>
        <Col flex={4}></Col>
      </Row>

      <Row>
        <Col flex={2}></Col>
        <Col flex={1} style={FYI}>
          <Row justify="center">
            <h1>
              <span style={upperText}>Before You Start</span>{" "}
            </h1>
          </Row>
          <Row justify="center">
            <h1 style={middleText}>
              How are you planning to use Intertech's Twelve?
            </h1>
          </Row>
          <Row justify="center">
            <h3>You'll be guided by the role you choose.</h3>
          </Row>
        </Col>
        <Col flex={2}></Col>
      </Row>

      <Row>
        <Col flex={2}>
          <Row justify="end">
            <Row style={Container}>
              <img style={ChildStyle} src={ChildImg} alt="Child görseli" />
              <Button style={buttonStyle1} onClick={childButtonClick} disabled={loading}>
                Choose
              </Button>
              <Modal
                title="We need to know the child birthday. (*)"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
                width={1040}
                style={{ padding: '20em' }}
              >
                <Form layout="vertical" onFinish={createChildAccount} style={{ margin: '1em 4em 1em 8em' }}>
                  <Form.Item style={{ margin: '1em 0 1em -3em', textAlign: 'center' }}
                    name="birthdate"
                    rules={[
                      {
                        required: true,
                        message: "You need to enter child's birthdate!",
                      },
                    ]}
                  >
                    <DatePicker 
                      format="YYYY-MM-DD "
                      disabledDate={disabledDate}
                      showTime={{
                        defaultValue: moment("00:00:00"),
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{ margin: '1em 0 0 5.4em' }}
                      type="primary"
                      shape="round"
                      size="middle"
                      htmlType="submit"
                      loading={loading}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Row>
          </Row>
        </Col>
        <Col flex={1}></Col>
        <Col flex={2}>
          <Row justify="start">
            <Row style={Container}>
              <img style={ParentStyle} src={ParentImg} alt="Parent görseli" />
              <Button style={buttonStyle2} onClick={createParentAccount} disabled={loading}>
                Choose
              </Button>
            </Row>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Login;
