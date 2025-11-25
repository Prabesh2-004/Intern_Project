import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const companyLogos = [
    'slack',
    'framer',
    'netflix',
    'google',
    'linkedin',
    'instagram',
    'facebook',
  ];
  return (
    <div className='pt-18 '>
      <div className='flex px-20 bg-[#faeab4] items-center justify-between h-screen'>
        <div className='flex flex-col gap-16'>
          <p className='text-8xl'>Sherpa Multi seater</p>
          <Link to='/product' className='text-2xl underline'>
            View More
          </Link>
        </div>
        <div className=''>
          <img src='./heroimage.png' alt='img' className='h-96' />
        </div>
      </div>
      <div>
        <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

        <div className='overflow-hidden w-full relative max-w-5xl mx-auto select-none'>
          <div className='absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent' />
          <div
            className='marquee-inner flex will-change-transform min-w-[200%]'
            style={{ animationDuration: '15s' }}
          >
            <div className='flex'>
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <img
                  key={index}
                  src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                  alt={company}
                  className='w-full h-full object-cover mx-6'
                  draggable={false}
                />
              ))}
            </div>
          </div>
          <div className='absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent' />
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-3xl font-medium text-slate-800 text-center mb-2 font-poppins'>
          Top Picks For You
        </h1>
        <p className='text-slate-600 mb-10 font-poppins text-center'>
          Find a bright ideal taste for you with our great selection
        </p>
        <section className='flex flex-wrap items-center justify-center gap-6'>
          <a href='#' className='group w-56'>
            <img
              className='rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover object-top'
              src='https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=500&auto=format&fit=crop'
              alt='image'
            />
            <p className='text-sm mt-2'>White crew-Neck T-Shirt</p>
            <p className='text-xl'>$ 29.00</p>
          </a>
          <a href='#' className='group w-56'>
            <img
              className='rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover object-right'
              src='https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=600&auto=format&fit=crop'
              alt='image'
            />
            <p className='text-sm mt-2'>White crew-Neck T-Shirt</p>
            <p className='text-xl'>$ 39.00</p>
          </a>
          <a href='#' className='group w-56'>
            <img
              className='rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover object-right'
              src='https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=735&auto=format&fit=crop'
              alt='image'
            />
            <p className='text-sm mt-2'>White crew-Neck T-Shirt</p>
            <p className='text-xl'>$ 29.00</p>
          </a>
          <a href='#' className='group w-56'>
            <img
              className='rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover object-right'
              src='https://images.unsplash.com/photo-1667243038099-b257ab263bfd?q=80&w=687&auto=format&fit=crop'
              alt='image'
            />
            <p className='text-sm mt-2'>White crew-Neck T-Shirt</p>
            <p className='text-xl'>$ 49.00</p>
          </a>
        </section>
        <Link to='/product' className='underline'>
          View More
        </Link>
      </div>
    </div>
  );
};

export default Home;
