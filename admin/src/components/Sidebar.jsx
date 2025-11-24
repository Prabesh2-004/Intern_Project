import {
  CirclePlus,
  LogOut,
  PackageSearch,
  ShoppingCart,
  TextAlignJustify,
  Users,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({setToken}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }
  return (
    <div className='flex z-10 fixed shadow-2xl'>
      <div
        className={`flex h-screen ${
          isOpen ? 'w-48' : 'w-16'
        } flex-col justify-between border-e border-gray-100 bg-white`}
      >
        <div>
          <div className='py-4'>
            <p
              onClick={() => setIsOpen(!isOpen)}
              className={`t group cursor-pointer relative flex ${
                isOpen ? 'justify-start pl-5' : 'justify-center '
              } rounded-sm px-2 py-1.5 `}
            >
              {isOpen ? <X /> : <TextAlignJustify />}

              {isOpen ? (
                ''
              ) : (
                <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                  Open
                </span>
              )}
            </p>
          </div>

          <div className='border-t border-gray-100'>
            <div className=''>
              <div className={`inline-flex size-16 gap-5 w-full items-center ${isOpen ? 'justify-start ml-4' : 'justify-center'}`}>
                <span className='grid size-10 place-content-center rounded-lg font-bold bg-gray-100 text-xs text-gray-600'>
                  N
                </span>
                {isOpen ? <span className='font-bold'>Shopnexa</span> : ''}
              </div>

              <ul
                className={`space-y-1 border-t flex flex-col ${
                  isOpen ? 'items-start pl-3' : 'items-center'
                } border-gray-100 pt-4`}
              >
                <li>
                  <NavLink
                    to='/add'
                    className='group relative flex gap-5 justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  >
                    <CirclePlus />
                    {isOpen ? <span className='font-bold'>ADD</span> : ''}
                    {isOpen ? (
                      ''
                    ) : (
                      <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                        ADD
                      </span>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to='/'
                    className='group relative flex gap-5 justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  >
                    <PackageSearch />
                    {isOpen ? <span className='font-bold'>Lists</span> : ''}
                    {isOpen ? (
                      ''
                    ) : (
                      <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                        Lists
                      </span>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to='/order'
                    className='group relative flex gap-5 justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  >
                    <ShoppingCart />
                    {isOpen ? <span className='font-bold'>Order</span> : ''}
                    {isOpen ? (
                      ''
                    ) : (
                      <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                        Orders
                      </span>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to='/users'
                    className='group relative flex gap-5 justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  >
                    <Users />
                    {isOpen ? <span className='font-bold'>Users</span> : ''}
                    {isOpen ? (
                      ''
                    ) : (
                      <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                        Users
                      </span>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2'>
          <button
            onClick={handleLogout}
            className='cursor-pointer  group relative flex w-full gap-5 rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          >
            <LogOut />
            {isOpen ? <span className='font-bold'>Logout</span> : ''}
            {isOpen ? (
              ''
            ) : (
              <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
