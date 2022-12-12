import React from 'react';
import { Alert, Button } from 'react-bootstrap';

const AlertDismissibleComponent = ({
  show,
  setShow,
  children,
  title,
  labelButton,
}) => {
  const [seconds, setSeconds] = React.useState(5);

  React.useEffect(() => {
    console.log('__Debugger__AlertDismissComp__run: Effect');
    //! effect
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  //! count seconds
  React.useEffect(() => {
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }); //! re-render after 1 second

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{children}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            {labelButton ? labelButton : `Ẩn ngay sau (${seconds}s)`}
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default AlertDismissibleComponent;
