import React, { useState } from 'react';

const usePosts = () => {
    const [posts, setPosts] = useState([])
    console.log(posts)
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
   
      return { posts, getPosts };
};

export default usePosts;