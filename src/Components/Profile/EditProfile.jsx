import React from 'react';
import { useForm } from "react-hook-form";
import '../Home/PostFeature/modal.css';
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

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
const EditProfile = ({profile,closeProfileModel, profileModalIsOpen,setProfile}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
                
      
      const handleImage = () =>{
       const fileInput = document.querySelector('.file-input')
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
                    const updateImg = {
                      gender: profile.gender,
                      address: profile.address,
                      date_of_birth: profile.date_of_birth,
                      profile_avatar: result.data.url,
                      user: {
                        first_name: profile.user.first_name,
                        last_name: profile.user.last_name,
                    }
                    };
                    console.log('updateImage',updateImg);
                    const token = localStorage.getItem("token");
                    const profile_id = localStorage.getItem("profile_id");
                    const apiUrl = `https://social-platform-y209.onrender.com/users/${profile_id}/`;
                    const axios_instance = axios.create({
                      headers: {
                        Authorization: `token ${token}`,
                      },
                    });
                    axios_instance
                      .put(apiUrl, updateImg)
                      .then(response => {
                        setProfile(updateImg);
                      })
                      .catch(error => {
                        console.error(error);
                        toast.error("Failed to Profile Update!");
                      });
                  })
          .catch(error => {
            console.error("Error:", error);
          });
      }
       
      }
     


      const onSubmit = data => {
        const userProfile = {
          gender: data.gender,
          date_of_birth: data.date_of_birth,
          address: data.address,
          profile_avatar: profile.profile_avatar,
          user: {
            first_name: data.first_name,
            last_name: data.last_name,
          },
        };
        const token = localStorage.getItem("token");
        const profile_id = localStorage.getItem("profile_id");
        const apiUrl = `https://social-platform-y209.onrender.com/users/${profile_id}/`;
        const axios_instance = axios.create({
          headers: {
            Authorization: `token ${token}`,
          },
        });
        axios_instance
          .put(apiUrl, userProfile)
          .then(response => {
            setProfile(userProfile);
            closeProfileModel();
            toast.success("Successfully Profile Updated!");
          })
          .catch(error => {
            console.error(error);
            toast.error("Failed to Profile Update!");
          });
      };
    return (
        <div>
        <Modal
        isOpen={profileModalIsOpen}
        onRequestClose={closeProfileModel}
        style={customStyles}
        contentLabel="Example Modal"
        className="profile-modal"
        >
        <div className="my-5">
        {/* Row */}
        <div className="">
          {/* Col */}
          <div className="w-full px-6 pb-1 h-full rounded-lg lg:rounded-l-none bg-gray-100">
            <div className="flex justify-between">
              <h3 className="pt-2 md:pt-4 text-xl md:text-2xl text-center text-gray-600">
                Update Profile
              </h3>
              <AiOutlineClose
                onClick={closeProfileModel}
                className="text-gray-600 cursor-pointer font-bold text-4xl mt-2"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded">
            <div className="mb-1 md:flex">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block mb-2 text-sm font-bold text-gray-600"
                htmlFor="firstName"
              >
              <img onClick={handleImage} className='size-16 sm:size-24 md:size-24 cursor-pointer rounded-full ml-12' src={profile.profile_avatar !== null ? profile.profile_avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"}  alt="" />
              </label>
              <input
                className="w-52 px-3 py-2 file-input text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="img"
                type="file" hidden
                {...register("img")}
              />
            </div>
          </div>

            <div className="mb-1 flex md:flex">
                <div className="mb-2 sm:mb-4 md:mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-600"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="w-40 sm:w-52 md:w-52 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    defaultValue={profile.user && profile.user.first_name}
                    {...register("first_name", { required: true })}
                  />
                </div>
                <div className="ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-600"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-40 sm:w-52 md:w-52 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    defaultValue={profile.user && profile.user.last_name}
                    {...register("last_name", { required: true })}
                  />
                </div>
              </div>

              <div className="mb-1 flex md:flex">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-600"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    className="w-40 sm:w-52 md:w-52 px-12 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="gender"
                    id="gender"
                    type="text"
                    aria-invalid={errors.gender ? "true" : "false"}
                    defaultValue={profile.gender}
                    {...register("gender", { required: true })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-600"
                    htmlFor="date_of_birth"
                  >
                    Date of Birth
                  </label>
                  <input
                    className="w-40 sm:w-52 md:w-52 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="date_of_birth"
                    type="date"
                    aria-invalid={errors.date_of_birth ? "true" : "false"}
                    defaultValue={profile.date_of_birth}
                    {...register("date_of_birth", { required: true })}
                  />
                </div>
              </div>

           
              <div className="mb-1 md:flex">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-600"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="w-40 sm:w-52 md:w-52 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    aria-invalid={errors.current_address ? "true" : "false"}
                    defaultValue={profile.address}
                    {...register("address", { required: true })}
                  />
                </div>
            
              </div>
              

              <div className="my-6 text-center">
                <button
                  className=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </Modal>
        </div>
    );
};

export default EditProfile;