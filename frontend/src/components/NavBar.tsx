import { Button, Avatar } from "antd";
import React from "react";
import LogoInt from "../images/Logo.svg";
import "./Navbar.css";
import { UserOutlined } from '@ant-design/icons';

function NavBar() {
  return (
    <div>
      <div className="banner">
        <img src={LogoInt} alt="Intertech's Twelve Logo" />
        <div className="overlap-group3">
          <div className="your-account">
            <div className="your-account1 valign-text-middle ubuntu-bold-black-18px">
              Your Account
            </div>
            <div className="MetamaskId">
              0xb794f5ea0ba39494ce839613fffba74279579268
            </div>
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
        </div>
        <div>
                <Avatar className="AvatarImage" size={64} icon={<UserOutlined />} />
            </div>
      </div>
    </div>
  );
}

export default NavBar;
