import React, { useState, useContext, useCallback, useEffect } from 'react';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { useHttp } from 'Pages/Auth/hooks/http.hook';
import { AuthContext } from '../Pages/Auth/context/AuthContext';

interface IComment {
  id: string;
  text: string;
  user: string;
}

export function AddComments() {
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    text: '',
  });

  const getAllComments = useCallback(async () => {
    try {
      console.log('^^^^');

      const data = await request('/api/comment/pullComments', 'GET', null, { Authorization: `Bearer ${auth.token}` });
      console.log('****');
      console.log(data);
      setAllComments(data);
    } catch (e) {}
  }, [auth, request]);
  useEffect(() => {
    getAllComments();
    return () => {};
  }, [getAllComments]);
  const [allComments, setAllComments] = useState<Array<IComment>>([{ id: '1', text: 'test', user: '1' }]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const addCommentHandler = async () => {
    try {
      const data = await request('/api/comment/create', 'POST', { ...form }, { Authorization: `Bearer ${auth.token}` });
      setForm({ text: '' });
      console.log(data);
    } catch (e) {}
  };
  if (loading) {
    return <h2>llllll</h2>;
  }

  // return (
  //   <>
  //     {!loading && <LinksList links={links} />}
  //   </>
  // )

  return (
    <div>
      {!loading &&
        allComments.map((com: IComment) => {
          <Card>
            <Card.Header>{com.user}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> {com.text} </p>
              </blockquote>
            </Card.Body>
          </Card>;
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
