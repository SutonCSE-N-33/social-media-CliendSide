import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiFillMessage, AiFillLike} from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import CommentList from '../../Comment/CommentList';


const SimplePost = ({post,openCommentMadal,handleReact,comments,reacts,getComments,getReacts,profile}) => {
    
    const [lookingComments,setLookingComments] = useState(false)
    
   
    const commentOfPost = comments && comments.filter((comment)=> comment.post === post.id)
    const reversedComments = [...commentOfPost].reverse();
    const oneComment = reversedComments[0]


    const userId = localStorage.getItem('user_id')
    const postWiseReact = reacts && reacts.filter( react => react.post === parseInt(post.id))
    const userWiseReact = postWiseReact.filter(postReact => postReact.user === parseInt(userId))
    
    const delateReact = (id) =>{
        axios
        .delete(`https://social-platform-y209.onrender.com/react/${id}/`)
        .then(res => {
          toast.success("Successfully Dislike");
          getReacts()
        });
    }
    
    return (
        <div className="max-w-sm mt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                    <div className='flex'>
                      <div className="flex"> 
                        <img className='size-12 rounded-full' src={post.profile_avatar !== null ? post.profile_avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"}  alt="" />
                        {post.user === parseInt(userId) ? <div style={{width:'10px',height:'10px',background:'green'}} className='p-2 -ml-2  rounded-full'></div>: ''}
                    </div>
                        <h5 className="mb-2 text-2xl font-semibold ml-3 tracking-tight text-gray-900 dark:text-white">{post.user_name.toUpperCase()}</h5>
                    </div>
                    <p className="mb-2 mt-2 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
                    
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
               : (<div onClick={()=>handleReact(post.id,'like',post.user)} className='flex cursor-pointer'><AiFillLike className='mt-1' /> <span className='ml-1'>Like</span></div>)
               }
               <div className='flex cursor-pointer' onClick={()=>openCommentMadal(post.id, post.user)}> <AiFillMessage className='mt-1' /> <span className='ml-1'>Comment</span></div>
              </div>
               </div>

               { oneComment ? <div className='px-3'>
               <h3>Comments</h3>
               {lookingComments ? '' : <div className='mt-3 bg-gray-400 rounded p-2'>
               <h2 className='text-white font-bold'>{oneComment.user_name}</h2>
               <p className='text-white'>{oneComment.content}</p>
              </div>
              }
               {lookingComments ? <p onClick={()=>setLookingComments(false)} className='cursor-pointer'>Hide Comments</p> : <p onClick={()=>setLookingComments(true)} className='cursor-pointer'>See All Comments......</p>}
              </div> : ''}

              {
                lookingComments ? (<div style={{height:'200px'}} className='overflow-x-hidden'>
                {
                  reversedComments.map(comment => <CommentList key={comment.id} comment={comment} getComments={getComments} profile={profile} post={post} />)
                }
               </div>) : ''
              }
            </div>
    );
};

export default SimplePost;