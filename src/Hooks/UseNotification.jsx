import React, { useEffect, useState } from 'react';
import axios from "axios";
import useNotificationCount from './useNotificationCount';

const UseNotification = () => {
    const [countNotification, setCountNotification] = useState({
      count:0,
      post_author: '',
    })
  
    const {notificationCount, refetch }= useNotificationCount()
    
    const handleSpecificCounting = (author) =>{
          const filteringSpecificCounting = notificationCount.filter((data)=> data.post_author === author) ;
          const newCounting =filteringSpecificCounting[filteringSpecificCounting.length-1] !== undefined ? filteringSpecificCounting[filteringSpecificCounting.length-1].count : 0;
          countNotification.count=newCounting;
          countNotification.post_author='hello';
          setCountNotification(countNotification)
    }
    
    
    // const [notifications, setNotifications] = useState([])
    // const [notificationLoading, setNotificationLoading] = useState(true)
    // const reversedNotifications = [...notifications].reverse()
    // const userId = localStorage.getItem("user_id");
    // const filteringNotification = reversedNotifications.filter((notification)=> parseInt(notification.post_author) === parseInt(userId))
   

    // const getNotification = () =>{
    //     fetch(
    //       "https://social-platform-y209.onrender.com/notification/?format=json"
    //     )
    //     .then(res => res?.json())
    //     .then(data => {
    //       setNotifications(data)
    //       setNotificationLoading(false)
    //     })
    //     .catch(error => {
    //       console.error("Error:", error);
    //     });
    //   }

      const handleNotificationCount = () => {
        axios.post(
            "https://social-platform-y209.onrender.com/count_Notification/?format=json",
            countNotification,
            {}
          )
          .then(response => {
           
          })
          .catch(error => {
            console.error("An error occurred:", error);
          });
      }     


      useEffect(()=>{
        refetch();
      },[])
      



    return { countNotification, 
             handleNotificationCount,setCountNotification, handleSpecificCounting
            };
};

export default UseNotification;