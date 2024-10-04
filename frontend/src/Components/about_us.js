import React from 'react';
import vivek from '../vivek.jpg';

const Color = '#17a2b8';
const AboutUs = () => {
    return (
        <div className="container3" style={{ textAlign: 'left' }}>
            <div className="profile" style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left' }}>
            <h4 style={{ color: Color }}>About Us</h4>
                <p>
                    Welcome to SendTextAnywhere, where we transform how you communicate.<br></br>
                    Our goal is to offer a secure and anonymous platform for sending text messages without requiring email addresses or phone numbers.<br></br>
                    We focus on your privacy and aim to provide a seamless messaging experience.<br></br> 
                    With just a 4-digit code, you can send messages without the concern of spam or unwanted interruptions.<br></br>
                    Experience safe and private communication like never before with us!
                </p>
                <br></br>
                <img style={{ float: 'left' }} src={vivek} alt="Vivek Paghadar" className="profile-photo" />
                <div>
                    <h5>Vivek Paghadar</h5>
                    <p>
                        Hi! I'm the person behind SendTextAnywhere. I am constantly working
                        to enhance this platform and improve your experience. Thank you for being part of our journey!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
