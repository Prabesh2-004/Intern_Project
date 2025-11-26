import React, { useEffect, useState } from 'react';
import api from '../service/api.js';

const Product = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get('/product', product);
        console.log(response.data.products);
        setProduct(response.data.products)
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className='pt-20 grid grid-cols-5 px-10 gap-10 '>
      {product.map(items => (
        <div key={items._id} className='max-w-80 p-5'>
        <div className='group'>
          <img
            className='group-hover:transition-transform duration-300 hover:scale-110 rounded-lg'
            src={items.images[0]}
            alt='img1'
          />
        </div>
        <p className='text-sm mt-2'>White crew-Neck T-Shirt</p>
        <p className='text-xl mt-2'>Rs {items.price}</p>
        <div className='flex justify-between mt-3 items-center'>
          <button className='py-2 px-5 border border-gray-300 cursor-pointer'>Add To Cart</button>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Product;
