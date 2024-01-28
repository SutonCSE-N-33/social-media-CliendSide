import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import EditReply from './EditReply';
import useUserProfile from '../../Hooks/useUserProfile';
const ReplyList = ({reply,getReply}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const {profile,getProfile} = useUserProfile()
   
    function closeModal() {
        setIsOpen(false);
      }

      const openMadal =()=>{
        setIsOpen(true);
      }
    
    const delateReply = () =>{
        axios
        .delete(`https://social-platform-y209.onrender.com/reply/${reply.id}/`)
        .then(res => {
          toast.success("Successfully Deleted");
          getReply()
        });
    }

    useEffect(()=>{
      getProfile();
    },[])

    
    return (
        <div className='px-6'>
        <div className='mt-3 bg-gray-400 rounded p-2'>
        <div className="flex">
        <img className='size-12 rounded-full' src={reply.profile_avatar !== null ? reply.profile_avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"}  alt="" />
        <h2 className='text-white ml-3 mt-2 font-semibold'>{reply.user_name}</h2>
        </div>
        <p className='text-white'>{reply.content}</p>

        <div className='flex mt-3'>
           <button onClick={openMadal} className='px-4 text-white bg-blue-500'>Edit</button>
           <button onClick={delateReply} className='ml-3 text-white bg-red-500 px-4'>Delete</button>
        </div>
     </div>
   <EditReply modalIsOpen={modalIsOpen} reply={reply} profile={profile} closeModal={closeModal} getReply={getReply} />
        </div>
    );
};

export default ReplyList;