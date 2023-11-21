import React, { useEffect, useState } from 'react';
import EditComment from './EditComment';
import toast from "react-hot-toast";
import axios from "axios";
import AddReply from '../Reply/AddReply';
import ReplyList from '../Reply/ReplyList';
const CommentList = ({comment,getComments,post}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [replyModalIsOpen, setReplyIsOpen] = useState(false);
    const [replyData,setReplyData] = useState([])

    const getReply = () => {
        fetch(
            "https://social-platform-y209.onrender.com/reply/?format=json"
          )
          .then(res => res?.json())
          .then(data => setReplyData(data))
          .catch(error => {
            console.error("Error:", error);
          });
    }
    useEffect(()=>{
        getReply()
    },[])

    const userId = localStorage.getItem('user_id')
    const commentWiseReply = replyData && replyData.filter( reply => reply.comment === parseInt(comment.id))
    const userWiseReply = commentWiseReply.filter(commentReply => commentReply.user === parseInt(userId))
    console.log(userWiseReply)

    const delateComment = () =>{
        axios
        .delete(`https://social-platform-y209.onrender.com/comment/${comment.id}/`)
        .then(res => {
          toast.success("Successfully Deleted Comment");
          getComments()
        });
    }

    function closeModal() {
        setIsOpen(false);
      }
  
      const openCommentEdittMadal =()=>{
        setIsOpen(true);
      }

      function closeReplyModal() {
        setReplyIsOpen(false);
      }
  
      const openReplyMadal =()=>{
        setReplyIsOpen(true);
      }
    return (
        <div className='px-6'>
        <div className='mt-3 bg-gray-400 rounded p-2'>
        <h2 className='text-white font-bold'>{comment.user_name}</h2>
        <p className='text-white'>{comment.content}</p>

        <div className='flex mt-3'>
           <button onClick={openCommentEdittMadal} className='px-4 text-white bg-blue-500'>Edit</button>
           <button onClick={delateComment} className='ml-3 text-white bg-red-500 px-4'>Delete</button>
           <button onClick={openReplyMadal} className='ml-3 text-white bg-yellow-500 px-4'>Reply</button>
        </div>

         <div>
         <h3 className='text-white mt-2'> {userWiseReply.length > 0 ? 'Reply: ' :''}</h3>
         {
            userWiseReply.length > 0 ? userWiseReply.map(reply => <ReplyList  key={reply.id} reply={reply}  getReply={ getReply} />) : ''
         }
         </div>
     </div>
     <EditComment modalIsOpen={modalIsOpen} comment={comment} closeModal={closeModal} getComments={getComments} />
     <AddReply replyModalIsOpen={replyModalIsOpen} commentId={comment.id} postId ={post.id} getReply={getReply} closeReplyModal={closeReplyModal} />
        </div>
    );
};

export default CommentList;