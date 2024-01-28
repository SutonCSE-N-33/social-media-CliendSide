import React, { useEffect, useState } from 'react';
import axios from "axios";

const useUserProfile = () => {
    const [profile, setProfile] = useState({})
    const [profileLoading, setProfileLoading] = useState(true)
  
    const profile_id = localStorage.getItem('profile_id')
    const token = localStorage.getItem('token')
       
    
    useEffect(()=>{
      const apiUrl = `https://social-platform-y209.onrender.com/users/${profile_id}/?format=json`;
      const axios_instance = axios.create({
        headers: {
          Authorization: `token ${token}`,
        },
      });
      axios_instance
        .get(apiUrl)
        .then(response => {
          setProfile(response.data);
          setProfileLoading(false)
        })
        .catch(error => {
          // setIsLoaded(true);
        });
    },[profile])

    return {profile, profileLoading, setProfile}

};

export default useUserProfile;