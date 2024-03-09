import './App.css';
import { Button, Row, Form, Container, Spinner, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
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

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log(formData);
  }


  //Testing the spinner and tick mark
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: false },
    { id: 3, name: 'Task 3', completed: false },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startNextTask = async () => {
    setLoading(true);

    // Simulate asynchronous task completion (replace this with actual task logic)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update the current task to mark it as completed
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks];
      updatedTasks[currentIndex] = { ...updatedTasks[currentIndex], completed: true };
      return updatedTasks;
    });

    // Move to the next task
    setCurrentIndex(prevIndex => prevIndex + 1);

    setLoading(false);
  };

  useEffect(() => {
    if (currentIndex < tasks.length) {
      startNextTask();
    }
  }, [currentIndex, tasks]);
  


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
        <div>
          {tasks.map((task, index) => (
            <div key={task.id}>
              {index === currentIndex && loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  {task.completed ? '✔️' : '◻️'} {task.name}
                </div>
              )}
            </div>
          ))}
          {/* {currentIndex < tasks.length && !loading && (
            <button onClick={startNextTask}>Start Next Task</button>
          )} */}
        </div>
        
        
      </Container>
    </>
  );
}

export default App;
