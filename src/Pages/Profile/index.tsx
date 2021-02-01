import React from 'react';
import { SendFile } from '../../components/SendFile';
import { StreamKey } from '../../components/StreamKey';

export function Profile() {
  return (
    <>
      <StreamKey />
      <SendFile />
    </>
  );
}
