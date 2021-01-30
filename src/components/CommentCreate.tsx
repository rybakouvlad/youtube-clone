import React, { useState, useContext, useCallback, useEffect } from 'react';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import { AuthContext } from '../Pages/Auth/context/AuthContext';

interface IComment {
  id: string;
  text: string;
  video: string;
  user: string;
  date: Date;
}

export function AddComments() {
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    text: '',
  });

  const getAllComments = useCallback(async () => {
    try {
      const data = await request('/api/comment/pullComments', 'GET', null, { Authorization: `Bearer ${auth.token}` });
      setAllComments(data);
      return true;
    } catch (e) {
      return false;
    }
  }, [auth, request]);

  useEffect(() => {
    try {
      getAllComments();
    } catch (error) {}
  }, [getAllComments]);
  const [allComments, setAllComments] = useState<Array<IComment>>([{ id: '1', text: 'test', video: '1', user: '1', date: new Date()}]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const addCommentHandler = async () => {
    try {
      const data = await request('/api/comment/create', 'POST', { ...form }, { Authorization: `Bearer ${auth.token}` });
      setForm({ text: '' });
      getAllComments();
      console.log(data);
    } catch (e) {}
  };

  const dateOptions = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
  };
  return (
    <div>
      {!loading &&
        allComments.map((com: IComment, index) => {
          return (
            <Card key={index}>
              <Card.Header>
                <span>{com.user}</span>
                <span>{new Date(com.date).toLocaleString('ru', dateOptions)}</span>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p> {com.text} </p>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
      <InputGroup className="mb-3">
        <FormControl
          onChange={changeHandler}
          value={form.text}
          name="text"
          placeholder="Your comment"
          aria-label="Your comment"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit" onClick={addCommentHandler}>
            add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
