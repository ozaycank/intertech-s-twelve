import { Button, Avatar } from "antd";
import React from "react";
import "./Navbar.css";
import { UserOutlined } from "@ant-design/icons";

interface NavbarProps {
  addr: string;
  balance: string;
}

const NavBar:React.FC<NavbarProps> = ({ addr, balance }) =>  {
  return (
    <div className = "container">
        <div className="your-account">
          <div className="your-account1">
            Your Account
          </div>
          <span className="MetamaskId">
            {addr}
          </span>
          <div className="AccountBalance">
            <span>
              <span className="UbuntuMedium">Account Balance: </span>
              <span className="UbuntuBold">{balance} ETH </span>
            </span>
          </div>
        </div>
        <div className="overlap-group2">
          <div className="overlap-group">
            <Button className="LogOutButton">Log Out</Button>
          </div>
        </div>
      <div>
      <Avatar className="userAvatar" size={64} icon={<UserOutlined />} />
      </div>
    </div>
  );
}

export default NavBar;