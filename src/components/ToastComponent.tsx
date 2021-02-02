import React, { useState } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
// import { useHttp } from 'Pages/Auth/hooks/http.hook';

export const ToastComponent = (props: any) => {
  // const { error /*, clearError  */ } = useHttp();

  const [show, setShow] = useState(true);
  // useEffect(() => {
  //   console.log('777', error);
  //   setRegisteredMessage(error);
  // }, error);
  // const [registeredMessage, setRegisteredMessage] = useState('');
  setShow(props.show)
  console.log('&&&&88', props)
  console.log(typeof props)
  console.log(typeof show)
  return (
    <Row>
      <Col>
        <Toast
          style={{
            position: 'absolute',
            bottom: 0,
            right: 10,
          }}
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          animation={true}
        >
          { console.log('0000', props)}
          {/*<Toast.Header>*/}
          {/*  /!*<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />*!/*/}
          {/*  <strong className="mr-auto">Bootstrap</strong>*/}
          {/*  <small>11 mins ago</small>*/}
          {/*</Toast.Header>*/}

          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};
