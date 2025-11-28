import React, { useEffect, useState } from 'react';
import api from '../service/api.js';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get('/product', product);
        setProduct(response.data.products)
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = (_id) => {
    navigate(`/product/${_id}`)
  }

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
        <p className='text-sm mt-2'>{items.name}</p>
        <p className='text-xl mt-2'>Rs {items.price}</p>
        <div className='flex justify-between mt-3 items-center'>
          <button onClick={() => handleAddToCart(items._id)} className='py-2 px-5 border border-gray-300 cursor-pointer'>Add To Cart</button>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Product;
