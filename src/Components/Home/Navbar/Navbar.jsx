import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AddPost from '../PostFeature/AddPost';
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillBell } from "react-icons/ai";
import NotificationList from '../../Notification/NotificationList';
import UseNotification from '../../../Hooks/UseNotification';
import useNotificationCount from '../../../Hooks/useNotificationCount';
import useUserProfile from '../../../Hooks/useUserProfile';
import { AiFillHome } from "react-icons/ai";
const Navbar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationIsOpen] = useState(false);
  const {filteringNotification,countNotification, setCountNotification,handleNotificationCount} = UseNotification()
  const {notificationCount, refetch} = useNotificationCount()
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

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    navigate("/login");
  };


  


    return (
        <div>
            
<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
<Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Social-Platform</span>
</Link>
<div className="flex md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">

    <Link onClick={handleLogOut} type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
    
</div>
<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
  <ul className="flex flex-col md:-ml-28 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li>
      <NavLink to='/' className = {(navInfo) => (navInfo.isActive ?"block md:ml-5 py-2 px-3 rounded md:bg-transparent text-blue-600 md:p-0 md:dark:text-blue-500":"block md:ml-5 py-2 px-3 rounded md:bg-transparent text-gray-900 md:p-0 md:dark:text-blue-500" )} ><AiFillHome className="mt-1 text-2xl" /></NavLink>
    </li>
    <li>
      <a onClick={openModal} className="block md:ml-6 cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Post</a>
    </li>
    <li>
      <NavLink to='/notification' onClick={handleNotificationBar} className={(navInfo) => (navInfo.isActive ?"flex mt-2 md:ml-6 py-2 px-3 text-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 cursor-pointer" :"flex mt-2 md:ml-6 py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 cursor-pointer")} ><AiFillBell className="text-2xl" /> <span className='text-red -mt-3'>{newCounting !==0 ? newCounting : ''}</span> </NavLink>
    </li>
    <li>
      <NavLink to='/profile' className={(navInfo) => (navInfo.isActive ? "block md:ml-6 py-2 px-3 text-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" : "block md:ml-6 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0")}>Profile</NavLink>
    </li>
  </ul>
</div>
</div>
</nav>
     <AddPost modalIsOpen={modalIsOpen} closeModal={closeModal} profile={profile} />
   </div>
    );
};

export default Navbar;