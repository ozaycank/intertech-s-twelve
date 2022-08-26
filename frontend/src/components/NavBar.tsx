import { Button, Avatar } from "antd";
import React from "react";
import "./Navbar.css";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


interface NavbarProps {
  addr: string;
  balance: string;
}




const NavBar: React.FC<NavbarProps> = ({ addr, balance }) => {

  let navigate = useNavigate();

  const goLanding = () => {
  navigate("/");
  return;
  }

  return (
    <div className="container">
      <div className="your-account">
        <div className="your-account1">Your Account</div>
        <span className="MetamaskId">{addr}</span>
        <div className="AccountBalance">
          <span className="UbuntuMedium">Account Balance: </span>
          <span className="UbuntuBold">{balance} ETH </span>
        </div>
          <div>
            <Button className="LogOutButton" onClick={goLanding}>Log Out</Button>
          </div>
      </div>

      <div>
        <Avatar className="userAvatar" size={86} icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default NavBar;
