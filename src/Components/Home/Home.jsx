import React from 'react';
import PostFeature from './PostFeature/PostFeature';
import Navbar from './Navbar/Navbar';
import ResponsiveNavbar from './Navbar/ResponsiveNavbar';


const Home = () => {
    return (
       <div>
       <Navbar></Navbar>

       <div className='block sm:block md:hidden lg:hidden '>
         <ResponsiveNavbar></ResponsiveNavbar>
       </div>
       
        <div className='sm:ml-20 md:ml-28'>
        <PostFeature></PostFeature>
        </div>
       </div>
    );
};

export default Home;