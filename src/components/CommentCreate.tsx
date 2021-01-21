import React, { useState, useContext } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import { AuthContext } from '../Pages/Auth/context/AuthContext';

export function AddComments() {
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    text: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const addCommentHandler = async () => {
    try {
      console.log(form);

      const data = await request('/api/comment/create', 'POST', { ...form }, { Authorization: `Bearer ${auth.token}` });
      console.log('!!!!!!!!!!!!!');
      console.log(data);
      setForm({ text: '' });
      console.log(form);
    } catch (e) {}
  };

  return (
      <InputGroup className="mb-3">
        <FormControl
          onChange={changeHandler} value={form.text} name="text"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit" onClick={addCommentHandler}>add</Button>
        </InputGroup.Append>
      </InputGroup>
  );
}
