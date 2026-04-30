import React from 'react';
import Banner from '../../components/Banner';
import Featured from '../../components/Featured';
import ContactUs from '../../components/ContactUs';
import Services from '../../components/Services';
import Categories from '../../components/Categories';
import Highlights from '../../components/Highlights';
import Statistics from '../../components/Statistics';
import Testimonials from '../../components/Testimonials';
import Blogs from '../../components/Blogs';
import Newsletter from '../../components/Newsletter';
import FAQ from '../../components/FAQ';
import Swipper from '../../components/Swipper';

const Home = () => {
    return (
        <div className='space-y-20'>
            <title>Home</title>

            <Banner />
            <Swipper />

            <Featured />
            <Services />
            <Categories />
            <Highlights />
            <Statistics />
            <Testimonials />
            <Blogs />
            <Newsletter />
            <FAQ />
            <ContactUs />
        </div>
    );
};

export default Home;