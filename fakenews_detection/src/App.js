import './App.css';
import { Button, Row, Form, Container, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { ReactComponent as TickMark } from './assets/tick.svg';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const containerStyle = {
    padding: '20px 280px',
  };

  const [formData,setFormData] = useState({
    author:"",
    message:""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    setS(true);
    setTimeout(() => {
      
      setT1(true);
    }, 3000);
    setTimeout(() => {
      setT2(true);
    }, 6000);
    setTimeout(() => {
      setT3(true);
      setLoading(false);
    }, 9000);
  }


  //Testing the spinner and tick mark
  const [loading, setLoading] = useState(false);
  const [t1, setT1] = useState(false);  
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);
  const [s,setS] = useState(false);
  


  return (
    <>
      <Container style={containerStyle}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
            <Form.Label>Author Name</Form.Label>
            <Form.Control type="text" name='author' value={formData.author} onChange={handleInputChange} placeholder="John Doe" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" name='message' value={formData.message} onChange={handleInputChange} rows={8} placeholder='paste your message where...'/>
          </Form.Group>
          <Button variant="primary" type='submit'>
            Submit
         </Button>
        </Form>
        {/* <Spinner animation="border" size="sm" />
        <TickMark style={{ width: '20px', height: '20px' }}/> */}
        {loading ? <Spinner animation="border" size="sm" /> : <TickMark style={{ width: '20px', height: '20px' }}/>}<span>Task 1</span>
        {loading ? <Spinner animation="border" size="sm" /> : <TickMark style={{ width: '20px', height: '20px' }}/>}<span>Task 2</span>
        {loading ? <Spinner animation="border" size="sm" /> : <TickMark style={{ width: '20px', height: '20px' }}/>}<span>Task 3</span>

        
      </Container>
    </>
  );
}

export default App;
