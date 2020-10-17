import React,{Component} from 'react';
import atlanlogo from '../../img/atlanlogo.svg';

class Header extends Component {
    render(){
        return (
            <div className='header' style={{
                                            position:"fixed",
                                            height: "60px",
                                            backgroundColor: "#2026D2",
                                            boxShadow: "0 3px 6px rgba(0,0,0,0.03),0 3px 6px rgba(0,0,0,0.08)",
                                            left: "0px",
                                            right: "0px",
                                            top: "0px",
                                            zIndex: "100"
                                            }}>
                <div className='center-bar' style={{margin: "0 auto",
                                                    width: "50%",
                                                    height: "100%",
                                                    padding: "8px 20px",
                                                    textAlign: "center"
                                                    }}>
                    <a href='https://atlan.com'><img style={{width:"100%",height:"40px"}}src={atlanlogo} alt='Logo' /></a>
                </div>
            </div>
        )
    }
    
}

export default Header;