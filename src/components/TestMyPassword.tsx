import React, { useState } from "react";
import "../styles/TestPassword.css";
import { passwordStrength, Result } from "check-password-strength";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const TestMyPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordResult, setPasswordResult] = useState<Result<string> | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = passwordStrength(password);
    setPasswordResult(result);
  };

  return (
    <Card bg="black">
    <Card.Header>
        <h1>Password strength Tester</h1><br/>
        <p>Note: Password inputs on this page are <u>NOT</u> saved anywhere. This is only a tool to help you determine the strength of your password</p>
    </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="passwordInput">       
            <InputGroup className="mb-3">                         
                <Form.Control
                name="password-input"
                type={passwordVisibility ? "text" : "password"}
                value={password}
                onChange={handleChange}
                placeholder="Enter a password here to test its strength"
                />
                <Button variant="light" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon
                  icon={passwordVisibility ? faEye : faEyeSlash}
                />
              </Button>
             
             </InputGroup> 
            </Form.Group>                
          <br />
          <Button type="submit">Validate Password</Button>
        </Form>
        <br />
        {passwordResult && (
          <div>
            {password && (
              <p>Password Strength: {passwordResult.value}</p>
            )}
            <p>Contains Lowercase: {passwordResult.contains[0] ? "Yes" : "No"}</p>
            <p>Contains Uppercase: {passwordResult.contains[1] ? "Yes" : "No"}</p>
            <p>Contains Symbol: {passwordResult.contains[2] ? "Yes" : "No"}</p>
            <p>Contains Number: {passwordResult.contains[3] ? "Yes" : "No"}</p>
            <p>Password Length: {passwordResult.length}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TestMyPassword;
