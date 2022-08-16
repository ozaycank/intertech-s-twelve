import React from 'react'
import LogoInt from '../images/Logo.svg';
import CSS from 'csstype';

function Logo() {


    var logoLandingStyle: CSS.Properties = {
        position: 'absolute',
        width: '468.2px',
        height: '163px',
        left: '119.8px',
        top: '125px'
    }

    var logoLoginStyle: CSS.Properties = {
        position: 'absolute',
        width: '500px',
        height: '500px',
        left: '117px',
        top: '-103px'
    }



  return (
     <div>
        <img src={LogoInt} alt="Intertech's Twelve Logo"/>
     </div>
     
  )
}

export default Logo

