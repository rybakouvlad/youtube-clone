import React, { FC } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';

interface IToast {
  show: boolean;
  message: string;
  changeShow(status: boolean): void;
  clearError(): void;
}

export const ToastError: FC<IToast> = (props: IToast) => {
  const changeHandler = () => {
    props.changeShow(false);
    props.clearError();
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

ToastError.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  changeShow: PropTypes.func,
  clearError: PropTypes.func,
};
