import axios from 'axios';

export default () => {
  axios.get('http://localhost:8080/api/streams').then((res) => {
    console.log(res);
  });
};
