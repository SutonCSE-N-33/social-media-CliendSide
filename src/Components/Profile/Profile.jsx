import React from 'react';
import Navbar from '../Home/Navbar/Navbar';
import ProfilePostFeature from './ProfilePostFeature';

const Profile = () => {
    
    return (
        <div>
       <Navbar></Navbar>
    
        <div className='ml-28'>
        <ProfilePostFeature></ProfilePostFeature>
        </div>
       </div>
    );
};

export default Profile;