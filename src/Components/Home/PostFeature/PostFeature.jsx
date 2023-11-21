import React, { useEffect, useState } from 'react';
import AddComment from '../../Comment/AddComment';
import SimplePost from './SimplePost';
import axios from "axios";

const PostFeature = () => {
    const [posts, setPosts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [postId,setPostId] = useState()
    const [comments, setComments] = useState([])
    const [reacts, setReacts] = useState([])
    const reveresedArray =[...posts].reverse()
    

    const getPosts = () =>{
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
      getPosts()
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
      const userId = localStorage.getItem("user_id");
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


   

    return (
        <div className='ml-96 mt-24'>
           {
            reveresedArray && reveresedArray.map((post,index)=> <SimplePost post={post} key={index} openCommentMadal={openCommentMadal} handleReact={handleReact} comments={comments} reacts={reacts} getComments={getComments} getReacts={getReacts} />)
           }
           <AddComment modalIsOpen={modalIsOpen} postId={postId} closeModal={closeModal} getComments={getComments} />
        </div>
    );
};

export default PostFeature;