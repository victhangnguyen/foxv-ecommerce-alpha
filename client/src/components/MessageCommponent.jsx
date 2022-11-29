import React from 'react';
import { Alert } from 'react-bootstrap';

const MessageComponent = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

MessageComponent.defaultProps = {
  variant: 'info',
};

export default MessageComponent;
