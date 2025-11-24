import React, { useState } from 'react';
import {
  Upload,
  X,
  Image as ImageIcon,
  Package,
  DollarSign,
  Tag,
  Ruler,
} from 'lucide-react';
import api from '../services/api.js';
import { toast, ToastContainer } from 'react-toastify';

const ImageUploadBox = ({ image, setImage, inputId, imageNumber, removeImage }) => (
    <label
      htmlFor={inputId}
      className='relative border-2 border-dashed bg-white rounded-xl w-full aspect-square border-indigo-300 hover:border-indigo-500 p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 group overflow-hidden'
    >
      {!image ? (
        <>
          <div className='bg-indigo-50 p-4 rounded-full group-hover:bg-indigo-100 transition-colors'>
            <Upload className='w-8 h-8 text-indigo-600' />
          </div>
          <div className='text-center'>
            <p className='text-sm font-medium text-gray-700 mb-1'>
              Upload Image
            </p>
            <p className='text-xs text-gray-500'>Click or drag & drop</p>
            <p className='text-xs text-gray-400 mt-1'>PNG, JPG up to 10MB</p>
          </div>
        </>
      ) : (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt={`Product ${imageNumber}`}
            className='w-full h-full object-cover rounded-lg'
          />
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              removeImage(imageNumber);
            }}
            className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors shadow-lg'
          >
            <X className='w-4 h-4' />
          </button>
        </>
      )}
      <input
        id={inputId}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>
  );


const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();

      formData.append('name', details.name);
      formData.append('description', details.description);
      formData.append('price', details.price);
      formData.append('category', category);
      sizes.forEach((sizes) => formData.append('sizes[]', sizes));
      colors.forEach((colors) => formData.append('colors[]', colors));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await api.post('/product/create', formData);

      if (response.data.success) {
        toast.success('User deleted successfully!');
        setDetails({
          name: '',
          description: '',
          price: '',
        });
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.log(error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to add product');
    }
  };

  if (loading) {
    return (
      <button
        type='button'
        class='inline-flex items-center text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'
      >
        <svg
          aria-hidden='true'
          class='w-4 h-4 text-neutral-tertiary animate-spin fill-brand me-2'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
        Loading...
      </button>
    );
  }

  const removeImage = (imageNumber) => {
    switch (imageNumber) {
      case 1:
        setImage1(false);
        break;
      case 2:
        setImage2(false);
        break;
      case 3:
        setImage3(false);
        break;
      case 4:
        setImage4(false);
        break;
    }
  }; 

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
  const colorOption = ['Black', 'Grey', 'White', 'Brown', 'Blue', 'Mixed'];

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-indigo-50/30 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        {error ? <p>{error}</p> : ''}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-indigo-600 p-2 rounded-lg'>
              <Package className='w-6 h-6 text-white' />
            </div>
            <h1 className='text-3xl font-bold text-gray-800'>
              Add New Product
            </h1>
          </div>
          <p className='text-gray-600'>
            Fill in the details below to add a product to your inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <ImageIcon className='w-5 h-5 text-indigo-600' />
              <h2 className='text-xl font-semibold text-gray-800'>
                Product Images
              </h2>
              <span className='text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full ml-2'>
                Up to 4 images
              </span>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              <ImageUploadBox
                image={image1}
                setImage={setImage1}
                inputId='fileInput1'
                imageNumber={1}
                removeImage={removeImage}
              />
              <ImageUploadBox
                image={image2}
                setImage={setImage2}
                inputId='fileInput2'
                imageNumber={2}
                removeImage={removeImage}
              />
              <ImageUploadBox
                image={image3}
                setImage={setImage3}
                inputId='fileInput3'
                imageNumber={3}
                removeImage={removeImage}
              />
              <ImageUploadBox
                image={image4}
                setImage={setImage4}
                inputId='fileInput4'
                imageNumber={4}
                removeImage={removeImage}
              />
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <Package className='w-5 h-5 text-indigo-600' />
              <h2 className='text-xl font-semibold text-gray-800'>
                Product Details
              </h2>
            </div>

            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Product Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter product name'
                  id='name'
                  value={details.name}
                  onChange={handleChange}
                  name='name'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Product Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                  placeholder='Describe your product in detail...'
                  id='description'
                  value={details.description}
                  onChange={handleChange}
                  name='description'
                  rows='5'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <Tag className='w-5 h-5 text-indigo-600' />
              <h2 className='text-xl font-semibold text-gray-800'>
                Category & Pricing
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Category <span className='text-red-500'>*</span>
                </label>
                <select
                  id='category'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value='table'>Table</option>
                  <option value='chair'>Chair</option>
                  <option value='couch'>Couch</option>
                  <option value='bed'>Bed</option>
                  <option value='drawer'>Drawer</option>
                  <option value='rack'>Rack</option>
                  <option value='cabinet'>Cabinet</option>
                  <option value='desk'>Desk</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Price (USD) <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type='number'
                    placeholder='0.00'
                    id='price'
                    value={details.price}
                    onChange={handleChange}
                    name='price'
                    min='0'
                    step='0.01'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition'
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <Ruler className='w-5 h-5 text-indigo-600' />
              <h2 className='text-xl font-semibold text-gray-800'>
                Available Sizes
              </h2>
              <span className='text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full ml-2'>
                Select all that apply
              </span>
            </div>

            <div className='flex flex-wrap gap-3'>
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type='button'
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${
                      sizes.includes(size)
                        ? 'bg-indigo-600 text-white shadow-md scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>

            {sizes.length > 0 && (
              <p className='mt-4 text-sm text-gray-600'>
                Selected:{' '}
                <span className='font-medium text-indigo-600'>
                  {sizes.join(', ')}
                </span>
              </p>
            )}
          </div>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <Ruler className='w-5 h-5 text-indigo-600' />
              <h2 className='text-xl font-semibold text-gray-800'>
                Available Colors
              </h2>
              <span className='text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full ml-2'>
                Select all that apply
              </span>
            </div>

            <div className='flex flex-wrap gap-3'>
              {colorOption.map((color) => (
                <button
                  key={color}
                  type='button'
                  onClick={() =>
                    setColors((prev) =>
                      prev.includes(color)
                        ? prev.filter((item) => item !== color)
                        : [...prev, color]
                    )
                  }
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${
                      colors.includes(color)
                        ? 'bg-indigo-600 text-white shadow-md scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {color}
                </button>
              ))}
            </div>

            {colors.length > 0 && (
              <p className='mt-4 text-sm text-gray-600'>
                Selected:{' '}
                <span className='font-medium text-indigo-600'>
                  {colors.join(', ')}
                </span>
              </p>
            )}
          </div>
          <div className='flex gap-4 justify-end'>
            <button
              type='button'
              className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-8 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105'
            >
              Add Product
            </button>
          </div>
        </form>
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

export default Add;
