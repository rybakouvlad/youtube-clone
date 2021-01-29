import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ListVideo() {
  const query = useQuery();

  return (
    <>
      <h2>ListVideo</h2>
      <h4>{query}</h4>
    </>
  );
}
