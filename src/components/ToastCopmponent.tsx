import React, { FC } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';

interface IToast {
  show: boolean;
  message: string;
  changeShow(status: boolean): void;
}

export const ToastCopmponent: FC<IToast> = (props: IToast) => {
  const changeHandler = () => {
    props.changeShow(false);
  };

  return (
    <Row>
      <Col>
        <Toast
          style={{
            position: 'absolute',
            bottom: 0,
            right: 10,
          }}
          onClose={changeHandler}
          show={props.show}
          delay={3000}
          autohide
          animation={true}
        >
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

ToastCopmponent.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  changeShow: PropTypes.func,
};
