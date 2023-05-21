import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Card, Form, InputGroup} from "react-bootstrap";
import PasswordHelper from './PasswordHelper';
import {languageSelection, Languages, LanguageOptions} from './PasswordHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import zxcvbn, { ZXCVBNResult } from 'zxcvbn'
import ProgressBar from 'react-bootstrap/ProgressBar';
import DownloadButton from "./DownloadButton";


 const PasswordForm = () => {

  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [useSpecialChars, setUseSpecialChars] = useState<boolean>(true);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [getUseLowercase, setUseLowercase] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [result, setResult] = useState<ZXCVBNResult>();
  const [error, setError] = useState<string>("");
  const [customSpecialChars, setCustomSpecialChars] = useState<string>('');
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [useNoDuplicateChars, setUseNoDuplicateChars] = useState<boolean>(false);
  const [saveSettings, setSaveSettings] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(Languages.English);


  useEffect(() => {
    handleScore(password)  
  }, [password])


  
  const handleSaveSettings = (shouldSave: boolean) => {
    if (shouldSave) {
      localStorage.setItem('passwordLength', passwordLength.toString());
      localStorage.setItem('useSpecialChars', useSpecialChars.toString());
      localStorage.setItem('useUppercase', useUppercase.toString());
      localStorage.setItem('useLowercase', getUseLowercase.toString());
      localStorage.setItem('useNumbers', useNumbers.toString());
      localStorage.setItem('useNoDuplicateChars', useNoDuplicateChars.toString());
      localStorage.setItem('selectedLanguage', selectedLanguage.toString());
      localStorage.setItem('saveSettings', shouldSave.toString());
    } else {
      localStorage.removeItem('passwordLength');
      localStorage.removeItem('useSpecialChars');
      localStorage.removeItem('useUppercase');
      localStorage.removeItem('useLowercase');
      localStorage.removeItem('useNumbers');
      localStorage.removeItem('useNoDuplicateChars');
      localStorage.removeItem('selectedLanguage');
      localStorage.removeItem('saveSettings');
    }
  };
  

  const parseSelectedLanguage = (value: string): Languages | undefined => {
    switch (value) {
      case 'English':
        return Languages.English;
      case 'Spanish':
        return Languages.Spanish;
      case 'Danish':
      return Languages.Danish;
      case 'German':
        return Languages.German;
      case 'Italian':
        return Languages.Italian;
      case 'Russian':
        return Languages.Russian;
      case 'French':
        return Languages.French;
      case 'Swedish':
        return Languages.Swedish;
      default:
        return undefined;
    }
  };

  useEffect(() => {
    const savedPasswordLength = localStorage.getItem('passwordLength');
    if (savedPasswordLength) {
      setPasswordLength(parseInt(savedPasswordLength, 10));
    }
  
    const savedUseSpecialChars = localStorage.getItem('useSpecialChars');
    if (savedUseSpecialChars) {
      setUseSpecialChars(savedUseSpecialChars === 'true');
    }
  
    const savedSettings = localStorage.getItem('saveSettings');
    if (savedSettings) {
      setSaveSettings(savedSettings === 'true');
    }
  
    const savedUseUppercase = localStorage.getItem('useUppercase');
    if (savedUseUppercase) {
      setUseUppercase(savedUseUppercase === 'true');
    }
  
    const savedUseLowercase = localStorage.getItem('useLowercase');
    if (savedUseLowercase) {
      setUseLowercase(savedUseLowercase === 'true');
    }
  
    const savedUseNumbers = localStorage.getItem('useNumbers');
    if (savedUseNumbers) {
      setUseNumbers(savedUseNumbers === 'true');
    }
  
    const savedUseNoDuplicateChars = localStorage.getItem('useNoDuplicateChars');
    if (savedUseNoDuplicateChars) {
      setUseNoDuplicateChars(savedUseNoDuplicateChars === 'true');
    }
  
    const savedSelectedLanguage = localStorage.getItem('selectedLanguage');
    if (savedSelectedLanguage) {
      const parsedLanguage = parseSelectedLanguage(savedSelectedLanguage);
      if (parsedLanguage) {
        setSelectedLanguage(parsedLanguage);
      }
    }
  }, []);

  const handlePasswordGeneration = () => {

    const langObj: LanguageOptions | undefined = languageSelection.find(
      (lang) => lang.language === selectedLanguage
    );

    if(langObj){
      const generatedPassword: string = PasswordHelper.generatePassword(
        {
          length: passwordLength,
          useSpecialChars: useSpecialChars,
          useUppercase: useUppercase,
          useLowercase:getUseLowercase,
          useNoDuplicateChars:useNoDuplicateChars,
          useNumbers: useNumbers 
        }, customSpecialChars, langObj);
       
      setPassword(generatedPassword);
      handleScore(generatedPassword);
      checkAllOptionsUnchecked();
    }
     
  };

  function handleScore(password: string) {
    const result = password ? zxcvbn(password) : undefined;
    setPasswordScore(result?.score || 0);
    setResult(result);
  }

  const handleLanguageChange = (e: any) => {
    const selectedValue = Number(e.target.value);
    setSelectedLanguage(selectedValue);
  };

  const getProgressColor = () => {
    if (passwordScore === 0) {
      return 'pass-weak-color';
    }
    return '';
  } 
  
  const handlePasswordCopy = () => {

    if(password.length <= 0){      
      setError('You must generate a password first before copying it');
      return;
    }

    navigator.clipboard.writeText(password).then(() => {
       
        if(passwordVisibility){
          alert(`successfully copied: '${password}' to clipboard`)
        }
        else{
          alert(`successfully copied password to clipboard`)
        }
              
      })
      .catch(() => {
        alert("something went wrong whilst trying to copy from clipboard");
      });
  };


  const handlePasswordLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength: number = parseInt(e.target.value, 10);
    if (!isNaN(newLength)) {
      setPasswordLength(newLength);
    }
  };
  

  const handleSpecialCharsChange = () => {
    setUseSpecialChars(!useSpecialChars);
  };

  const handleNoDuplicateCharsInPassword = () => {
    setUseNoDuplicateChars(!useNoDuplicateChars);
  }

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
    
    if(!useSpecialChars){
      setError('You must enable special characters to limit the selection of special characters to use in your password')
      setTimeout(() => {
       setError('')
      }, 2500);
      
      return;
    }

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

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <>
          <Form className="password-form" onSubmit={handleSubmit}>
           <Card bg="black" text="white">
            <Card.Header></Card.Header>
            <Card.Body>           
                <InputGroup className="mb-3">
                  <Form.Label htmlFor="password-area"></Form.Label>
                  <Form.Control
                    type={passwordVisibility ? "text" : "password"}
                    name="password-area"
                    placeholder="Your new password will appear here."
                    aria-label="Password"
                    value={password}
                    onChange={() => {}}                                    
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

                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select a language</Form.Label>
                <Form.Control as="select"  value={selectedLanguage} onChange={(e) => handleLanguageChange(e)}>
                  {languageSelection.map((lang) => (
                    <option value={lang.language} key={lang.language.toString()}>
                      {Languages[lang.language]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

                  <Form.Group>
                    <br/>
                    <Form.Label>Password length:  <span>{passwordLength}</span></Form.Label>
                    <Form.Range
                      min={6}
                      max={32}
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
                      label="Include uppercase characters"                     
                    />                                
                 
                    <Form.Check
                      type="checkbox"
                      checked={getUseLowercase}
                      onChange={handleLowerCaseChange}
                      label="Include lowercase characters"
                    />

                    <Form.Check
                    type="checkbox"
                    checked={useNumbers}
                    onChange={handleNumbersChange}
                    label="Include numbers (0123456789)"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      checked={useNoDuplicateChars}
                      onChange={handleNoDuplicateCharsInPassword}
                      label="No duplicate characters"                     
                    />
                    
                    <Form.Check
                      type="checkbox"
                      checked={saveSettings}
                      onChange={() => {
                        setSaveSettings(!saveSettings);
                        handleSaveSettings(!saveSettings);
                      }}
                      label="Save settings in local storage"
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
                <small>{`Password Strength: ${passwordScore} / 4`} - {result && (         
                  <p>ZXCVBN Crack time: {result.crack_times_display.online_no_throttling_10_per_second}</p>               
              )}  </small>             

                                         
          
          </Card.Body>

          <Card.Footer>

          <React.Fragment>                     
                Password strength is calculated using zxcvbn, which is a password strength estimator inspired by password crackers. 
                 More information on zxcvbn can be found 
                  <a href="https://github.com/dropbox/zxcvbn"><u> here</u></a>                           
            </React.Fragment>

            <hr></hr>  

            <div className="btnPositioning">                        
                <Button className="btn btn-primary btn-child" id="clear" onClick={clearPassword}>Clear Password</Button>             
                <DownloadButton passwordString={password} setError={setError}/>           
            </div>

            <hr></hr>
                     
            <div className="submitBtncontainer">
                <Button type="submit" className="btn-generate-password" onClick={handlePasswordGeneration}>
                Generate password
              </Button>
            </div>
                               
          </Card.Footer>

         </Card>

        </Form> 
    </>
   
   );
};

export default PasswordForm;