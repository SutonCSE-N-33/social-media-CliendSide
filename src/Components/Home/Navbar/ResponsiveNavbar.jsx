import React, { useEffect, useState } from 'react';
import { Link,NavLink, useNavigate } from 'react-router-dom';
import AddPost from '../PostFeature/AddPost';
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillBell } from "react-icons/ai";
import NotificationList from '../../Notification/NotificationList';
import UseNotification from '../../../Hooks/UseNotification';
import useNotificationCount from '../../../Hooks/useNotificationCount';
import useUserProfile from '../../../Hooks/useUserProfile';
import { AiFillHome } from "react-icons/ai";
const ResponsiveNavbar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationIsOpen] = useState(false);
  const {filteringNotification,countNotification, setCountNotification,handleNotificationCount} = UseNotification()
  const {notificationCount, refetch } = useNotificationCount()
  const {profile} = useUserProfile()

 

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(()=>{
    refetch();
    // getProfile();
  },[])


  const userId = localStorage.getItem("user_id")
  const filteringSpecificCounting = notificationCount.filter((data)=> data.post_author === parseInt(userId)) ;
  const newCounting =filteringSpecificCounting[filteringSpecificCounting.length-1] !== undefined ? filteringSpecificCounting[filteringSpecificCounting.length-1].count : 0;
  function handleNotificationBar() {
    if(newCounting === 0){
      setNotificationIsOpen(true);
    }else{
      countNotification.count = 0;
      countNotification.post_author = parseInt(userId);
      setCountNotification(countNotification);
      handleNotificationCount();
      // getNotification();
    }
  }

    return (
        <div>
            
<nav className="bg-white -mt-8 dark:bg-gray-900 fixed w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
  <ul className="flex items-center ml-6 sm:ml-36 justify-center p-0 font-medium  space-x-8 rtl:space-x-reverse flex-row  border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li>
      <NavLink to='/' className={(navInfo) => (navInfo.isActive ?"block py-2 px-2 text-blue-700 rounded":"block py-2 px-2 text-black rounded")}><AiFillHome className="mt-1 text-1xl" /></NavLink>
    </li>
    <li>
      <a onClick={openModal} className="block cursor-pointer py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Post</a>
    </li>
    <li>
      <NavLink to='/notification' onClick={handleNotificationBar} className={(navInfo) => (navInfo.isActive ?"flex mt-2 py-2 px-2 text-blue-600 rounded hover:bg-gray-100 cursor-pointer" :"flex mt-2 py-2 px-2 text-gray-900 rounded hover:bg-gray-100 cursor-pointer")}><AiFillBell className="text-1xl" /> <span className='text-red -mt-3'>{newCounting !==0 ? newCounting : ''}</span> </NavLink>
    </li>
    <li>
      <NavLink to='/profile' className={(navInfo) => (navInfo.isActive ? "block py-2 px-2 text-blue-600 rounded hover:bg-gray-100 ":"block py-2 px-2 text-gray-900 rounded hover:bg-gray-100")}>Profile</NavLink>
    </li>
  </ul>
</div>
</nav>
     <AddPost modalIsOpen={modalIsOpen} closeModal={closeModal} profile={profile} />
   </div>
    );
};

export default ResponsiveNavbar;