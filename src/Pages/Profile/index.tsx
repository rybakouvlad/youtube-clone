import React from 'react';
import { SendFile } from '../../components/SendFile';
import { StreamKey } from '../../components/StreamKey';
import { StreamName } from '../../components/StreamName';
export function Profile() {
  return (
    <>
      <StreamKey />
      <StreamName />
      <SendFile />
    </>
  );
}
