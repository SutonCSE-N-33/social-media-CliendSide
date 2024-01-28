import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [is_failed, setFailed] = useState(false);
  const location = useLocation();
  const handleFailed = () => {
    setFailed(true);
    setTimeout(() => {
      setFailed(false);
    }, 3000);
  };
  let from = location.state?.from?.pathname || "/";

  const handleLogin = data => {
    const users = {
      username: data.username,
      password: data.password,
    };
    // console.log(users)
    if (users.username !== "" && users.password !== "") {
      axios
        .post(
          `https://social-platform-y209.onrender.com/login/?format=json`,
          users,
          {}
        )
        .then(res => {
          console.log(res.data);
          const token = res.data.token;
          const user_id = res.data.user_id;
          const first_name = res.data.first_name;
          const last_name = res.data.last_name;
          const profile_id = res.data.profile_id;
          localStorage.setItem("profile_id", profile_id);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("token", token);
          localStorage.setItem("name", first_name +" "+ last_name);
          

          navigate(from, { replace: true });
          // navigate('/dashboard')
          toast.success("Successfully login!");
        })
        .catch(error => {
          console.log(error);
          handleFailed();
        });
    }
  };

  return (
    <div>
      {is_failed && (
        <p className="text-red-400 text-center font-semibold text-1xl">
          The Username Or Password doesn`t matched{" "}
        </p>
      )}
      <div className="flex flex-col items-center justify-center w-full px-10 pt-10 pb-20 lg:flex-row">
        <div className="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12">
          <div className="relative z-10 flex flex-col items-start justify-start py-5 px-10 bg-white shadow-2xl rounded-xl">
            <h4 className="w-full text-4xl font-medium leading-snug text-gray-600">
              Login
            </h4>
            <form
              className="relative w-full mt-6 space-y-4"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="relative">
                <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-400 bg-white">
                  User Name
                </label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: true })}
                  aria-invalid={errors.username ? "true" : "false"}
                  className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </div>
              <div className="relative">
                <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-400 bg-white">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                  className="block w-full px-4 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  placeholder="password"
                />
              </div>
              <div className="relative">
                <button className="inline-block w-full px-2 py-2 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 ease">
                  Login
                </button>
              </div>
            </form>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                or
              </span>
            </div>
            <div className="text-center block w-full my-2">
              <p className="my-2 text-gray-400">Have Not An Account</p>
              <NavLink
                className='inline-flex items-center px-2 py-2.5 text-sm text-gray-600 font-medium text-center outline-blue-700 hover:text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"'
                to="/register"
              >
                Register
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
          {/* svg1 */}
          <svg
            className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-gray-200 fill-current"
            viewBox="0 0 91 91"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <g fillRule="nonzero">
                <g>
                  <g>
                    <circle cx="3.261" cy="3.445" r="2.72"></circle>
                    <circle cx="15.296" cy="3.445" r="2.719"></circle>
                    <circle cx="27.333" cy="3.445" r="2.72"></circle>
                    <circle cx="39.369" cy="3.445" r="2.72"></circle>
                    <circle cx="51.405" cy="3.445" r="2.72"></circle>
                    <circle cx="63.441" cy="3.445" r="2.72"></circle>
                    <circle cx="75.479" cy="3.445" r="2.72"></circle>
                    <circle cx="87.514" cy="3.445" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 12)">
                    <circle cx="3.261" cy="3.525" r="2.72"></circle>
                    <circle cx="15.296" cy="3.525" r="2.719"></circle>
                    <circle cx="27.333" cy="3.525" r="2.72"></circle>
                    <circle cx="39.369" cy="3.525" r="2.72"></circle>
                    <circle cx="51.405" cy="3.525" r="2.72"></circle>
                    <circle cx="63.441" cy="3.525" r="2.72"></circle>
                    <circle cx="75.479" cy="3.525" r="2.72"></circle>
                    <circle cx="87.514" cy="3.525" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 24)">
                    <circle cx="3.261" cy="3.605" r="2.72"></circle>
                    <circle cx="15.296" cy="3.605" r="2.719"></circle>
                    <circle cx="27.333" cy="3.605" r="2.72"></circle>
                    <circle cx="39.369" cy="3.605" r="2.72"></circle>
                    <circle cx="51.405" cy="3.605" r="2.72"></circle>
                    <circle cx="63.441" cy="3.605" r="2.72"></circle>
                    <circle cx="75.479" cy="3.605" r="2.72"></circle>
                    <circle cx="87.514" cy="3.605" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 36)">
                    <circle cx="3.261" cy="3.686" r="2.72"></circle>
                    <circle cx="15.296" cy="3.686" r="2.719"></circle>
                    <circle cx="27.333" cy="3.686" r="2.72"></circle>
                    <circle cx="39.369" cy="3.686" r="2.72"></circle>
                    <circle cx="51.405" cy="3.686" r="2.72"></circle>
                    <circle cx="63.441" cy="3.686" r="2.72"></circle>
                    <circle cx="75.479" cy="3.686" r="2.72"></circle>
                    <circle cx="87.514" cy="3.686" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 49)">
                    <circle cx="3.261" cy="2.767" r="2.72"></circle>
                    <circle cx="15.296" cy="2.767" r="2.719"></circle>
                    <circle cx="27.333" cy="2.767" r="2.72"></circle>
                    <circle cx="39.369" cy="2.767" r="2.72"></circle>
                    <circle cx="51.405" cy="2.767" r="2.72"></circle>
                    <circle cx="63.441" cy="2.767" r="2.72"></circle>
                    <circle cx="75.479" cy="2.767" r="2.72"></circle>
                    <circle cx="87.514" cy="2.767" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 61)">
                    <circle cx="3.261" cy="2.846" r="2.72"></circle>
                    <circle cx="15.296" cy="2.846" r="2.719"></circle>
                    <circle cx="27.333" cy="2.846" r="2.72"></circle>
                    <circle cx="39.369" cy="2.846" r="2.72"></circle>
                    <circle cx="51.405" cy="2.846" r="2.72"></circle>
                    <circle cx="63.441" cy="2.846" r="2.72"></circle>
                    <circle cx="75.479" cy="2.846" r="2.72"></circle>
                    <circle cx="87.514" cy="2.846" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 73)">
                    <circle cx="3.261" cy="2.926" r="2.72"></circle>
                    <circle cx="15.296" cy="2.926" r="2.719"></circle>
                    <circle cx="27.333" cy="2.926" r="2.72"></circle>
                    <circle cx="39.369" cy="2.926" r="2.72"></circle>
                    <circle cx="51.405" cy="2.926" r="2.72"></circle>
                    <circle cx="63.441" cy="2.926" r="2.72"></circle>
                    <circle cx="75.479" cy="2.926" r="2.72"></circle>
                    <circle cx="87.514" cy="2.926" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 85)">
                    <circle cx="3.261" cy="3.006" r="2.72"></circle>
                    <circle cx="15.296" cy="3.006" r="2.719"></circle>
                    <circle cx="27.333" cy="3.006" r="2.72"></circle>
                    <circle cx="39.369" cy="3.006" r="2.72"></circle>
                    <circle cx="51.405" cy="3.006" r="2.72"></circle>
                    <circle cx="63.441" cy="3.006" r="2.72"></circle>
                    <circle cx="75.479" cy="3.006" r="2.72"></circle>
                    <circle cx="87.514" cy="3.006" r="2.719"></circle>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          {/* svg2 */}
          <svg
            className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-blue-600 fill-current"
            viewBox="0 0 91 91"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <g fillRule="nonzero">
                <g>
                  <g>
                    <circle cx="3.261" cy="3.445" r="2.72"></circle>
                    <circle cx="15.296" cy="3.445" r="2.719"></circle>
                    <circle cx="27.333" cy="3.445" r="2.72"></circle>
                    <circle cx="39.369" cy="3.445" r="2.72"></circle>
                    <circle cx="51.405" cy="3.445" r="2.72"></circle>
                    <circle cx="63.441" cy="3.445" r="2.72"></circle>
                    <circle cx="75.479" cy="3.445" r="2.72"></circle>
                    <circle cx="87.514" cy="3.445" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 12)">
                    <circle cx="3.261" cy="3.525" r="2.72"></circle>
                    <circle cx="15.296" cy="3.525" r="2.719"></circle>
                    <circle cx="27.333" cy="3.525" r="2.72"></circle>
                    <circle cx="39.369" cy="3.525" r="2.72"></circle>
                    <circle cx="51.405" cy="3.525" r="2.72"></circle>
                    <circle cx="63.441" cy="3.525" r="2.72"></circle>
                    <circle cx="75.479" cy="3.525" r="2.72"></circle>
                    <circle cx="87.514" cy="3.525" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 24)">
                    <circle cx="3.261" cy="3.605" r="2.72"></circle>
                    <circle cx="15.296" cy="3.605" r="2.719"></circle>
                    <circle cx="27.333" cy="3.605" r="2.72"></circle>
                    <circle cx="39.369" cy="3.605" r="2.72"></circle>
                    <circle cx="51.405" cy="3.605" r="2.72"></circle>
                    <circle cx="63.441" cy="3.605" r="2.72"></circle>
                    <circle cx="75.479" cy="3.605" r="2.72"></circle>
                    <circle cx="87.514" cy="3.605" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 36)">
                    <circle cx="3.261" cy="3.686" r="2.72"></circle>
                    <circle cx="15.296" cy="3.686" r="2.719"></circle>
                    <circle cx="27.333" cy="3.686" r="2.72"></circle>
                    <circle cx="39.369" cy="3.686" r="2.72"></circle>
                    <circle cx="51.405" cy="3.686" r="2.72"></circle>
                    <circle cx="63.441" cy="3.686" r="2.72"></circle>
                    <circle cx="75.479" cy="3.686" r="2.72"></circle>
                    <circle cx="87.514" cy="3.686" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 49)">
                    <circle cx="3.261" cy="2.767" r="2.72"></circle>
                    <circle cx="15.296" cy="2.767" r="2.719"></circle>
                    <circle cx="27.333" cy="2.767" r="2.72"></circle>
                    <circle cx="39.369" cy="2.767" r="2.72"></circle>
                    <circle cx="51.405" cy="2.767" r="2.72"></circle>
                    <circle cx="63.441" cy="2.767" r="2.72"></circle>
                    <circle cx="75.479" cy="2.767" r="2.72"></circle>
                    <circle cx="87.514" cy="2.767" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 61)">
                    <circle cx="3.261" cy="2.846" r="2.72"></circle>
                    <circle cx="15.296" cy="2.846" r="2.719"></circle>
                    <circle cx="27.333" cy="2.846" r="2.72"></circle>
                    <circle cx="39.369" cy="2.846" r="2.72"></circle>
                    <circle cx="51.405" cy="2.846" r="2.72"></circle>
                    <circle cx="63.441" cy="2.846" r="2.72"></circle>
                    <circle cx="75.479" cy="2.846" r="2.72"></circle>
                    <circle cx="87.514" cy="2.846" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 73)">
                    <circle cx="3.261" cy="2.926" r="2.72"></circle>
                    <circle cx="15.296" cy="2.926" r="2.719"></circle>
                    <circle cx="27.333" cy="2.926" r="2.72"></circle>
                    <circle cx="39.369" cy="2.926" r="2.72"></circle>
                    <circle cx="51.405" cy="2.926" r="2.72"></circle>
                    <circle cx="63.441" cy="2.926" r="2.72"></circle>
                    <circle cx="75.479" cy="2.926" r="2.72"></circle>
                    <circle cx="87.514" cy="2.926" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 85)">
                    <circle cx="3.261" cy="3.006" r="2.72"></circle>
                    <circle cx="15.296" cy="3.006" r="2.719"></circle>
                    <circle cx="27.333" cy="3.006" r="2.72"></circle>
                    <circle cx="39.369" cy="3.006" r="2.72"></circle>
                    <circle cx="51.405" cy="3.006" r="2.72"></circle>
                    <circle cx="63.441" cy="3.006" r="2.72"></circle>
                    <circle cx="75.479" cy="3.006" r="2.72"></circle>
                    <circle cx="87.514" cy="3.006" r="2.719"></circle>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Login;