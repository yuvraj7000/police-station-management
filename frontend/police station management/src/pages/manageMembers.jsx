import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMembers = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'ecop') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleNewMemberChange = (e) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value
    });
  };

  const handleNewMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/register', newMember);
      setMessage(response.data.message);
      setMembers([...members, response.data.user]);
      setNewMember({ name: '', username: '', email: '', password: '' });
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDeleteMember = async (username) => {
    if (window.confirm(`Are you sure you want to delete the member with username: ${username}?`)) {
      try {
        const response = await axios.post('http://localhost:5000/user/delete', { username });
        setMessage(response.data.message);
        setMembers(members.filter(member => member.username !== username));
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Server error');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchMembers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/user/all');
          setMembers(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch members');
          setLoading(false);
        }
      };

      fetchMembers();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handlePasswordSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Enter Password</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {members.map((member) => (
          <div key={member._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{member.name}</h2>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Username:</span> {member.username}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> {member.email}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => handleDeleteMember(member.username)}
            >
              Delete Member
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
      <form onSubmit={handleNewMemberSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newMember.name}
            onChange={handleNewMemberChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={newMember.username}
            onChange={handleNewMemberChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newMember.email}
            onChange={handleNewMemberChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={newMember.password}
            onChange={handleNewMemberChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default ManageMembers;