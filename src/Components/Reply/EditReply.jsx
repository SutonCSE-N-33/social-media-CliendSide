import React from 'react';
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
const EditReply = ({modalIsOpen,closeModal, reply, getReply, profile}) => {
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();

      const onSubmit = data => {

        const userId = localStorage.getItem("user_id");
        const user_name = profile.user && profile.user.first_name + ' ' + profile.user.last_name;

                    const editReply = {
                      user_name: user_name,
                      content: data.content,
                      user: userId,
                      post: reply.post,
                      comment: reply.comment,
                      profile_avatar: reply.profile_avatar
                    };
                    
                    axios.put(
                        `https://social-platform-y209.onrender.com/reply/${reply.id}/`,
                        editReply
                      )
                      .then(response => {
                        reset();
                        closeModal();
                        getReply()
                        navigate('/')
                        toast.success("Successfully Edited!");
                      })
                      .catch(error => {
                        console.error("An error occurred:", error);
                        toast.error("Failed to Add a Property!");
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
            defaultValue={reply.content}
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
                Edit Reply
              </button>
            </div>
          </form>
        </div>
      </div>
        </Modal>
        </div>
    );
};

export default EditReply;