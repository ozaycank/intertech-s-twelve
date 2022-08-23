import { Button, Avatar } from "antd";
import React from "react";
import "./Navbar.css";
import { UserOutlined } from "@ant-design/icons";

interface NavbarProps {
  addr: string;
  balance: string;
}

const NavBar: React.FC<NavbarProps> = ({ addr, balance }) => {
  return (
    <div className="container">
      <div className="your-account">
        <div className="your-account1">Your Account</div>
        <span className="MetamaskId">{addr}</span>
        <div className="AccountBalance">
          <span className="UbuntuMedium">Account Balance: </span>
          <span className="UbuntuBold">{balance} ETH </span>
        </div>
        <div className="overlap-group2">
          <div>
            <Button className="LogOutButton">Log Out</Button>
          </div>
        </div>
      </div>

      <div>
        <Avatar className="userAvatar" size={86} icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default NavBar;
