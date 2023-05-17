import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordTips from './PasswordTips';
import MyFooter from './Footer';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PasswordForm from './PasswordForm';

function App() {
  return (
    <>
    <NavigationBar />
      <Container className="vh-100 no-padding-no-margin" fluid>
        <Row className="mt-5 no-padding-no-margin">
          <Col xs={12} sm={12} md={8} lg={5} xl={5} className="mb-5">
              <Routes>
                <Route path="/PasswordGenerator" element={<PasswordForm />} />
                <Route path="/" element={<PasswordForm />} />
                <Route path="/password-tips" element={<PasswordTips />} />
              </Routes>           
          </Col>
        </Row>
      </Container>
      <MyFooter />
    
    </>
     
  );
}

export default App;
