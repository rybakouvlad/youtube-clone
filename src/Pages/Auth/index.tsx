import React, { FC, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Authorization from './components/Authorization';
import Register from './components/Register';
import { ToastCopmponent } from '../../components/ToastCopmponent';
export const Auth: FC = () => {
  const [textHelp, setTextHelp] = useState({
    help: 'You are not ',
    status: 'registred?',
    isStatus: false,
  });
  const [showToast, setShowToast] = useState(false);
  const changeHandler = () => {
    changeStatus(textHelp.isStatus);
  };

  const changeStatus = (status: boolean, isNew = false): void => {
    if (isNew) {
      setShowToast(true);
    }
    if (status) {
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

  const changeShow = (status: boolean) => {
    setShowToast(status);
  };

  return (
    <>
      <div>{textHelp.isStatus ? <Register changeStatus={changeStatus} /> : <Authorization />}</div>
      <h6>
        {textHelp.help}{' '}
        <Badge variant="secondary" onClick={changeHandler}>
          {textHelp.status}
        </Badge>
      </h6>
      {showToast ? <ToastCopmponent show={showToast} message={'Пользователь создан'} changeShow={changeShow} /> : null}
    </>
  );
};

export default Auth;
