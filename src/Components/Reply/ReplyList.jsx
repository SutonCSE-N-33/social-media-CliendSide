import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import EditReply from './EditReply';
const ReplyList = ({reply,getReply}) => {
    const [modalIsOpen, setIsOpen] = useState(false);

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

    
    return (
        <div className='px-6'>
        <div className='mt-3 bg-gray-400 rounded p-2'>
        <h2 className='text-white font-bold'>{reply.user_name}</h2>
        <p className='text-white'>{reply.content}</p>

        <div className='flex mt-3'>
           <button onClick={openMadal} className='px-4 text-white bg-blue-500'>Edit</button>
           <button onClick={delateReply} className='ml-3 text-white bg-red-500 px-4'>Delete</button>
        </div>
     </div>
   <EditReply modalIsOpen={modalIsOpen} reply={reply} closeModal={closeModal} getReply={getReply} />
        </div>
    );
};

export default ReplyList;