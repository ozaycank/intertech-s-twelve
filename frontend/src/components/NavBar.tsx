import { Button, Avatar } from "antd";
import React from "react";
import "./Navbar.css";
import { UserOutlined } from "@ant-design/icons";

function NavBar() {
  return (
    <div>
        <div className="your-account">
          <div className="your-account1">
            Your Account
          </div>
          <span className="MetamaskId">
            0xb794f5ea0ba39494ce839613fffba74279579268
          </span>
          <div className="AccountBalance">
            <span>
              <span className="UbuntuMedium">Account Balance: </span>
              <span className="UbuntuBold">1.02 ETH </span>
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