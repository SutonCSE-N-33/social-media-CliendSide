import React, { useEffect, useState } from 'react';
import AddComment from '../../Comment/AddComment';
import SimplePost from './SimplePost';
import axios from "axios";
import usePosts from '../../../Hooks/usePosts';
import useNotificationCount from '../../../Hooks/useNotificationCount';
import UseNotification from '../../../Hooks/UseNotification';
import useUserProfile from '../../../Hooks/useUserProfile';
import Loader from '../../Loader/Loader';



const PostFeature = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { posts, isLoaded} = usePosts();
    const {profile} = useUserProfile()
    const {refetch} =useNotificationCount()
    const [postId,setPostId] = useState()
    const [postAuthor, setPostAuthor] = useState()
    const [comments, setComments] = useState([])
    const [reacts, setReacts] = useState([])
    const {countNotification, setCountNotification, handleNotificationCount,handleSpecificCounting} = UseNotification()
    let [limit, setLimit] = useState(0)
    const reveresedArray =[...posts].reverse()
  
    
    
    

    const getComments = () => {
      fetch(
          "https://social-platform-y209.onrender.com/comment/?format=json"
        )
        .then(res => res?.json())
        .then(data => setComments(data))
        .catch(error => {
          console.error("Error:", error);
        });
  }

  const getReacts = () => {
      fetch(
          "https://social-platform-y209.onrender.com/react/?format=json"
        )
        .then(res => res?.json())
        .then(data => setReacts(data))
        .catch(error => {
          console.error("Error:", error);
        });
  }


  
  useEffect(()=>{
      // getPosts();
      refetch();
      getComments();
      getReacts();
      // getProfile();
  },[])


    function closeModal() {
      setIsOpen(false);
    }

    const openCommentMadal =(id,author)=>{
        setIsOpen(true);
        setPostId(id)
        setPostAuthor(author)
    }



    const handleNotification = (r_id,user_name, userId, author,pId) =>{
     
      const notification = {
        user_name: user_name,
        user: userId,
        reply: null,
        react: r_id,
        post: pId,
        comment: null,
        post_author: author,
        background:true,
        profile_avatar: profile.profile_avatar
      }; 
      console.log('notification',notification)
     
      axios.post(
          "https://social-platform-y209.onrender.com/notification/?format=json",
          notification,
          {}
        )
        .then(response => {
          
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });
    }


    const handleReact = (pId,reactName,author) =>{
        limit++;
        setLimit(limit)
        if(limit == 1)
        {
          handleSpecificCounting(author)
          countNotification.count++;
          countNotification.post_author = author
          setCountNotification(countNotification)
        }else{
          countNotification.count++;
          countNotification.post_author = author
          setCountNotification(countNotification)
        }

      const userId = localStorage.getItem("user_id");
      const user_name = profile.user && profile.user.first_name + ' ' + profile.user.last_name;

                  const comment = {
                    user_name: user_name,
                    type: reactName,
                    user: userId,
                    post: pId
                  };
                  
                  axios.post(
                      "https://social-platform-y209.onrender.com/react/?format=json",
                      comment,
                      {}
                    )
                    .then(response => {
                       handleNotification(response.data.id, user_name, userId, author,pId)
                       handleNotificationCount()
                       getReacts();
                       refetch();
                    })
                    .catch(error => {
                      console.error("An error occurred:", error);
                    });
    }


   

    return (
        <div>
        {
          !isLoaded ? (<div className='ml-0  sm:ml-16 md:ml-96 mt-24'>
          {
           reveresedArray && reveresedArray.map((post,index)=> <SimplePost post={post} key={index} openCommentMadal={openCommentMadal} handleReact={handleReact} comments={comments} reacts={reacts} getComments={getComments} profile={profile} getReacts={getReacts} />)
          }
          <AddComment modalIsOpen={modalIsOpen} postId={postId} postAuthor={postAuthor} profile={profile} closeModal={closeModal} getComments={getComments} />
       </div>) : (<Loader></Loader>)
        }
        </div>
    );
};

export default PostFeature;