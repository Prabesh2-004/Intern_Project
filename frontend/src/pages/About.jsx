import React from 'react';

const About = () => {
  const promiseItems = [
    {
      icon: '✓',
      title: 'Quality You Can Trust',
      description:
        'We partner with reliable suppliers and brands to bring you products that meet our high standards.',
    },
    {
      icon: '♥',
      title: 'Customer-First Service',
      description:
        'Our dedicated support team is here to help you every step of the way, ensuring your satisfaction is our priority.',
    },
    {
      icon: '🔒',
      title: 'Secure Shopping',
      description:
        'Your privacy and security matter to us. We use industry-leading technology to protect your information.',
    },
    {
      icon: '🚚',
      title: 'Fast & Reliable Delivery',
      description:
        'We work hard to get your orders to you quickly and safely, so you can enjoy your purchases without the wait.',
    },
  ];

  return (
    <div className='max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 py-8'>
      <div style={{ backgroundImage: "url('../../Wallpaper.jpg')" }} className='bg-no-repeat bg-cover bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg p-12 md:p-20 text-center mb-12'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
          About ShopNexa
        </h1>
        <p className='text-xl md:text-2xl font-light opacity-95'>
          Your Trusted Online Shopping Destination
        </p>
      </div>

      {/* Main Content */}
      <div className='space-y-16'>
        {/* Introduction */}
        <section className='text-center max-w-4xl mx-auto'>
          <p className='text-lg md:text-xl text-gray-700 leading-relaxed'>
            At ShopNexa, we believe shopping should be simple, enjoyable, and
            accessible to everyone. Founded with a passion for connecting
            customers with quality products at great prices, we've built a
            platform where convenience meets variety.
          </p>
        </section>

        {/* Our Story */}
        <section>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
            Our Story
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            ShopNexa was born from a simple idea: to create an online
            marketplace that puts customers first. We understand that your time
            is valuable and your trust is earned, which is why we've dedicated
            ourselves to providing a seamless shopping experience from browsing
            to delivery.
          </p>
        </section>  
        <section className='flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4'>
          <div className='relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0'>
            <img
              className='max-w-md w-full object-cover rounded-2xl'
              src='https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop'
              alt=''
            />
            <div className='flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl'>
              <div className='flex -space-x-4 shrink-0'>
                <img
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200'
                  alt='image'
                  className='size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1'
                />
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'
                  alt='image'
                  className='size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-2'
                />
                <img
                  src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop'
                  alt='image'
                  className='size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-3'
                />
                <div className='flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-4'>
                  50+
                </div>
              </div>
              <p className='text-sm font-medium text-slate-800'>
                Join our developer community
              </p>
            </div>
          </div>
          <div className='text-sm text-slate-600 max-w-lg'>
            <h1 className='text-xl uppercase font-semibold text-slate-700'>
              What We Offer
            </h1>
            <div className='w-24 h-[3px] rounded-full bg-linear-to-r from-indigo-600 to-[#DDD9FF]'></div>
            <p className='text-lg text-gray-600 leading-relaxed'>
              Whether you're searching for the latest trends, everyday
              essentials, or unique finds, ShopNexa brings together thousands
              of products across multiple categories. From fashion and
              electronics to home goods and beauty, we carefully curate our
              selection to ensure quality and value in every purchase.
            </p>
            <button className='flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-linear-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white'>
              <span>Read more</span>
              <svg
                width='13'
                height='12'
                viewBox='0 0 13 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z'
                  fill='#fff'
                />
              </svg>
            </button>
          </div>
        </section>
        <section>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center'>
            Our Promise
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
            {promiseItems.map((item, index) => (
              <div
                key={index}
                className='bg-gray-50 rounded-xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
              >
                <div className='text-5xl mb-4'>{item.icon}</div>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                  {item.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className='bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-8 md:p-12 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
            Join Our Community
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto'>
            ShopNexa is more than just a store – it's a community of smart
            shoppers who value quality, convenience, and great deals. Join
            thousands of satisfied customers who have made ShopNexa their go-to
            shopping destination.
          </p>
          <p className='text-xl font-semibold text-purple-600'>
            Thank you for choosing ShopNexa. Happy shopping!
          </p>
        </section>

        <section className='bg-white border-2 border-gray-200 rounded-xl p-8 text-center'>
          <p className='text-lg text-gray-700'>
            Have questions? Our customer service team is always here to help.
            Contact us anytime at{' '}
            <a
              href='mailto:support@ShopNexa.com'
              className='text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors'
            >
              support@ShopNexa.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
