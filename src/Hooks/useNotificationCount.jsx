import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";

const useNotificationCount = () => {
    // const [notificationCount, setNotificationCount] = useState([])
    // const getNotificationCount = () =>{
    //     fetch(
    //       "https://social-platform-y209.onrender.com/count_Notification/?format=json"
    //     )
    //     .then(res => res?.json())
    //     .then(data => {
    //         setNotificationCount(data)

    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //     });
    //   }
    //   return {getNotificationCount, notificationCount, setNotificationCount}

    const {
      isLoaded,
      error,
      data: notificationCount = [],
      refetch,
    } = useQuery({
      queryKey: ["AllNotificationCount"],
      queryFn: () =>
        fetch(
          "https://social-platform-y209.onrender.com/count_Notification/?format=json"
        ).then(res => res?.json()),
    });
    return {notificationCount, refetch };


    
};

export default useNotificationCount;