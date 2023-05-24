import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import PasswordHelper from "./PasswordHelper";
import {
  languageSelection,
  Languages,
  LanguageOptions,
} from "./PasswordHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import DownloadButton from "./DownloadButton";
import SaveLocalStorage from "../components/SaveLocalStorage";
import { passwordStrength } from "check-password-strength";

const PasswordForm = () => {
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [useSpecialChars, setUseSpecialChars] = useState<boolean>(true);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [getUseLowercase, setUseLowercase] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [customSpecialChars, setCustomSpecialChars] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [useNoDuplicateChars, setUseNoDuplicateChars] = useState<boolean>(false);
  const [saveSettings, setSaveSettings] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [passwordLengthText, setPasswordLengthText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(Languages.English);

  useEffect(() => {
    if (password !== "") {
      handlePasswordScore();
    }
  }, [password]);

  {
    /*fetch local storage values when component mounts, if any are saved*/
  }

  useEffect(() => {
    const savedPasswordLength = localStorage.getItem("passwordLength");
    if (savedPasswordLength) {
      setPasswordLength(parseInt(savedPasswordLength, 10));
    }

    const savedUseSpecialChars = localStorage.getItem("useSpecialChars");
    if (savedUseSpecialChars) {
      setUseSpecialChars(savedUseSpecialChars === "true");
    }

    const savedSettings = localStorage.getItem("saveSettings");
    if (savedSettings) {
      setSaveSettings(savedSettings === "true");
    }

    const savedUseUppercase = localStorage.getItem("useUppercase");
    if (savedUseUppercase) {
      setUseUppercase(savedUseUppercase === "true");
    }

    const savedUseLowercase = localStorage.getItem("useLowercase");
    if (savedUseLowercase) {
      setUseLowercase(savedUseLowercase === "true");
    }

    const savedUseNumbers = localStorage.getItem("useNumbers");
    if (savedUseNumbers) {
      setUseNumbers(savedUseNumbers === "true");
    }

    const savedUseNoDuplicateChars = localStorage.getItem(
      "useNoDuplicateChars"
    );
    if (savedUseNoDuplicateChars) {
      setUseNoDuplicateChars(savedUseNoDuplicateChars === "true");
    }

    const savedSelectedLanguage = localStorage.getItem("selectedLanguage");
    if (savedSelectedLanguage) {
      const parsedLanguage = parseSelectedLanguage(savedSelectedLanguage);
      if (parsedLanguage) {
        setSelectedLanguage(parsedLanguage);
      }
    }
  }, []);

  const parseSelectedLanguage = (value: string): Languages | undefined => {
    switch (value) {
      case "English":
        return Languages.English;
      case "Spanish":
        return Languages.Spanish;
      case "Danish":
        return Languages.Danish;
      case "German":
        return Languages.German;
      case "Italian":
        return Languages.Italian;
      case "Russian":
        return Languages.Russian;
      case "French":
        return Languages.French;
      case "Swedish":
        return Languages.Swedish;
      default:
        return undefined;
    }
  };
 

  const handlePasswordGeneration = () => {
    const langObj: LanguageOptions | undefined = languageSelection.find(
      (lang) => lang.language === selectedLanguage
    );

    if (langObj) {
      const generatedPassword: string = PasswordHelper.generatePassword(
        {
          length: passwordLength,
          useSpecialChars: useSpecialChars,
          useUppercase: useUppercase,
          useLowercase: getUseLowercase,
          useNoDuplicateChars: useNoDuplicateChars,
          useNumbers: useNumbers,
        },
        customSpecialChars,
        langObj
      );

      setPassword(generatedPassword);

      checkAllOptionsUnchecked();
    }
  };

  const handleLanguageChange = (e: any) => {
    const selectedValue = Number(e.target.value);
    setSelectedLanguage(selectedValue);
  };

  const handlePasswordScore = () => {
    if (passwordStrength(password).id === 0) {
      setPasswordScore(1);
    } else if (passwordStrength(password).id === 1) {
      setPasswordScore(2);
    } else if (passwordStrength(password).id === 2) {
      setPasswordScore(3);
    } else if (passwordStrength(password).id === 3) {
      setPasswordScore(4);
    } else {
      setPasswordScore(0);
    }
  };

  const handlePasswordCopy = () => {
    if (password.length <= 0) {
      setError("You must generate a password first before copying it");
      return;
    }

    navigator.clipboard
      .writeText(password)
      .then(() => {
        if (passwordVisibility) {
          alert(`successfully copied: '${password}' to clipboard`);
        } else {
          alert(`successfully copied password to clipboard`);
        }
      })
      .catch(() => {
        alert("something went wrong whilst trying to copy from clipboard");
      });
  };

  const handlePasswordLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLength: number = parseInt(e.target.value, 10);
    if (!isNaN(newLength)) {
      setPasswordLength(newLength);
      let txt = displayPasswordLengthMsg(newLength);
      setPasswordLengthText(txt);
    }
  };

  const handleSpecialCharsChange = () => {
    setUseSpecialChars(!useSpecialChars);
  };

  const handleNoDuplicateCharsInPassword = () => {
    setUseNoDuplicateChars(!useNoDuplicateChars);
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
    setPassword("");
    setPasswordScore(0);
  };

  const checkAllOptionsUnchecked = () => {
    if (!getUseLowercase && !useUppercase && !useNumbers && !useSpecialChars) {
      setError(
        "Please select at least one option for generating the password."
      );
      setPassword("");
      return;
    } else {
      setError("");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSpecialCharsInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!useSpecialChars) {
      setError(
        "You must enable special characters to limit the selection of special characters to use in your password"
      );
      setTimeout(() => {
        setError("");
      }, 2500);

      return;
    }

    const allowedChars = "-_+=!@#$%^&*()[]{}|;:,.<>?/";
    const inputValue = event.target.value;

    for (let i = 0; i < inputValue.length; i++) {
      if (!allowedChars.includes(inputValue[i])) {
        setError("Invalid characters entered!");
        return;
      }
    }
    setError("");
    setCustomSpecialChars(inputValue);
  };

  const displayPasswordLengthMsg = (newLength: number) => {
    let msg: string = "";

    if (newLength >= 12 && newLength <= 20) {
      msg = "- Great!";
    } else if (newLength < 12) {
      msg = "- Consider generating a longer password";
    } else if (newLength > 20 && newLength <= 40) {
      msg = "- Great, but probably hard to remember";
    } else if (newLength > 40 && newLength < 50) {
      msg = "- Thats long enough now, dont you think?";
    } else if (newLength === 50) {
      msg =
        "- If that is not going to keep your password secure, I do not know what!";
    }

    return msg;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const localStorageProps = {
    passwordLength: passwordLength,
    useSpecialChars: useSpecialChars,
    useUpper: useUppercase,
    useLower: getUseLowercase,
    useNumbers: useNumbers,
    noDuplicateChars: useNoDuplicateChars,
    saveSettings: saveSettings,
    selectedlang: selectedLanguage,
    setSave: setSaveSettings,
  };

  const toolTip = (
    <Tooltip>
      To get a better password score, use a long password, special characters
      (symbols) as well as numbers, uppercase and lowercase characters
    </Tooltip>
  );

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
                onChange={(e) => {}}
              ></Form.Control>
              <Button variant="light" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon
                  icon={passwordVisibility ? faEye : faEyeSlash}
                />
              </Button>
              <Button variant="outline-primary" onClick={handlePasswordCopy}>
                Copy
              </Button>
            </InputGroup>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Select a language</Form.Label>
              <Form.Control
                as="select"
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e)}
              >
                {languageSelection.map((lang) => (
                  <option value={lang.language} key={lang.language.toString()}>
                    {Languages[lang.language]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <br />
              <Form.Label>
                Password length:{" "}
                <span>
                  {passwordLength} {passwordLengthText}
                </span>
              </Form.Label>
              <Form.Range
                min={6}
                max={50}
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

              <SaveLocalStorage {...localStorageProps} />
            </Form.Group>

            <hr></hr>

            <Form.Group style={{ marginTop: 10 + "px" }}>
              <Form.Check
                type="checkbox"
                checked={useSpecialChars}
                onChange={handleSpecialCharsChange}
                label="Include special characters (-_+=!@#$%^&*()[]{}|;:,.<>?/)"
              />
              <Form.Label htmlFor="special-chars">
                Limit selection of special characters:
              </Form.Label>
              <Form.Control
                type="text"
                name="special-chars"
                placeholder="Special characters to exclude"
                value={customSpecialChars}
                onChange={handleSpecialCharsInputChange}
              />
            </Form.Group>

            <hr></hr>

            <p>
              <OverlayTrigger overlay={toolTip} placement="left">
                <i>
                  <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
                </i>
              </OverlayTrigger>{" "}
              Password Strength:{" "}
              {password === "" ? "" : passwordStrength(password)?.value}{" "}
            </p>

            <ProgressBar
              striped
              id="progress-bar"
              style={{ marginTop: 15 + "px" }}
              now={passwordScore * 25}
              label={`${passwordScore <= 0 ? 0 : passwordScore * 25}%`}
            />
          </Card.Body>

          <Card.Footer>
            <hr></hr>

            <div className="btnPositioning">
              <Button
                className="btn btn-primary btn-child"
                id="clear"
                onClick={clearPassword}
              >
                Clear Password
              </Button>
              <DownloadButton passwordString={password} setError={setError} />
            </div>

            <hr></hr>

            <div className="submitBtncontainer">
              <Button
                type="submit"
                className="btn-generate-password"
                onClick={handlePasswordGeneration}
              >
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
