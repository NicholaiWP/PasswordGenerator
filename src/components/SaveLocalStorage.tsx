import React from "react";
import {Languages} from './PasswordHelper';
import {Form} from "react-bootstrap";

interface LocalStorageProps{
 passwordLength:number,
 useSpecialChars:boolean,
 useUpper:boolean,
 useLower:boolean,
 useNumbers:boolean,
 noDuplicateChars:boolean,
 saveSettings:boolean,
 selectedlang:Languages,
 setSave:React.Dispatch<boolean>
}

const SaveLocalStorage:React.FC<LocalStorageProps> = (props:LocalStorageProps) => {
   const {passwordLength, useSpecialChars, useUpper, useLower, useNumbers, noDuplicateChars, saveSettings, selectedlang, setSave} = props;

   const handleSaveSettings = (shouldSave: boolean) => {
    if (shouldSave) {
      localStorage.setItem('passwordLength', passwordLength.toString());
      localStorage.setItem('useSpecialChars', useSpecialChars.toString());
      localStorage.setItem('useUppercase', useUpper.toString());
      localStorage.setItem('useLowercase', useLower.toString());
      localStorage.setItem('useNumbers', useNumbers.toString());
      localStorage.setItem('useNoDuplicateChars', noDuplicateChars.toString());
      localStorage.setItem('selectedLanguage', selectedlang.toString());
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

    return(

        <Form.Check
            type="checkbox"
            checked={saveSettings}
            onChange={() => {
            setSave(!saveSettings);
            handleSaveSettings(!saveSettings);
            }}
            label="Save settings in local storage"
        />

    );
}

export default SaveLocalStorage;