import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Card, Container, Form, InputGroup} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import passwordUtils from '../components/passwordUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import zxcvbn, { ZXCVBNResult } from 'zxcvbn'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CustomToast from '../components/Toast';

 const PasswordGenerator = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [useSpecialChars, setUseSpecialChars] = useState<boolean>(true);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [getUseLowercase, setUseLowercase] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [result, setResult] = useState<ZXCVBNResult>();
  const [error, setError] = useState<string>("");
  const [customSpecialChars, setCustomSpecialChars] = useState<string>('');
  const [showToast, setShowToast] = React.useState<boolean>(false);


  useEffect(() => {
    handleScore(password)  
  }, [password])

  useEffect(() => {
  }, [showToast])

  const handlePasswordGeneration = () => {
    const generatedPassword: string = passwordUtils.generatePassword(
      {
        length: passwordLength,
        useSpecialChars: useSpecialChars,
        useUppercase: useUppercase,
        useLowercase:getUseLowercase,
        useNumbers: useNumbers 
      }, customSpecialChars);
     
    setPassword(generatedPassword);
    handleScore(generatedPassword);
    checkAllOptionsUnchecked();
  
  };

  function handleScore(password: string) {
    const result = password ? zxcvbn(password) : undefined;
    setPasswordScore(result?.score || 0);
    setResult(result);
  }

  const getProgressColor = () => {
    if (passwordScore === 0) {
      return 'pass-weak-color';
    }
    return '';
  }

  const displayToast = (message: string) => {
    return (
      <CustomToast message={message} toastHeaderMessage={"Notice"} showToast={showToast} setShowToast={setShowToast} />
    );
  };
  

  const handlePasswordCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
        if(password.length > 0){
          setShowToast(true);  
        }
        else{
          setError('You must generate a password first before copying it')
        }
              
      })
      .catch(() => {
        alert("something went wrong whilst trying to copy from clipboard");
      });
  };

  const downloadPassword = () => {
    const element = document.createElement("a");
    const file = new Blob([password], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myPassword.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // remove the element after download is completed
  };
  
  const canDownload = ():boolean => {
    if(password !== '' && password !== undefined && password !== null){
      if(navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/)) { // check if the device is a mobile device
        window.open(`data:text/plain;charset=utf-8,${encodeURIComponent(password)}`, '_blank'); // open the download in a new window
      } else {
        downloadPassword(); // download the password normally
      }
      return true;
    }
    else{
      setError("You can not download empty passwords. Please generate one");
      return false;
    }
  }  
   

  const handlePasswordLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newLength: number = parseInt(e.target.value, 10);
    if (!isNaN(newLength)) {
      setPasswordLength(newLength);
    }
  };

  const handleSpecialCharsChange = () => {
    setUseSpecialChars(!useSpecialChars);
  };

  const handleUppercaseChange = () => {
    setUseUppercase(!useUppercase);
  };

  const handleLowerCaseChange = () => {
    setUseLowercase(!getUseLowercase);
  };

  const handleNumbersChange = () => {
    setUseNumbers(!useNumbers);
  };

  const clearPassword = () => {
    setPassword('');
  }

  const checkAllOptionsUnchecked = () => {
    if (!getUseLowercase && !useUppercase && !useNumbers && !useSpecialChars) {
      setError("Please select at least one option for generating the password.");
      setPassword("");
      return;
    }
    else{
      setError("")
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSpecialCharsInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const allowedChars = '-_+=!@#$%^&*()[]{}|;:,.<>?/';
    const inputValue = event.target.value;
  
    for (let i = 0; i < inputValue.length; i++) {
      if (!allowedChars.includes(inputValue[i])) {
        setError('Invalid characters entered!');
        return;
      }
    }
    setError('');
    setCustomSpecialChars(inputValue);
  };

  const handlePasswordLengthInput = (e: React.FormEvent<HTMLInputElement>) => {
    const maxLength = 32;
    const minLength = 6;
    const currentValue = parseInt(e.currentTarget.value, 10);
  
    if (currentValue > maxLength) {
      e.currentTarget.value = maxLength.toString();
    }
    else if(currentValue < minLength){
        e.currentTarget.value = minLength.toString();
    }
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <>
    {passwordVisibility ? displayToast(`successfully copied: '${password}' to clipboard`): displayToast("successfully copied password to clipboard")}
      <Container className="vh-100 px-0" fluid={true}>
        <Row className="vh-100 px-0">     
          <Col id="card-col" xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleSubmit}>
           <Card bg="black" text="white">
            <Card.Header>
                        
            </Card.Header>
            <Card.Body>           
                <InputGroup className="mb-3">
                  <Form.Label htmlFor="password-area"></Form.Label>
                  <Form.Control
                    type={passwordVisibility ? "text" : "password"}
                    name="password-area"
                    placeholder="Your new password will appear here."
                    aria-label="Password"
                    value={password} 
                    readOnly                
                  >              
                  </Form.Control>
                  <Button variant="light" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon icon={passwordVisibility ? faEye : faEyeSlash} />
                    </Button>
                  <Button variant="outline-primary" onClick={handlePasswordCopy}>
                    Copy
                  </Button>
                </InputGroup>             
                {error && <div style={{ color: "red" }}>{error}</div>}
                

                  <Form.Group>
                    <Form.Label>Password length:</Form.Label>
                    <Form.Control
                      type="number"                                 
                      min={6}
                      max={32}
                      onInput={handlePasswordLengthInput}
                      value={passwordLength}
                      onChange={handlePasswordLengthChange}
                    />
                  </Form.Group>

                  <hr></hr>

                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      checked={useUppercase}
                      onChange={handleUppercaseChange}
                      label="Include uppercase characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ)"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      checked={getUseLowercase}
                      onChange={handleLowerCaseChange}
                      label="Include lowercase characters (abcdefghijklmnopqrstuvwxyz)"
                    />
                  </Form.Group>

                  <Form.Group>
                  <Form.Check
                    type="checkbox"
                    checked={useNumbers}
                    onChange={handleNumbersChange}
                    label="Include numbers (0123456789)"
                    />
                  </Form.Group>                  

                  <hr></hr>

                <Form.Group style={{marginTop:10 + 'px'}}>
                    <Form.Check
                      type="checkbox"
                      checked={useSpecialChars}
                      onChange={handleSpecialCharsChange}
                      label="Include special characters (-_+=!@#$%^&*()[]{}|;:,.<>?/)"
                    />
                    <Form.Label htmlFor="special-chars">Limit selection of special characters:</Form.Label>                           
                    <Form.Control type="text" name="special-chars" placeholder="Special characters to include" value={customSpecialChars} onChange={handleSpecialCharsInputChange} />             
                  </Form.Group>   

                  <hr></hr>

                <ProgressBar id="progress-bar" style={{marginTop:15 + 'px'}} now={passwordScore * 25} className={getProgressColor()} />
                <small>{`Password Strength: ${passwordScore} / 4`}</small>             

                {result && (
                <ul>
                  <li>Crack time: {result.crack_times_display.online_no_throttling_10_per_second}</li>
                </ul>
              )}                           
          
          </Card.Body>

          <Card.Footer>

          <React.Fragment>             
              <p>
                <small>Password strength is calculated using zxcvbn, which is a password strength estimator inspired by password crackers. 
                  More information on zxcvbn can be found 
                  <a href="https://github.com/dropbox/zxcvbn"><u> here</u></a>
                </small>
                </p>
            </React.Fragment>

            <hr></hr>  

            <div className="center">           
                <Button type="submit" className="btn-child" variant="primary" onClick={handlePasswordGeneration}>
                  Generate password
                </Button>
                <Button className="btn btn-primary btn-child" id="clear" onClick={clearPassword}>Clear Password</Button>
                <Button className="btn btn-primary btn-child" id="download-btn" onClick={canDownload}>Download Password</Button>              
            </div>

          </Card.Footer>

         </Card>

        </Form> 

        </Col>

      </Row>

      </Container>  

    </>
   
   );
};

export default PasswordGenerator;