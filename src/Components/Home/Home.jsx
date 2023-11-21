import React from 'react';
import PostFeature from './PostFeature/PostFeature';
import Navbar from './Navbar/Navbar';


const Home = () => {
    return (
       <div>
       <Navbar></Navbar>
        <div className='ml-28'>
        <PostFeature></PostFeature>
        </div>
       </div>
    );
};

export default Home;