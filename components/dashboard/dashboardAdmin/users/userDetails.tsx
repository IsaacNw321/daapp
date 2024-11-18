import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserById } from '@/utils/users';
export default function UserDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: dbUser, isLoading } = useQuery(['user', id], () => getUserById(id));

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {dbUser.id}</p>
      {/* Display more user details here */}
    </div>
  );
}