import { Button } from 'antd';
import React from 'react'
import LogoInt from '../images/Logo.svg';
import './Navbar.css';
import Subtract from "../images/Subtract.svg";
import SubtractFront from "../images/SubtractFront.svg";

function NavBar() {
    
  return (
    
    
     <div >    
        <div className='banner'>
        <img src={LogoInt} alt="Intertech's Twelve Logo"/>
        <div className='overlap-group3'>
            <div className='your-account'>
                <div className='your-account1 valign-text-middle ubuntu-bold-black-18px'>
                    Your Account
                </div>
                <div className='MetamaskId'>
                0xb794f5ea0ba39494ce839613fffba74279579268
                </div>
                <div className='AccountBalance'>
                    <span>
                        <span className='UbuntuMedium'>Account Balance: </span>
                        <span className='UbuntuBold'>1.02 ETH </span>
                    </span>
                </div>
            </div>
            <div className='overlap-group2'>
                <div className='overlap-group'>
                <Button className='LogOutButton'>Log Out</Button>
                </div>
            </div>
            <div className='userAvatar'>
                <div className='childContainer'>
                    <div className='child-back'>
                        <div className='ellipse-14'></div>
                        <img className='Subtract' src = {Subtract}  />
                    </div>
                    <div className='ChildFront'>
                        <div className='ellipse-14-1'></div>
                        <img className='SubtractFront' src = {SubtractFront} />
                    </div>
                </div>
            </div>
        </div>
     </div>
     </div>
     
  );
}

export default NavBar

