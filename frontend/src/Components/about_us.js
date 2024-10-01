import React from 'react';
import vivek from '../vivek.jpg';

const AboutUs = () => {
    return (
        <div className="container3">
            <div className="profile">
                <img src={vivek} alt="Vivek Paghadar" className="profile-photo" />
                <div>
                    <h2>Vivek Paghadar</h2>
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
