/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const Register = () => {
  const navigate = useNavigate()
  const [unValid, setUnValid] = useState(false);
  const [is_failed, setFailed] = useState(false);
  const [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const token = localStorage.getItem("token");

  const handleFailed = () => {
    setFailed(true);
    setTimeout(() => {
      setFailed(false);
    }, 3000);
  };

  const validData = e => {
    let isValid;
    if (e.target.name === "password") {
      const minimumChar = e.target.value.length > 6;
      const pattern = /^(?=.*[0-9])/;
      const validPassword = pattern.test(e.target.value);
      isValid = minimumChar && validPassword;
    }
    if (
      e.target.name === "first_name" ||
      e.target.name === "last_name" ||
      e.target.name === "username"
    ) {
      isValid = true;
    }
    if (e.target.name === "email") {
      isValid = true;
    }

    if (isValid) {
      const newUserInfo = { ...users };
      newUserInfo[e.target.name] = e.target.value;
      setUsers(newUserInfo);
    }
    if (!isValid) {
      setUnValid(!unValid);
    }
  };

  const handleSignIn = e => {
    e.preventDefault();
    if (
      users.first_name !== "" &&
      users.last_name !== "" &&
      users.username !== "" &&
      users.email !== "" &&
      users.password !== ""
    ) {
      console.log(users)
      fetch("https://social-platform-y209.onrender.com/register/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((response) => response.json())
      .then((res) => {
          navigate("/login");
          toast.success("Successfully Register!")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-md px-4 mt-28 py-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center">
          {is_failed && (
            <p className="text-red-400">User is Already Registered</p>
          )}

          <h1 className=" mb-2 text-xl font-light sm:text-2xl text-gray-800  dark:text-white">
            Create a new account
          </h1>
          <span className=" text-sm text-gray-500 dark:text-gray-400">
            Already have an account ?
            <NavLink
              to="/login"
              className="text-sm text-blue-500 underline hover:text-blue-700"
            >
              Sign in
            </NavLink>
          </span>
        </div>
        <div className="p-2 mt-8 space-y-4">
          <form onClick={handleSignIn}>
            <div className="flex gap-4 mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  required
                  name="first_name"
                  onBlur={validData}
                  id="create-account-first-name"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="First name"
                />
              </div>
              <div className=" relative ">
                <input
                  type="text"
                  required
                  name="last_name"
                  onBlur={validData}
                  id="create-account-last-name"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  required
                  name="username"
                  onBlur={validData}
                  id="create-account-email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="User Name"
                />
              </div>
            </div>
            <div className="mb-2">
              <div className=" relative ">
                <input
                  type="email"
                  required
                  name="email"
                  onBlur={validData}
                  id="create-account-email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-2">
              <div className=" relative ">
                <input
                  type="password"
                  required
                  name="password"
                  onBlur={validData}
                  id="create-account-pseudo"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Password mast be 6 characters with 2 digits"
                />
                {unValid && (
                  <p className="text-red-500">
                    Minimum 6 characters width 2 digits
                  </p>
                )}
              </div>
            </div>
            <input
            type="submit"
            className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            value="Register"
          />
          </form>
          <div className="w-full my-4"> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
