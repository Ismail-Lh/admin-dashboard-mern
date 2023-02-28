import React from 'react';
import { useGetDashboardStatsQuery } from 'state/api';

const Dashboard = () => {
  const { data } = useGetDashboardStatsQuery();
  console.log('🚀 ~ file: Dashboard.jsx:6 ~ Dashboard ~ data:', data);

  return <div>Dashboard</div>;
};

export default Dashboard;
