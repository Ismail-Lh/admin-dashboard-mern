import React from 'react';
import { useGetGeographyQuery } from 'state/api';

const Geography = () => {
  const { data, isLoading } = useGetGeographyQuery();

  return <div>Geography</div>;
};

export default Geography;
