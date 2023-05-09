import { Toast, ToastContainer } from 'react-bootstrap';
import React from 'react';

interface Props {
  message: string;
  toastHeaderMessage:string;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomToast: React.FC<Props> = ({ message, toastHeaderMessage, showToast, setShowToast }) => {
  const handleClose = () => {
    setShowToast(false);
  };

  React.useEffect(() => {
    if (showToast) {
      setShowToast(true);
    }
  }, [showToast, setShowToast]);

  return (
    <ToastContainer style={{ margin: "10px", display:'grid', width:'100%', placeItems:'center' }}>
      <Toast show={showToast} onClose={handleClose} delay={3000} autohide>
        <Toast.Header>
            <div>Notification</div>
            <strong className="me-auto">{toastHeaderMessage}</strong>
            <small>Just now!</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
