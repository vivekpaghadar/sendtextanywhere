import React, { useState } from "react";

// const addfeedback = 'http://localhost:3001/addfeedback';

const addfeedback = 'https://sendtextanywhere.com/addfeedback';


const ContectUs = () => {

  const [name, setName] = useState(''); // State for name
  const [phone, setPhone] = useState(''); // State for phone
  const [note, setNote] = useState(''); // State for feedback

  // Handle change for the name field
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle change for the phone field
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  // Handle change for the feedback field
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    if (note.trim() === '') {
      alert('Please enter feedback');
      return;
    } else {
      let data = {
        person_name: name,
        phone:phone,
        note:note
      };
  
      // Send the data using fetch
      try {
        const response = await fetch(addfeedback, {
          method: 'POST', // Set the method to POST
          headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
          },
          body: JSON.stringify(data) // Convert the data to a JSON string
        });
  
        const result = await response.json(); // Parse the JSON response from the server
        console.log('Server response:', result);
        setName("");
        setPhone("");
        setNote("");
        document.getElementById('Form-addText').reset();
        alert('Feedback sent successfully');
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }

  };

  return (
    <div>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-4 mb-2'>
          <div className='Textarea-Edit2'>
            <form id='Form-addText'>
              <div>
                <textarea spellCheck={false} className="form-control" id="Name" name='name' rows="1" placeholder='Enter your name' onChange={handleNameChange}
                  value={name} ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-4 mb-2'>
          <div className='Textarea-Edit2'>
            <form id='Form-addText'>
              <div>
                <textarea spellCheck={false} className="form-control" id="Number" name='phone' rows="1" placeholder='Enter your phone' onChange={handlePhoneChange}
                  value={phone} ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-4 mb-4'>
          <div className='Textarea-Edit2'>
            <form id='Form-addText'>
              <div className='mb-3'>
                <textarea spellCheck={false} className="form-control" id="text" name='note' rows="8" placeholder='Write Feedback' onChange={handleNoteChange}
                  value={note} ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={handleSend} type="submit" className="btn btn-danger col-2">Submit</button>
      </div>
    </div>
  );
};

export default ContectUs;

