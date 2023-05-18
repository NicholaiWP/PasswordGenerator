import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PasswordTips: React.FC = () => {
  return (
    <Container>
      <Row id="tips-margin-bottom-offset" className="justify-content-center align-items-center">
        <Col xs={12} md={12} lg={12} xl={12}>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Helpful Password Tips</Card.Title>
                <ul>
                  <li>
                    <Card.Text>Use a combination of uppercase and lowercase letters.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Add numbers and special characters to make your password more complex.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Avoid using common words or phrases.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Make your password at least 8 characters long.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Don't use personal information like your name, birthdate, or address.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Include uncommon or uncommonly used words in your password.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Consider using a passphrase instead of a single word.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Use a unique password for each of your accounts.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Change your passwords periodically, especially for important accounts.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Don't share your passwords with anyone.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Avoid using predictable patterns or sequences.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Use two-factor authentication for added security.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Consider using a password manager to securely store and generate unique passwords.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Be cautious of phishing attempts and avoid entering your password on suspicious websites.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Regularly update your devices and applications to ensure they have the latest security patches.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Keep your password recovery options up to date.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Monitor your accounts for any suspicious activity.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Educate yourself about common password vulnerabilities and best practices.</Card.Text>
                  </li>
                  <li>
                    <Card.Text>Trust your instincts - if a password feels weak or insecure, change it.</Card.Text>
                  </li>
                </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordTips;
