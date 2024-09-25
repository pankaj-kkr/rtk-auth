import React from 'react';
import { useGetUsersQuery } from '../redux/api/userApi';

const UsersList = () => {
  const {
    data: users,
    error,
    isLoading: isLoadingUsers,
    refetch: fetchUsers,
  } = useGetUsersQuery();

  if (isLoadingUsers) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <button onClick={fetchUsers}>refetch</button>

      {users && users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <>
              <li key={user.id}>{user.name}</li>
            </>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;
