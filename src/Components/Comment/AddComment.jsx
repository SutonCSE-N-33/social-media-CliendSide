import React,{useState} from 'react';
import Modal from 'react-modal';
import '../Home/PostFeature/modal.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UseNotification from '../../Hooks/UseNotification';
import { AiOutlineClose } from "react-icons/ai";
import useNotificationCount from '../../Hooks/useNotificationCount';
const customStyles = {
    content: {
      // top: '50%',
      // left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');


const AddComment = ({modalIsOpen,closeModal, postId, getComments, postAuthor, profile}) => {
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();
      const {countNotification, setCountNotification, handleNotificationCount,handleSpecificCounting} = UseNotification()
      let [limit, setLimit] = useState(0)
      const {notificationCount, refetch} = useNotificationCount()

  const handleNotification = (c_id,user_name, userId) =>{
   
  const notification = {
    user_name: user_name,
    user: userId,
    reply: null,
    react: null,
    post: postId,
    comment: c_id,
    post_author: postAuthor,
    background:true,
    profile_avatar: profile.profile_avatar
  }; 
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

      
      const onSubmit = data => {
        limit++;
        setLimit(limit)
        if(limit == 1)
        {
          handleSpecificCounting(postAuthor)
          countNotification.count++;
          countNotification.post_author = postAuthor
          setCountNotification(countNotification)
          refetch();
        }else{
          countNotification.count++;
          countNotification.post_author = postAuthor
          setCountNotification(countNotification)
          refetch();
        }
        
        const userId = localStorage.getItem("user_id");
        const user_name = profile.user && profile.user.first_name + ' ' + profile.user.last_name;

                    const comment = {
                      user_name: user_name,
                      content: data.content,
                      user: userId,
                      post: postId,
                      profile_avatar: profile.profile_avatar
                    };
                  
                    axios.post(
                        "https://social-platform-y209.onrender.com/comment/?format=json",
                        comment,
                        {}
                      )
                      .then(response => {
                  
                        handleNotification(response.data.id,user_name,userId)
                        handleNotificationCount()
                        reset();
                        closeModal();
                        getComments();
                        // getNotification();
                        refetch();
                        navigate('/')
                        toast.success("Successfully Add a comment!");
                      })
                      .catch(error => {
                        console.error("An error occurred:", error);
                        toast.error("Failed to Add a comment!");
                      });
      };

    return (
        <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          className="content-modal"
        >
        <AiOutlineClose
        onClick={closeModal}
        className=" cursor-pointer bg-black rounded-full text-white font-bold text-4xl ml-64 -mt-5"
      />
        <div className="grid justify-center item-center">
        {/* Col */}
        <div className="w-full bg-white rounded-lg lg:rounded-l-none">
    
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-2 pb-2 mb-1 bg-white rounded"
          >
           
          <div className="mb-4 md:mb-0">
          <textarea
            className="md:w-12/12 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="cpntent"
            type="text"
            placeholder="Write your Comment"
            {...register("content", {
              required: true,
            })}
            aria-invalid={errors.title ? "true" : "false"}
          ></textarea>
        </div>

            <div className="mb-1 text-center">
              <button
                className=" px-12 mt-10 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>
      </div>
        </Modal>
        </div>
    );
};

export default AddComment;