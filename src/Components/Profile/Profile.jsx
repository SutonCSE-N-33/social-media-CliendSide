import React from 'react';
import Navbar from '../Home/Navbar/Navbar';
import ProfilePostFeature from './ProfilePostFeature';
import ResponsiveNavbar from '../Home/Navbar/ResponsiveNavbar';

const Profile = () => {
    
    return (
        <div>
       <Navbar></Navbar>
       <div className='block sm:block md:hidden lg:hidden '>
         <ResponsiveNavbar></ResponsiveNavbar>
       </div>
        <div className='sm:ml-5 md:ml-28'>
        <ProfilePostFeature></ProfilePostFeature>
        </div>
       </div>
    );
};

export default Profile;