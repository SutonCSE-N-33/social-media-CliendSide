import React from 'react';
import { useQuery } from "@tanstack/react-query";
const useGetNotification = () => {

    const {
        isLoaded,
        error,
        data: notifications = [],
        refetch,
      } = useQuery({
        queryKey: ["AllNotification"],
        queryFn: () =>
          fetch(
            "https://social-platform-y209.onrender.com/notification/?format=json"
          ).then(res => res?.json()),
      });
      

    const reversedNotifications = [...notifications].reverse()
    const userId = localStorage.getItem("user_id");
    const filteringNotification = reversedNotifications.filter((notification)=> parseInt(notification.post_author) === parseInt(userId))

    return {filteringNotification, refetch, notifications, isLoaded };



};

export default useGetNotification;