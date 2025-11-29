import React, { useEffect, useState } from 'react';
import api from '../service/api.js';
import { ChevronRight, Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const productPerPage = 12;

  const filteredProducts = product.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const pageVisited = pageNumber * productPerPage;

  const categories = ['All', ...new Set(product.map(p => p.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPageNumber(0); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPageNumber(0); 
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get('/product', product);
        setProduct(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  const displayProducts = filteredProducts
    .slice(pageVisited, pageVisited + productPerPage)
    .map((products) => (
      <div
        key={products._id}
        className='bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group'
      >
        <div className='relative'>
          <div className='text-8xl flex items-center justify-center bg-white'>
            <img src={products?.images[0]} alt={products.name} />
          </div>
          <button className='absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition'>
            <Heart size={20} className='text-gray-600' />
          </button>
        </div>
        <div className='p-4'>
          <h4 className='font-semibold text-gray-800 mb-2'>{products.name}</h4>
          <div className='flex items-center justify-between'>
            <span className='text-2xl font-bold text-indigo-600'>
              ${products.price}
            </span>
            <button onClick={() => handleAddToCart(products._id)} className='cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ));

  const handleAddToCart = (_id) => {
    navigate(`/product/${_id}`);
  };

    const pageCount = Math.ceil(filteredProducts.length / productPerPage);

  const handlePrevious = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < pageCount - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className='pt-20 flex flex-col  px-10 gap-10 '>
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h3 className='text-3xl font-bold text-gray-800'>
              Featured Products
            </h3>
            <a
              href='#'
              className='text-indigo-600 font-semibold hover:underline flex items-center'
            >
              View All <ChevronRight size={20} />
            </a>
          </div>
          
          <div className='mb-6'>
            <div className='relative max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={handleSearchChange}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </div>
          </div>

          <div className='flex gap-2 mb-6 flex-wrap'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {displayProducts.length > 0 ? (
               displayProducts
            ) : (
               <p className="text-gray-500 col-span-full text-center">No products found.</p>
            )}
          </div>
        </div>
      </section>
      {pageCount > 1 && (
        <div className='flex gap-3 mt-8 items-center mb-8'>
          <button
            onClick={handlePrevious}
            disabled={pageNumber === 0}
            className='px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            &lt;&lt; Previous
          </button>

          <span className='text-sm'>
            Page {pageNumber + 1} of {pageCount}
          </span>

          <button
            onClick={handleNext}
            disabled={pageNumber >= pageCount - 1}
            className='px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
