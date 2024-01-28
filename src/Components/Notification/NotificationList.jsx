import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import UseNotification from '../../Hooks/UseNotification';
import useNotificationCount from '../../Hooks/useNotificationCount';
import Navbar from '../Home/Navbar/Navbar';
import PostDetails from '../Home/PostFeature/PostDetails';
import axios from "axios";
import Loader from '../Loader/Loader';
import ResponsiveNavbar from '../Home/Navbar/ResponsiveNavbar';
import useGetNotification from '../../Hooks/useGetNotification';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(10%, -60%)',
    },
  };
  Modal.setAppElement('#root');
const NotificationList = () => {
    const {filteringNotification, refetch, notifications, isLoaded } = useGetNotification()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [simplePost, setSimplePost] = useState({})
    useEffect(()=>{
        refetch();
    },[] )

    function closeModal() {
      setIsOpen(false);
    }

    const handleNotification = (updateNotification) =>{
    const id = updateNotification.id;
      const notification = {
        user_name: updateNotification.user_name,
        user: updateNotification.user,
        reply: updateNotification.reply,
        react: updateNotification.react,
        background: false,
        post: updateNotification.post,
        comment: updateNotification.comment,
        post_author:updateNotification.post_author
      }; 
      axios.put(
          "https://social-platform-y209.onrender.com/notification/"+id+"/?format=json",
          notification,
          {}
        )
        .then(response => {
          refetch();
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });
    }

   const getSimplePost = (notification)=> {
    const postId = parseInt(notification.post)
    handleNotification(notification)
      fetch(
        "https://social-platform-y209.onrender.com/postDetails/"+postId+"/?format=json"
      )
      .then(res => res?.json())
      .then(data => {
        setSimplePost(data)
        setIsOpen(true);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
    const userId = localStorage.getItem('user_id')

    
    return (
        <div>
        <Navbar></Navbar>
        <div className='block sm:block md:hidden lg:hidden '>
         <ResponsiveNavbar></ResponsiveNavbar>
       </div>
           <div className=''>
           {
            !isLoaded ? (<div className=''>
            <div className='-ml-60 sm:-ml-24 md:ml-60 mt-24 md:mt-20'>
            <div >
            {
              filteringNotification.length > 0 ? (filteringNotification.map((notification) => (
                <div onClick={()=>getSimplePost(notification)} id={notification.id} className={notification.background === true ? "bg-gray-400 cursor-pointer max-w-sm ml-60 py-3 mb-1 px-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" : "bg-white cursor-pointer max-w-sm ml-60 py-3 mb-1 px-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
                <div className=''>
                <div className='flex'>
                <div className="flex"> 
                  <img className='size-12 rounded-full' src={notification.profile_avatar !== null ? notification.profile_avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"}  alt="" />
                  {notification.user === parseInt(userId) ? <div style={{width:'10px',height:'10px',background:'green'}} className='p-2 -ml-2  rounded-full'></div>: ''}
                </div>
              <p className="mb-1 ml-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{notification.user_name.toUpperCase()} <span className="mb-1 text-sm font-normal  tracking-tight text-gray-900 dark:text-white">{notification.comment !== null ? 'Commented On Your Post': 'Reacted to Your Post'}</span> </p>     
              </div>
                    <p className="mb-1 tracking-tight text-blue-900 dark:text-white">{notification.create_time.slice(0, 10)}</p>
                </div>
                </div>
                )) ) : (<div className=" sm:text-center md:text-center"><p className='text-2xl ml-72 mt-3 sm:-ml-60 md:-ml-60'>You have no Notification</p></div>)
             }
            </div>
              </div>
            <PostDetails closeModal={closeModal} simplePost={simplePost} modalIsOpen={modalIsOpen} ></PostDetails>)
            </div>) : (
              <Loader></Loader>
            )
           }
           </div>
        </div>
    );
};

export default NotificationList;