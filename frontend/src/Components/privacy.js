import React from 'react';

const Color = '#17a2b8';

const Privacy = () => {
    return (
        <div className="container3" style={{ textAlign: 'left' }}>
            <div>
                <h5 style={{ color: Color }}>Privacy Policy</h5>
                <p><strong>Last updated: October 1, 2024</strong></p>

                <h5 style={{ color: Color }}>Introduction</h5>
                <p>
                    Welcome to the Privacy Policy for a SendTextAnywhere (referred to as "we," "us," or "our"). We offer a service that allows you to send text messages without needing email addresses or phone numbers. This policy outlines how we collect, use, share, and safeguard your personal data.
                </p>

                <h5 style={{ color: Color }}>Information We Collect</h5>
                <p>
                    We do not collect any of your personal information. All data, including your text and ID, is deleted when it is used once, so you can send messages worry-free.
                </p>

                <h5 style={{ color: Color }}>How We Use Your Information</h5>
                <p>We may use your information to:</p>
                <ul>
                    <li>Provide and enhance our services.</li>
                    <li>Communicate with you about updates and offers.</li>
                    <li>Ensure the security and integrity of our services.</li>
                </ul>

                <h5 style={{ color: Color }}>Data Sharing</h5>
                <p>
                    We may share data with trusted third parties to assist in delivering our services, as required by law, or with your consent.
                </p>

                <h5 style={{ color: Color }}>Your Rights</h5>
                <p>
                    Depending on your location, you may have rights to access, correct, delete, or limit the processing of your personal data.
                </p>

                <h5 style={{ color: Color }}>Changes to This Policy</h5>
                <p>
                    We may update this privacy policy periodically and will inform you of any significant changes.
                </p>
            </div>
        </div>

    );
};

export default Privacy;
