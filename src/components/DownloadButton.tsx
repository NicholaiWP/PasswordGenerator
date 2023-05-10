import React from 'react';
import {Button} from "react-bootstrap";

interface DownloadContent {
  passwordString: string | undefined | null;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const DownloadButton: React.FC<DownloadContent> = ({passwordString, setError}) => {

  const isPasswordValidToDownload = ():boolean => {
    if (!passwordString || passwordString.trim() === '') {
      // passwordString is empty, null, or undefined
      setError('You must generate a password before downloading a file with it');
      return false;
    }
    downloadTxtFile()
    return true;
  }

   function downloadTxtFile() { 
    const element = document.createElement("a");
    const file = new Blob([`Your generated password is the following: ${passwordString}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "MyGeneratedPassword.txt";
    document.body.appendChild(element); 
    element.click();
  };

  return ( 
     <Button className='btn btn-primary btn-child' id='download-btn' onClick={isPasswordValidToDownload}>Download Password</Button>   
  );
};

export default DownloadButton;
