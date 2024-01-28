import React,{useState} from 'react';
import './modal.css';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import usePosts from '../../../Hooks/usePosts';
import { AiOutlineRocket } from "react-icons/ai";
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
const AddPost = ({modalIsOpen,closeModal,profile}) => {
  const {refetch} = usePosts();
  const [imageLink, setImageLink] = useState()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();


      const handleImage = () =>{
        const fileInput = document.querySelector('.post-file-input')
        fileInput.click()
        fileInput.onchange = ({target}) => {
         const file = target.files[0]
         const formData = new FormData();
         formData.append("image", file);
         setImageLink(formData)
         toast.success("Image Added");
       }
      }






      const onSubmit = data => {
     
        if(imageLink !== undefined)
        {
          const userId = localStorage.getItem("user_id");
          const user_name = profile.user && profile.user.first_name + ' ' + profile.user.last_name;
         
          fetch(
            "https://api.imgbb.com/1/upload?key=212e3038d6bf0bd9d01b3aa24708a377",
            {
              method: "POST",
              body: imageLink,
            }
          )
            .then(res => res.json())
            .then(result => {
                      const post = {
                        user_name: user_name,
                        content: data.content,
                        img_url: result.data.url,
                        user: userId,
                        profile_avatar: profile.profile_avatar
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
                          refetch();
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
        }
      };


      


    return (
        <div className="ml-32">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          className="post-modal"
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
            placeholder="What's On Your Mind, "
            {...register("content", {
              required: true,
            })}
            aria-invalid={errors.title ? "true" : "false"}
          ></textarea>
        </div>

        <div className="mt-6 border-dashed border-black rounded">
                <div className='text-center '>
                  <AiOutlineRocket className='w-32 text-5xl ml-8 sm:ml-12 md:ml-12'/>
                  <button onClick={handleImage} className='bg-blue-500 px-2 py-1'>Upload Image</button>
                </div>
                <input
                  type="file"
                  className="rounded post-file-input" hidden
                  aria-invalid={errors.img ? "true" : "false"}
                  {...register("img")}
                  accept=".png, .jpg, .jpeg"
                />
              </div>

            <div className="mb-1 text-center">
              <button
                className=" px-12 mt-10 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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