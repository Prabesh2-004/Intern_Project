import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../service/api.js';

const ProductDetails = ({ setPid }) => {
  const { id } = useParams();
  const [loadProduct, setLoadProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        console.log(response.data.product);
        setLoadProduct(response.data.product);
        setPid(id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleColorChange = (color) => {
    setColors(color);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  return (
    <div className='p-25'>
      <div className='max-w-6xl w-full px-6'>
        <p>
          <span>Home</span> /<span> Products</span> /
          <span> {loadProduct?.category}</span> /
          <span className='text-indigo-500'> {loadProduct?.name}</span>
        </p>

        <div className='flex flex-col md:flex-row gap-16 mt-4'>
          <div className='flex gap-3'>
            <div className='flex flex-col gap-3'>
              {loadProduct?.images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className='border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer'
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className='border border-gray-500/30 max-w-100 rounded overflow-hidden'>
              <img
                src={thumbnail || loadProduct?.images[0]}
                alt='Selected product'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          <div className='text-sm w-full md:w-1/2'>
            <h1 className='text-3xl font-medium'>{loadProduct?.name}</h1>

            <div className='mt-6'>
              <p className='text-2xl font-medium'>
                MRP: Rs {loadProduct?.price}
              </p>
              <span className='text-gray-500/70'>(inclusive of all taxes)</span>
            </div>

            <p className='text-base font-medium mt-6'>About Product</p>
            <p>{loadProduct?.description}</p>

            <div className='mt-5 mb-5'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Quantity:
              </label>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className='w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center font-bold text-lg'
                >
                  −
                </button>
                <input
                  type='number'
                  value={quantity}
                  readOnly
                  className='w-20 h-10 text-center border-2 border-gray-300 rounded-lg font-medium'
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className='w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center font-bold text-lg'
                >
                  +
                </button>
              </div>
            </div>
            <div>
                <p>Select Colors: </p>
              <div className='flex gap-5 mt-2'>
                {loadProduct?.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`py-2 px-5 bg-gray-300 font-medium ${
                      colors === color ? 'border-2 border-blue-500' : ''
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center mt-10 gap-4 text-base'>
              <button className='w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition'>
                Add to Cart
              </button>
              <button className='w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition'>
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
