import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { BellRing, Mail, Search, ShoppingCart, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const List = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get('/product');
        setProduct(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

    const handleDelete = async (_id) =>{
    try {
      await api.delete(`/product/${_id}`)
      setProduct(product => product.filter(item => item._id !== _id))
      toast.success('Product Deleted successfully!');
    } catch (error) {
      console.log(error)
    }
  }

  const filterProduct = product.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className='min-h-screen bg-gray-50 p-6 md:p-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <ShoppingCart className='w-8 h-8 text-blue-600' />
            <h1 className='text-3xl font-bold text-gray-800'>
              Product Management
            </h1>
          </div>
          <p className='text-gray-600'>
            Manage and monitor all available product
          </p>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Product</p>
              <p className='text-3xl font-bold text-gray-800'>{product.length}</p>
            </div>
            <div className='bg-blue-100 p-4 rounded-full'>
              <ShoppingCart className='w-8 h-8 text-blue-600' />
            </div>
          </div>
        </div>
        {/* Search */}
        <div className='mb-6'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by product name'
              className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
            />
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='hidden md:grid md:grid-cols-12 gap-4 items-center bg-gray-50 px-6 py-4 border-b border-gray-200 font-semibold text-gray-700'>
            <div className='col-span-1'>Image</div>
            <div className='col-span-3'>Name</div>
            <div className='col-span-4'>Price</div>
            <div className='col-span-4 text-right'>Actions</div>
          </div>
          <div className='divide-y divide-gray-200'>
            {filterProduct.length > 0 ? (
              filterProduct.map((products) => (
                <div
                  key={products._id}
                  className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition'
                >
                  <div className='col-span-1 flex items-center gap-4 md:block'>
                    <img
                      src={products.images[0]}
                      alt={products.name}
                      className='w-12 h-12 rounded-full object-cover border-2 border-gray-200'
                    />
                  </div>

                  <div className='col-span-1 md:col-span-3'>
                    <p className='font-medium text-gray-800'>
                      {products.name}
                    </p>
                    <p className='text-sm text-gray-500 md:hidden'>
                      {products.category}
                    </p>
                  </div>

                  <div className='hidden md:block md:col-span-4'>
                    <div className='flex items-center gap-2 text-gray-600'>
                      <p className='text-sm'><span className='font-bold'>RS</span> {products.price}</p>
                    </div>
                  </div>

                  <div className='col-span-1 md:col-span-4 flex gap-3 justify-start md:justify-end'>
                    <button
                      className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 shadow-sm'
                    >
                      <BellRing className='w-4 h-4' />
                      <span className='text-sm font-medium'>Notify</span>
                    </button>
                    <button
                      onClick={() => handleDelete(products._id)}
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
                <ShoppingCart  className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <p className='text-gray-500 text-lg'>No product found</p>
                <p className='text-gray-400 text-sm'>
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        </div>

        {filterProduct.length > 0 && (
          <div className='mt-4 text-sm text-gray-600 text-center'>
            Showing {filterProduct.length} of {filterProduct.length} products
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

export default List;
List;
