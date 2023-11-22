import React from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import usePosts from '../../../Hooks/usePosts';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');
const AddPost = ({modalIsOpen,closeModal}) => {
  const {getPosts} = usePosts();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();

      const onSubmit = data => {
        const img = data.img[0];
        const userId = localStorage.getItem("user_id");
        const user_name = localStorage.getItem('name')
        const formData = new FormData();
        formData.append("image", img);
        fetch(
          "https://api.imgbb.com/1/upload?key=212e3038d6bf0bd9d01b3aa24708a377",
          {
            method: "POST",
            body: formData,
          }
        )
          .then(res => res.json())
          .then(result => {
                    const post = {
                      user_name: user_name,
                      content: data.content,
                      img_url: result.data.url,
                      user: userId,
                    };
                    console.log(post);
                    axios
                      .post(
                        "https://social-platform-y209.onrender.com/post/?format=json",
                        post,
                        {}
                      )
                      .then(response => {
                        reset();
                        getPosts();
                        closeModal();
                        navigate('/')
                        toast.success("Successfully Add a Post!");
                      })
                      .catch(error => {
                        console.error("An error occurred:", error);
                        toast.error("Failed to Add a Property!");
                      });
                  })
          .catch(error => {
            console.error("Error:", error);
          });
      };


      


    return (
        <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
        <div className="grid justify-center item-center">
        {/* Col */}
        <div className="w-full bg-white rounded-lg lg:rounded-l-none">
    
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-2 pb-2 mb-1 bg-white rounded"
          >
           
          <div className="mb-4 md:mb-0">
          <textarea
            className="md:w-10/12 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="cpntent"
            type="text"
            placeholder="What's On Your Mind, "
            {...register("content", {
              required: true,
            })}
            aria-invalid={errors.title ? "true" : "false"}
          ></textarea>
        </div>

        <div className="mt-6">
                <label
                  className="block mb-1 text-sm font-bold text-gray-700"
                  htmlFor="img"
                >
                  Select Image
                </label>
                <input
                  type="file"
                  className="rounded"
                  aria-invalid={errors.img ? "true" : "false"}
                  {...register("img", { required: true })}
                  accept=".png, .jpg, .jpeg"
                />
              </div>

            <div className="mb-1 text-center">
              <button
                className=" px-12 mt-20 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
        </Modal>
        </div>
    );
};

export default AddPost;