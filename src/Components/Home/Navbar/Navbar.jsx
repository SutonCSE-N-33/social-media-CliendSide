import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddPost from '../PostFeature/AddPost';
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    navigate("/login");
  };


  const handleReset =() =>{
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("user_id");
    const apiUrl = `https://social-platform-y209.onrender.com/alluser/delete/${id}`;
    const axios_instance = axios.create({
      headers: {
        Authorization: `token ${token}`,
      },
    });
    axios_instance
      .delete(apiUrl)
      .then(response => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("name");
        navigate("/login");
        toast.success("Successfully Remove User!");
      })
      .catch(error => {
        console.error(error);
        toast.success("failed to Remove User!");
        // setIsLoaded(true);
      });
  }


    return (
        <div>
            
<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
<Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Social-Platform</span>
</Link>
<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <Link onClick={handleReset} type="button" className="text-white mr-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset</Link>
    <Link onClick={handleLogOut} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
  </button>
</div>
<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
  <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li>
      <Link to='/' className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
    </li>
    <li>
      <a onClick={openModal} className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Post</a>
    </li>
    <li>
      <Link to='/profile' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</Link>
    </li>
  </ul>
</div>
</div>
</nav>
     <AddPost modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </div>
    );
};

export default Navbar;