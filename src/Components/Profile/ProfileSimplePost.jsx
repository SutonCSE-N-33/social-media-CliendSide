import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiFillMessage, AiFillLike, AiOutlineMore} from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import EditPost from './EditPost';
const ProfileSimplePost = ({post,openCommentMadal,handleReact,refetch,comments,reacts,getComments, getReacts,profile}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    
    

    const commentOfPost = comments && comments.filter((comment)=> comment.post === post.id)
    const reversedComments = [...commentOfPost].reverse();
    const oneComment = reversedComments[0]


    const userId = localStorage.getItem('user_id')
    const postWiseReact = reacts && reacts.filter( react => react.post === parseInt(post.id))
    console.log('react,',post.id,postWiseReact)
    const userWiseReact = postWiseReact.filter(postReact => postReact.user === parseInt(userId))
    

    const delateReact = (id) =>{
        axios
        .delete(`https://social-platform-y209.onrender.com/react/${id}/`)
        .then(res => {
          toast.success("Successfully Dislike");
          getReacts();
        });
    }


    function closeModal() {
        setIsOpen(false);
      }
   
    const openEditMadal =()=>{
        setIsOpen(true);
    }

    const delatePost = () =>{
        axios
        .delete(`https://social-platform-y209.onrender.com/post/${post.id}/`)
        .then(res => {
          toast.success("Successfully Deleted This Post");
          refetch()
        });
    }
    
    
    return (
        <div className="max-w-sm mt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                <div className='flex'>
                <div className="flex"> 
                  <img className='size-12 rounded-full' src={post.profile_avatar !== null ? post.profile_avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"}  alt="" />
                  <div style={{width:'10px',height:'10px',background:'green'}} className='p-2 -ml-2  rounded-full'></div>
              </div>
                  <h5 className="mb-2 text-2xl font-semibold ml-3 tracking-tight text-gray-900 dark:text-white">{post.user_name.toUpperCase()}</h5>
              </div>
                    <p className="mb-2 mt-2 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
                    
                    <div className='flex justify-between mt-9'>
                        <button onClick={openEditMadal} className='py-1 bg-blue-600 text-1xl text-white px-6'>Edit</button>
                        <button onClick={delatePost} className='py-1 bg-red-600 text-white px-6'>Delete</button>
                    </div>
                </div>
                <a href="#">
                    <img className="" style={{width:"500px",height:"400px"}} src={post.img_url} alt="" />
                </a>

               <div className='px-2 mt-3'>
               <div className='flex justify-between border-b-2 border-black-500'>
               <div>{postWiseReact.length} Reacts</div>
               <div className='flex'><span style={{transform:'translateX(1px)'}} className='tex-2xl -mt-2 ml-2 text-blue-500 font-bold'>{reversedComments.length}</span><AiOutlineComment className='text-black'/> </div>
              </div>
               </div>

               <div className='px-3'>
               <div className='flex justify-between py-3 border-b-2 border-black-500'>
               {userWiseReact.length > 0 ? (<div onClick={()=>delateReact(userWiseReact[0].id)} className='flex cursor-pointer'><AiFillLike className='mt-1 text-blue-400' /> <span className='ml-1'>Like</span></div> )
               : (<div onClick={()=>handleReact(post.id,'like')} className='flex cursor-pointer'><AiFillLike className='mt-1' /> <span className='ml-1'>Like</span></div>)
               }
               <div className='flex' onClick={()=>openCommentMadal(post.id)}> <AiFillMessage className='mt-1' /> <span className='ml-1'>Comment</span></div>
              </div>
               </div>

               { oneComment ? <div className='px-3'>
               <h3>Comments</h3>
               <div className='mt-3 bg-gray-400 rounded p-2'>
                  <h2 className='text-white font-bold'>{oneComment.user_name}</h2>
                  <p className='text-white'>{oneComment.content}</p>
               </div>
               <p className='cursor-pointer'>See All Comments......</p>
              </div> : ''}

              <EditPost modalIsOpen={modalIsOpen} post={post} closeModal={closeModal} refetch={refetch} profile={profile} />
            </div>
    );
};

export default ProfileSimplePost;