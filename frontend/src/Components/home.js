import { useState } from 'react';
import QRCode from "react-qr-code";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';
import send2 from '../send2.png';



//localhost
// const addText = 'http://localhost:3001/addtext';
// const getText = 'http://localhost:3001/gettext';

//prod
const addText = 'https://sendtextanywhere.com/addtext';
const getText = 'https://sendtextanywhere.com/gettext';


const Home = () => {

  const [Code, setCode] = useState("");
  const [Text, setText] = useState("");
  const [netText, setnetText] = useState("");
  const [ViewType, setViewType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);


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

  const handleReply = (event) => {
    event.preventDefault();
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

  // State to toggle info message

  // Function to toggle info visibility


  return (
    <div className="App ms-3">
      <div className="container my-4">
        {ViewType === 2 && (

          <div className='row my-5'>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <div className='Textarea-Edit'>
                <form id='Form-addText' onSubmit={FromSend}>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
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
                    {/* <div className='mt-4'>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                        value={netText}
                        level='L'
                        version='10'
                        viewBox={`0 0 256 256`}
                      />
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>


          // <div className='row my-5'>
          //   <div className='col-3'>
          //     <div className='Textarea-Edit'>
          //       <form id='Form-addText' onSubmit={FromSend}>
          //         <div className='d-flex justify-content-between align-items-center mb-3'>
          //           <p className='mb-0'>Enter the 4-digit code on the receiving device</p>
          //           <i
          //             className="fa-solid fa-circle-info"
          //             style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#17a2b8' }}
          //             data-tooltip-id="infoTooltip"
          //           ></i>
          //           <ReactTooltip
          //             id="infoTooltip"
          //             place="right"
          //             effect="solid"
          //             border
          //             borderColor="#17a2b8"
          //             multiline={true}>
          //             This code provides lifetime access until it is used for the first time<br />
          //             Once used, it will no longer be valid
          //           </ReactTooltip>

          //         </div>
          //         <div className='text-center mb-3'>
          //           <h1>{Code}</h1>
          //           <div className='mt-4'>
          //             <QRCode
          //               size={256}
          //               style={{ height: "auto", maxWidth: "50%", width: "50%" }}
          //               value={netText}
          //               viewBox={`0 0 256 256`}
          //             />
          //           </div>
          //         </div>
          //       </form>
          //     </div>
          //   </div>
          // </div>
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
            <div className='col-lg-2 col-md-2 col-sm-12'></div>
          </div>


          // <div className='row'>
          //   <div className='col-7 '>
          //     <div className='Textarea-Edit'>
          //       <form id='Form-addText' onSubmit={FromSend}>
          //         <div className='mb-3'>
          //           <textarea spellCheck={false} className="form-control" id="text" name='note' rows="11" placeholder='Write Your Text Here...' onChange={noteChange} value={Text}></textarea>
          //         </div>


          //         <button type="submit" className="btn btn-danger col-2 me-3" disabled={loading}>
          //           {loading ? (
          //             <div className="spinner-border spinner-border-sm" role="status">
          //               <span className="sr-only">Loading...</span>
          //             </div>
          //           ) : (
          //             <>
          //               <img
          //                 src={send2}
          //                 style={{ height: '20px', width: '20px', filter: 'brightness(0) invert(1)' }}
          //                 alt="Send"
          //               />
          //               Send
          //             </>
          //           )}
          //         </button>


          //         {/* <button type="submit" className="btn btn-danger col-2 me-3"><img src={send2} style={{ height: '20px', width: '20px',filter: 'brightness(0) invert(1)'}}></img> Send</button> */}
          //       </form>
          //     </div>
          //   </div>
          //   <div className='col-3'></div>
          //   <div className='col-2'></div>
          // </div>
        )}


        {ViewType === 3 && (

          <div className='row'>
            <div className='col-lg-7 col-md-8 col-sm-12'>
              <div className='Textarea-Edit'>
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
            <div className='col-lg-2 col-md-2 col-sm-12'></div>
          </div>


          // <div className='row'>
          //   <div className='col-7'>
          //     <div className='Textarea-Edit'>
          //       <div className="mb-3">
          //         <textarea spellCheck={false} className="form-control" id="text" name='note' rows="11" onChange={noteChange} value={Text}></textarea>
          //       </div>
          //       <div className="d-flex justify-content-end">
          //         {/* <button type="button" className="btn btn-danger me-3" onClick={handleReply}>
          //           <i className="fa-solid fa-reply"></i> Reply
          //         </button> */}
          //         <button type="button" className="btn btn-danger me-3" onClick={handleDownload}>
          //           <i className="fa-solid fa-download"></i> Download
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          //   <div className='col-3'></div>
          //   <div className='col-2'></div>
          // </div>
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
    </div>
  );
};

export default Home;