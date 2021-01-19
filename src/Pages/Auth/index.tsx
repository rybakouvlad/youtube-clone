import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import Authorization from './components/Authorization';
import Register from './components/Register';

export const Auth = () => {
  const [textHelp, setTextHelp] = useState({
    help: 'You are not ',
    status: 'registred?',
    isStatus: false,
  });

  const changeHandler = () => {
    if (textHelp.isStatus) {
      setTextHelp({
        help: 'You are not ',
        status: 'registred?',
        isStatus: false,
      });
    } else {
      setTextHelp({
        help: 'Do you have a ',
        status: 'registration?',
        isStatus: true,
      });
    }
  };

  return (
    <>
      <div>{textHelp.isStatus ? <Register /> : <Authorization />}</div>
      <h6>
        {textHelp.help}{' '}
        <Badge variant="secondary" onClick={changeHandler}>
          {textHelp.status}
        </Badge>
      </h6>
    </>
  );
};

export default Auth;
