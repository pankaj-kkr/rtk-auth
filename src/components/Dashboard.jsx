import React from 'react';
import { useGetUsersQuery } from '../redux/api/userApi';

const Dashboard = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  console.log(data);
  return <div>{isLoading ? 'loading..' : JSON.stringify(data)}</div>;
};

export default Dashboard;
