import { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';
import send2 from '../send2.png';
import coffee from '../redbutton.png';
import bankQR from '../vivek_qr.png';
// Import your QR code image here
// import bankQR from '../bank-qr.png'; // Add your QR code image path



//localhost
// const addText = 'http://localhost:3001/addtext';
// const getText = 'http://localhost:3001/gettext';

//prod
// const addText = 'https://sendtextanywhere.com/addtext';
// const getText = 'https://sendtextanywhere.com/gettext';

const addText = 'https://sendtextanywhere.vercel.app/addtext';
const getText = 'https://sendtextanywhere.vercel.app/gettext';


const Home = () => {

  const [Code, setCode] = useState("");
  const [Text, setText] = useState("");
  const [netText, setnetText] = useState("");
  const [ViewType, setViewType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);


  const FromSend = async (event) => {
    event.preventDefault();

    let text = event.target.note.value;

    if (text.trim() === '') {
      alert('Text should not be empty');
      return;
    }

    let data = {
      message: text
    };


    setLoading(true);
    try {
      const response = await fetch(addText, {
        method: 'POST', // Set the method to POST
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify(data) // Convert the data to a JSON string
      });

      const result = await response.json(); // Parse the JSON response from the server
      console.log('Server response:', result);
      setCode(result.code);
      setnetText(result.text);
      setText("");
      setViewType(2) // 2 for barcode
      document.getElementById('Form-addText').reset();
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setLoading(false);
    }

    // Send the data using fetch




  }

  const Fromget = async (event) => {
    event.preventDefault();

    let code = event.target.receive_code.value;

    if (code.trim() === '') {
      alert('Please enter 4-digit receive code');
      return;
    }


    let data = {
      code: code
    };

    // Send the data using fetch
    setLoading2(true);
    try {
      const response = await fetch(getText, {
        method: 'POST', // Set the method to POST
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify(data) // Convert the data to a JSON string
      });

      const result = await response.json(); // Parse the JSON response from the server
      console.log('Server response:', result);
      if (result.success === 402) {
        alert('The code is invalid or has expired');
        return;
      }
      setText(result.text)
      setViewType(3) // 3 for result code
      document.getElementById('Form-getText').reset();
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setLoading2(false);
    }

  }

  const noteChange = (e) => {
    setText(e.target.value);
  }

  const handleBack = (event) => {
    event.preventDefault();
    setText("")
    setViewType(1) // 3 for result code
    document.getElementById('Form-getText').reset();
  }

  const handleDownload = (event) => {
    event.preventDefault();
    const blob = new Blob([Text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sendtextanywhere.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCoffeeClick = () => {
    setShowQRDialog(true);
  };

  const closeQRDialog = () => {
    setShowQRDialog(false);
  };

  // QR Code Dialog Component
  const QRCodeDialog = () => (
    <>
      {/* Backdrop */}
      {showQRDialog && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050
          }}
          onClick={closeQRDialog}
        >
          {/* Modal Content */}
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
              onClick={closeQRDialog}
            >
              ×
            </button>
            
            {/* Dialog Header */}
            <h3 style={{ marginBottom: '15px', color: '#333' }}>
              ☕ Buy me a coffee!
            </h3>
            
            {/* QR Code Image */}
            <div style={{ marginBottom: '20px' }}>
              {/* Replace this with your actual QR code image */}
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >

                {/* Uncomment and use this when you have your QR image */}
                { <img 
                  src={bankQR} 
                  alt="Bank QR Code" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' 
                  }} 
                /> }

              </div>
            </div>
            
            {/* Close Button */}
            <button
              className="btn btn-secondary"
              onClick={closeQRDialog}
              style={{ width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );

  // Buy Me Coffee Component - Reusable component
  const BuyMeCoffeeSection = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      height: '100%'
    }}>
      <div style={{ textAlign: 'right', minWidth: '300px' }}>
         <h3 className="support-title">☕ Support Our Work</h3>
        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
          Help us keep SendTextAnywhere free and running smoothly for everyone!
        </p>
        <img
          src={coffee}
          style={{ 
            height: '50px', 
            width: '200px',
            cursor: 'pointer'
          }}
          alt="Buy me coffee"
          onClick={handleCoffeeClick}
        />
      </div>
    </div>
  );


  return (
    <div className="App ms-3">
      <div className="container my-4">
        {ViewType === 2 && (
          <div className='row my-5'>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <div className='Textarea-Edit'>
              <button type="button" className="btn btn-link p-0 mb-3" onClick={handleBack}>
                      <i className="fa-solid fa-arrow-left" style={{ fontSize: '1.5rem', color: '#17a2b8' }}></i>
                    </button>
                <form id='Form-addText' onSubmit={FromSend}>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    {/* Back Button */}
                   
                    <p className='mb-0'>Enter the 4-digit code on the receiving device</p>
                    <i
                      className="fa-solid fa-circle-info"
                      style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#17a2b8' }}
                      data-tooltip-id="infoTooltip"
                    ></i>
                    <ReactTooltip
                      id="infoTooltip"
                      place="right"
                      effect="solid"
                      border
                      borderColor="#17a2b8"
                      multiline={true}
                    >
                      This code provides lifetime access until it is used for the first time<br />
                      Once used, it will no longer be valid
                    </ReactTooltip>
                  </div>
                  <div className='text-center mb-1'>
                    <h1>{Code}</h1>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-9 col-md-6 col-sm-12'>
              {/* Buy Me Coffee Button - Same horizontal line */}
              <BuyMeCoffeeSection />
            </div>
          </div>
        )}

        {ViewType === 1 && (

          <div className='row'>
            <div className='col-lg-7 col-md-8 col-sm-12'>
              <div className='Textarea-Edit'>
                <form id='Form-addText' onSubmit={FromSend}>
                  <div className='mb-3'>
                    <textarea
                      spellCheck={false}
                      className="form-control"
                      id="text"
                      name='note'
                      rows="11"
                      placeholder='Write Your Text Here...'
                      onChange={noteChange}
                      value={Text}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-danger col-3 me-3" disabled={loading}>
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <>
                        <img
                          src={send2}
                          style={{ height: '20px', width: '20px', filter: 'brightness(0) invert(1)' }}
                          alt="Send"
                        /> Send
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div className='col-lg-3 col-md-2 col-sm-12'></div>
            <div className='col-lg-2 col-md-2 col-sm-12'>
              {/* Buy Me Coffee Button - Same horizontal line */}
              <BuyMeCoffeeSection />
            </div>
          </div>
        )}


        {ViewType === 3 && (

          <div className='row'>
            <div className='col-lg-7 col-md-8 col-sm-12'>
              <div className='Textarea-Edit'>
              <button type="button" className="btn btn-link p-0 mb-1" onClick={handleBack}>
                      <i className="fa-solid fa-arrow-left" style={{ fontSize: '1.5rem', color: '#17a2b8' }}></i>
                    </button>
                <div className="mb-3">
                  <textarea
                    spellCheck={false}
                    className="form-control"
                    id="text"
                    name='note'
                    rows="11"
                    onChange={noteChange}
                    value={Text}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-danger me-3" onClick={handleDownload}>
                    <i className="fa-solid fa-download"></i> Download
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-2 col-sm-12'></div>
            <div className='col-lg-2 col-md-2 col-sm-12'>
              {/* Buy Me Coffee Button - Same horizontal line */}
              <BuyMeCoffeeSection />
            </div>
          </div>
        )}

        <form className='mt-4' id='Form-getText' onSubmit={Fromget}>
          <div className="d-flex align-items-center mb-3">
            <div className="me-2">
              <input type="text" className="form-control input-shadow" id="Receive-Code" name='receive_code' placeholder='Receive Code' maxLength="4" />
            </div>
            <button type="submit" className="btn btn-danger" disabled={loading2}>


              {loading2 ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  <i className="fa-solid fa-download"></i>
                </>
              )}

            </button>
          </div>
        </form>

      </div>
      
      {/* QR Code Dialog */}
      <QRCodeDialog />
      
    </div>
  );
};

export default Home;