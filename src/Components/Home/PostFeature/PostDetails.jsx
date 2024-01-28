import React from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";

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

const PostDetails = ({modalIsOpen,closeModal,simplePost}) => {
  

 
  return (
    <div className='mt-6'>
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
  <AiOutlineClose
  onClick={closeModal} style={{marginLeft:'350px'}}
  className=" cursor-pointer bg-black rounded-full text-white font-bold  text-4xl -mt-5"
/>
    <div className="max-w-sm mt-2 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                    <div className='flex'>
                      <img className='size-10 rounded-full' src={simplePost.profile_avatar !== null ? simplePost.profile_avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuzji_7v5blhzW4rLy8so6nZAD8u_YuQwPWyBZUZ8QA&s"}  alt="" />
                      <h5 className="mb-2 text-2xl ml-2 -mt-2 font-bold tracking-tight text-gray-900 dark:text-white">{simplePost.user_name}</h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{simplePost.content}</p>
                </div>
                <a href="#">
                    <img className="" style={{width:"500px",height:"300px"}} src={simplePost.img_url} alt="" />
                </a>
            </div>
    </Modal>
    </div>
  );
};

export default PostDetails;