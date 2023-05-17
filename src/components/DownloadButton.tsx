import React, { useRef } from 'react';
import { Button } from "react-bootstrap";
import '../styles/Animations.css';

interface DownloadContent {
  passwordString: string | undefined | null;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const DownloadButton: React.FC<DownloadContent> = ({ passwordString, setError }) => {

  const downloadBtnRef = useRef<HTMLButtonElement>(null);
  const errorTimer:number = 3000;
  const removeShakeTimer:number = 800;

  const isPasswordValidToDownload = (): boolean => {
    if (!passwordString || passwordString.trim() === '') {
      setError('You must generate a password before downloading a file with it');
      setTimeout(() => {
        setError('');
      }, errorTimer);
      
      const downloadBtn = downloadBtnRef.current;
      if (downloadBtn && !downloadBtn.classList.contains('shake-horizontal')) {
        downloadBtn.classList.add('shake-horizontal');
        setTimeout(() => {
          downloadBtn.classList.remove('shake-horizontal');
        }, removeShakeTimer);
      }
      return false;
    }
    downloadTxtFile();
    return true;
  }

  function downloadTxtFile() {
    const element = document.createElement("a");
    const file = new Blob([`Your generated password is the following: ${passwordString}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "MyGeneratedPassword.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Button
      ref={downloadBtnRef}
      className='btn btn-primary btn-child'
      id='download-btn'
      onClick={isPasswordValidToDownload}
    >
      Download Password
    </Button>
  );
};

export default DownloadButton;
