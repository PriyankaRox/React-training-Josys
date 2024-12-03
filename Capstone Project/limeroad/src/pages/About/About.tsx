import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

const About: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center align-middle m-4">
        <p
          className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow 
        md:flex-row "
        >
          <img
            className="object-cover w-full rounded-t-lg h-60  md:rounded-none md:rounded-s-lg"
            src="https://infashionbusiness.com/admin_assets/images/products/infashion-1721371516.jpeg"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl tracking-tight font-bold text-gray-900 ">
              About Us
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
              We are passionate about finding things that rise above the
              mundane; that we think will catch your eye and arrest it.
              Moreover, to bring these to you wherever you are and whenever you
              feel you have the time to indulge a little. <br />
              So we created a company to bring you products you will fall in
              love with; to give you a chance to create your own space, to tap
              into those hidden talents and make your personal looks and
              collections; to help you share your creations with friends to get
              that second opinion, to inspire or be inspired; and to help you
              shop in a way that you will find mesmerizing.
              <br />
              We like to think of LimeRoad as the digital-age equivalent of the
              16th Century Grand Trunk Road, a highway that changed the face of
              trade in the Indian subcontinent.
              <br />
              <span>Come love | create | share | shop with us.</span>
            </p>
          </div>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
