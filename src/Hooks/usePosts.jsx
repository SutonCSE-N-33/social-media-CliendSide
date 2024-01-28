import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
const usePosts = () => {
    // const [posts, setPosts] = useState([])
    // const [loading, setLoading] = useState(true)
    // console.log('post',posts)
    // const getPosts = () =>{
    //     fetch(
    //       "https://social-platform-y209.onrender.com/post/?format=json"
    //     )
    //     .then(res => res?.json())
    //     .then(data => {
    //       setPosts(data);
    //       setLoading(false);
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //     });
    //   }
    //   return { posts, getPosts, loading };

    const {
      isLoaded,
      error,
      data: posts = [],
      refetch,
    } = useQuery({
      queryKey: ["AllPosts"],
      queryFn: () =>
        fetch(
          "https://social-platform-y209.onrender.com/post/?format=json"
        ).then(res => res?.json()),
    });

    return { posts, refetch, isLoaded};
};

export default usePosts;