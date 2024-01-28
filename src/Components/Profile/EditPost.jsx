import React, { useState } from 'react';
import Modal from 'react-modal';
import '../Home/PostFeature/modal.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
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
const EditPost = ({modalIsOpen,closeModal, post, refetch, profile}) => {
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();

      const handleImage = () =>{
        const fileInput = document.querySelector('.edit-file-input')
        fileInput.click()
        fileInput.onchange = ({target}) => {
         const file = target.files[0]
         const formData = new FormData();
         formData.append("image", file);
 
         fetch(
           "https://api.imgbb.com/1/upload?key=212e3038d6bf0bd9d01b3aa24708a377",
           {
             method: "POST",
             body: formData,
           }
         )
           .then(res => res.json())
           .then(result => {
            const editPost = {
              user_name: post.user_name,
              content: post.content,
              img_url: result.data.url,
              user: post.user,
              profile_avatar: post.profile_avatar
            };
            axios.put(
                `https://social-platform-y209.onrender.com/post/${post.id}/`,
                editPost
              )
              .then(response => {
                refetch();
              })
              .catch(error => {
                toast.error("Failed to add image!");
              });
                   })
           .catch(error => {
             console.error("Error:", error);
           });
       }
        
       }

      const onSubmit = data => {
        const userId = localStorage.getItem("user_id");
        const user_name = profile.user && profile.user.first_name + ' ' + profile.user.last_name;
        
                    const editPost = {
                      user_name: user_name,
                      content: data.content,
                      img_url: post.img_url,
                      user: userId,
                      profile_avatar: post.profile_avatar
                    };
                
                    axios.put(
                        `https://social-platform-y209.onrender.com/post/${post.id}/`,
                        editPost
                      )
                      .then(response => {
                        reset();
                        closeModal();
                        refetch();
                        navigate('/profile');
                        toast.success("Edited Successfully!");
                      })
                      .catch(error => {
                        console.error("An error occurred:", error);
                        toast.error("Failed to Edit a Post!");
                      });
      };

    return (
        <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          className="edit-post-modal"
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
            defaultValue={post.content}
            {...register("content", {
              required: true,
            })}
            aria-invalid={errors.title ? "true" : "false"}
          ></textarea>


          <div>
            <img onClick={handleImage} className='size-36 cursor-pointe mt-3 ml-7 cursor-pointer' src={post.img_url} alt="" />
            <input
            type="file"
            className="rounded edit-file-input" hidden
            aria-invalid={errors.img ? "true" : "false"}
            {...register("img")}
            accept=".png, .jpg, .jpeg"
          />
          </div>
        </div>

            <div className="mb-1 text-center">
              <button
                className=" px-12 mt-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit Post
              </button>
            </div>
          </form>
        </div>
      </div>
        </Modal>
        </div>
    );
};

export default EditPost ;