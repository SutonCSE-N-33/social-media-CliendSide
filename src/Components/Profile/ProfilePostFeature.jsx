import React, { useEffect, useState } from 'react';
import axios from "axios";
import AddComment from '../Comment/AddComment';
import ProfileSimplePost from './ProfileSimplePost';

const ProfilePostFeature = () => {
    const [posts, setPosts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [postId,setPostId] = useState()
    const [comments, setComments] = useState([])
    const [reacts, setReacts] = useState([])
    const userId = localStorage.getItem("user_id");
    const profilePost = posts && posts.filter(post => post.user === parseInt(userId))

    const getPost = () => {
        fetch(
            "https://social-platform-y209.onrender.com/post/?format=json"
          )
          .then(res => res?.json())
          .then(data => setPosts(data))
          .catch(error => {
            console.error("Error:", error);
          });
    }

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
       getPost()
       getComments();
        getReacts();
    },[])


    function closeModal() {
      setIsOpen(false);
    }

    const openCommentMadal =(id)=>{
        setIsOpen(true);
        setPostId(id)
    }


    const handleReact = (postId,reactName) =>{
      const user_name = localStorage.getItem('name')

                  const comment = {
                    user_name: user_name,
                    type: reactName,
                    user: userId,
                    post: postId
                  };
                  
                  axios.post(
                      "https://social-platform-y209.onrender.com/react/?format=json",
                      comment,
                      {}
                    )
                    .then(response => {
                      getReacts();
                    })
                    .catch(error => {
                      console.error("An error occurred:", error);
                    });
    }


   
    const name = localStorage.getItem('name')
    return (
        <div className='ml-96 mt-24'>
        <h3 className='text-2xl ml-20 text-black'>Hey,I'm {name}</h3>
           {
            profilePost.length > 0 ? profilePost.map((post,index)=> <ProfileSimplePost post={post} key={index} openCommentMadal={openCommentMadal} handleReact={handleReact} getPost={getPost} comments={comments} reacts={reacts} getComments={getComments} getReacts={getReacts} />) : <p className="ml-32 mt-10">I hove no Post yet</p> 
           }
           <AddComment modalIsOpen={modalIsOpen} postId={postId} closeModal={closeModal} getComments={getComments} />
        </div>
    );
};

export default ProfilePostFeature;