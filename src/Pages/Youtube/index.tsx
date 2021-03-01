import React, { FC, useState } from 'react';
import { SendFile } from './components/SendFile';
import { SendStream } from './components/SendStream';

export const Youtube: FC = () => {
  const [isLoad, setLoad] = useState(false);
  const [fileName, setFileName] = useState('');
  console.log(isLoad);

  return (
    <div>
      <h1>Youtube</h1>
      <SendFile setFileName={setFileName} setStatus={setLoad} />
      <SendStream fileName={fileName} />
    </div>
  );
};
