import superagent, { ResponseError, Response } from 'superagent';

interface Event<T = EventTarget> {
  target: T;
  // ...
}
interface authToke {
  Authorization: string;
}

export function sendFile(event: Event<HTMLInputElement>, header: authToke, fileTitle: string) {
  console.log(event.target.files[0]);
  console.log(fileTitle);

  superagent
    .post('/api/files')
    .attach('file', event.target.files[0])
    .on('progress', (event) => {
      console.log(event);
    }) // sends a JSON post body
    .set(header)
    .set('fileTitle', fileTitle)
    .set('accept', 'json')
    .end(function (err: ResponseError, res: Response) {
      // Calling the end function will send the request
      console.log(err);
      console.log(res);
    });
}
