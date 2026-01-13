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

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <Banner></Banner>
            <Featured></Featured>
            <Services></Services>
            <Categories></Categories>
            <Highlights></Highlights>
            <Statistics></Statistics>
            <Testimonials></Testimonials>
            <Blogs></Blogs>
            <Newsletter></Newsletter>
            <FAQ></FAQ>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;