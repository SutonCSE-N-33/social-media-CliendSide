import React, { useEffect, useState } from 'react';
import axios from "axios";
import AddComment from '../Comment/AddComment';
import ProfileSimplePost from './ProfileSimplePost';
import EditProfile from './EditProfile';
import useUserProfile from '../../Hooks/useUserProfile';
import Loader from '../Loader/Loader';
import usePosts from '../../Hooks/usePosts';

const ProfilePostFeature = () => {
    const {posts, refetch, isLoaded} = usePosts();
    const {profile, setProfile, profileLoading} = useUserProfile()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [profileModalIsOpen, profileSetIsOpen] = useState(false);
    const [postId,setPostId] = useState()
    const [comments, setComments] = useState([])
    const [reacts, setReacts] = useState([])
    const userId = localStorage.getItem("user_id");
    const profilePost = posts && posts.filter(post => post.user === parseInt(userId))
  

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
       refetch();
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

    function openProfileModel(){
      profileSetIsOpen(true)
    }
    function closeProfileModel(){
      profileSetIsOpen(false)
    }
    const name = localStorage.getItem('name')
    return (
        <div className=''>
          {
            profileLoading ? (<Loader></Loader>) : ( <div className=' sm:ml-32 md:ml-96 mt-24'>
            <div className= 'flex w-50'>
            <div>
            <div className="w-26 flex mt-6 md:mt-0"> 
                       <img className='rounded-full ml-6 md:ml-9'style={{width:'100px',height:'100px'}} src={profile.profile_avatar !== null ? profile.profile_avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"}  alt="" />
                       <div style={{width:'10px',height:'10px',background:'green'}} className='p-2 -ml-3 mt-3 rounded-full'></div>
            </div>
            <button onClick={openProfileModel}  className='py-1 ml-6 md:ml-9 mt-3 bg-blue-300 text-sm text-white px-2'>Update Profile</button>
            </div>
            <div className="w-25 mt-6 md:mt-0">
             <p className='ml-12 text-black'><span className='text-lg font-semibold'>Name: </span>{profile.user !== undefined && profile.user.first_name.toUpperCase()} {profile.user !== undefined && profile.user.last_name.toUpperCase()}</p>
             <p className='ml-12 text-black'><span className='text-lg font-semibold'>Address: </span> {profile.address}</p>
             <p className='ml-12 text-black'><span className='text-lg font-semibold'>BirthDate: </span> {profile.date_of_birth}</p>
             <p className='ml-12 text-black'><span className='text-lg font-semibold'>Gender: </span> {profile.gender}</p>
            </div>
          </div>
          
         
             {
              profilePost.length > 0 ? profilePost.map((post,index)=> <ProfileSimplePost post={post} key={index} openCommentMadal={openCommentMadal} handleReact={handleReact} comments={comments} reacts={reacts} getComments={getComments} getReacts={getReacts} profile={profile} refetch={refetch} />) : <p className="ml-32 font-bold mt-10">You hove no Post yet</p> 
             }
             <AddComment modalIsOpen={modalIsOpen} postId={postId} profile={profile} closeModal={closeModal} getComments={getComments} />
             <EditProfile profileModalIsOpen={profileModalIsOpen} profile={profile} setProfile={setProfile} closeProfileModel={closeProfileModel} />
          </div>)
          }
        </div>
    );
};

export default ProfilePostFeature;