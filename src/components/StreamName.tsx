import { AuthContext } from 'Pages/Auth/context/AuthContext';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import React, { FC, useContext, useState } from 'react';
import { Accordion, Card, Button, InputGroup, FormControl } from 'react-bootstrap';

export const StreamName: FC = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({ name: '' });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitNameHandler = async () => {
    try {
      if (form.name === '') {
        console.log('Пустая строка');
        return;
      }
      const data = await request('/api/stream/set-name', 'POST', null, {
        Authorization: `Bearer ${auth.token}`,
        streamname: form.name,
      });
      setForm({ name: '' });
      console.log(data);

      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Set stream Name!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter name"
                  aria-label="Enter name"
                  aria-describedby="basic-addon2"
                  name="name"
                  value={form.name}
                  onChange={changeHandler}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={submitNameHandler}>
                    Button
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};
