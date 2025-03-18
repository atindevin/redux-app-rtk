import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  interface User {
    id: number;
    name: string;
    email: string;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getUsers();
        setUsers(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    setLoading(true);
    try {
      const newUser = {
        name: 'New User',
        email: `user${Date.now()}@example.com`,
      };
      const createdUser = await apiService.createUser(newUser);
      setUsers([...users, createdUser]);
    } catch (err) {
      setError('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleAddUser} disabled={loading}>
        {loading ? 'Adding...' : 'Add User'}
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;