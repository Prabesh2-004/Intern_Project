import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import {
  BellRing,
  Trash2,
  Users as UsersIcon,
  Search,
  Mail,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/auth');
        setUser(response.data.users);
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/auth/${_id}`);
        setUser((user) => user.filter((item) => item._id !== _id));
        toast.success('User deleted successfully!');
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleNotify = (username) => {
    toast.info(`Notification sent to ${username}`);
  };

  const filteredUsers = user.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6 md:p-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <UsersIcon className='w-8 h-8 text-blue-600' />
            <h1 className='text-3xl font-bold text-gray-800'>
              User Management
            </h1>
          </div>
          <p className='text-gray-600'>
            Manage and monitor all registered users
          </p>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Users</p>
              <p className='text-3xl font-bold text-gray-800'>{user.length}</p>
            </div>
            <div className='bg-blue-100 p-4 rounded-full'>
              <UsersIcon className='w-8 h-8 text-blue-600' />
            </div>
          </div>
        </div>
        {/* Search */}
        <div className='mb-6'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search by username or email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
            />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='hidden md:grid md:grid-cols-12 gap-4 items-center bg-gray-50 px-6 py-4 border-b border-gray-200 font-semibold text-gray-700'>
            <div className='col-span-1'>Avatar</div>
            <div className='col-span-3'>Username</div>
            <div className='col-span-4'>Email</div>
            <div className='col-span-4 text-right'>Actions</div>
          </div>
          <div className='divide-y divide-gray-200'>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((users) => (
                <div
                  key={users._id}
                  className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition'
                >
                  <div className='col-span-1 flex items-center gap-4 md:block'>
                    <img
                      src={users.avatar}
                      alt={users.username}
                      className='w-12 h-12 rounded-full object-cover border-2 border-gray-200'
                    />
                  </div>

                  <div className='col-span-1 md:col-span-3'>
                    <p className='font-medium text-gray-800'>
                      {users.username}
                    </p>
                    <p className='text-sm text-gray-500 md:hidden'>
                      {users.email}
                    </p>
                  </div>

                  <div className='hidden md:block md:col-span-4'>
                    <div className='flex items-center gap-2 text-gray-600'>
                      <Mail className='w-4 h-4' />
                      <p className='text-sm'>{users.email}</p>
                    </div>
                  </div>

                  <div className='col-span-1 md:col-span-4 flex gap-3 justify-start md:justify-end'>
                    <button
                      onClick={() => handleNotify(users.username)}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 shadow-sm'
                    >
                      <BellRing className='w-4 h-4' />
                      <span className='text-sm font-medium'>Notify</span>
                    </button>
                    <button
                      onClick={() => handleDelete(users._id)}
                      className='flex cursor-pointer items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 shadow-sm'
                    >
                      <Trash2 className='w-4 h-4' />
                      <span className='text-sm font-medium'>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-12'>
                <UsersIcon className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <p className='text-gray-500 text-lg'>No users found</p>
                <p className='text-gray-400 text-sm'>
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        </div>

        {filteredUsers.length > 0 && (
          <div className='mt-4 text-sm text-gray-600 text-center'>
            Showing {filteredUsers.length} of {user.length} users
          </div>
        )}
      </div>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default Users;
