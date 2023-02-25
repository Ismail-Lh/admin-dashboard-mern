import React from 'react';
import { useGetOverallSalesQuery } from 'state/api';

const Overview = () => {
  const { data } = useGetOverallSalesQuery();
  console.log('🚀 ~ file: Overview.jsx:6 ~ Overview ~ data:', data);

  return <div>Overview</div>;
};

export default Overview;
