import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordTips from './PasswordTips';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PasswordForm from './PasswordForm';

function App() {

  return (
    <>
    <NavigationBar />
        <Container fluid id="container">
          <Row style={{marginTop:15 + 'px'}} className="justify-content-center align-items-center row-offset">
            <Col xs={12} sm={12} md={8} lg={6} xl={6}>
                <Routes>
                  <Route path="/PasswordGenerator" element={<PasswordForm />} />
                  <Route path="/" element={<PasswordForm />} />
                  <Route path="/password-tips" element={<PasswordTips />} />
                </Routes>           
            </Col>
          </Row>
        </Container>        
    </>     
  );
}

export default App;
