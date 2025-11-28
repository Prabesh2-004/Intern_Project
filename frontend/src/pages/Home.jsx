import {
  ChartColumnStacked,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='md:pt-14 pt-14 '>
      <div className='flex flex-col md:flex-row px-20 bg-[#faeab4] items-center justify-between md:h-screen h-auto'>
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
      <div className='flex flex-col md:flex-row justify-evenly items-center p-10'>
        <img src='./cabinet.png' alt='cabinet' />
        <div className='flex flex-col gap-5 text-center'>
          <p className='text-2xl'>New Arrival</p>
          <p className='text-6xl font-medium'>Wine Cabinet</p>
          <button className='border p-4 text-xl cursor-pointer'>
            Order Now
          </button>
        </div>
      </div>
      <div className='text-center bg-[#faf5f5] p-10'>
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
      <div className='relative'>
        <div className="absolute inset-0 bg-[url('./bgImage.jpeg')] bg-center bg-cover">
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>

        <div className='p-16 flex flex-col items-center text-center relative z-10'>
          <h1 className='text-3xl p-5 text-white font-bold'>Follow Our Store</h1>
          <ul className='flex justify-center gap-8 p-10'>
            <Link title='instagram'>
              <Instagram className='text-white w-10 h-10' />
            </Link>
            <Link title='facebook'>
              <Facebook className='text-white w-10 h-10'/>
            </Link>
            <Link title='linkedin'>
              <Linkedin className='text-white w-10 h-10'/>
            </Link>
            <Link title='github'>
              <Github className='text-white w-10 h-10'/>
            </Link>
            <Link title='twitter'>
              <Twitter className='text-white w-10 h-10'/>
            </Link>
          </ul>
          <div className='rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100'>
            <button className='px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur'>
              Follow Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
