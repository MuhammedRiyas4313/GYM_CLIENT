import React, { useState } from "react";
import { ClientLogin } from "../../axios/services/clientServices/clientServices";
import { TrainerLogin } from "../../axios/services/trainerServices/trainerService";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userSchema } from "../../validations/clientLoginValidation";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/userSlice";
import { trainerLogin } from "../../redux/trainerSlice";
import { toast } from "react-toastify";
import Loading from "../loadingSpinner/Loading";
import TrainerVerificationModal from "./TrainerVerificationModal";
import GoogleButtonUser from "../../assets/googleLogin/GoogleButtonUser";
import GoogleButtonTrainer from "../../assets/googleLogin/GoogleButtonTrainer";
import "./Signin.css";

function Signin() {
    
  const [trainerVerifyStatus, setTrainerVerifyStatus] = useState(false);

  const [loader, setLoader] = useState(false);
  const [loginPerson, setLoginPerson] = useState("user");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit() {
    setLoader(true);

    if (loginPerson === "user") {
      const response = await ClientLogin(values);
      if (response?.data?.status === "Login success") {
        setLoader(false);
        dispatch(
          userLogin({ token: response?.data?.token, user: response?.data?.user })
        );
        toast.success(response?.data?.status);
        navigate("/");
      } else if (response?.data?.status === "User is not verified") {
        setLoader(false);
        toast.error(response?.data?.message);
        navigate(`/verification/${response?.data?.data?.userId}`);
      } else {
        setLoader(false);
        toast.error(response?.data?.status);
      }
    } else if (loginPerson === "trainer") {
      console.log(values,'values in trainer login.......')
      const response = await TrainerLogin(values);
      if (response?.status === "Login success") {
        setLoader(false);
        dispatch(trainerLogin({ token: response?.token, trainer: response?.trainer }));
        toast.success(response?.status);
        navigate("/");
      } else if (response?.status === "Trainer not verified") {
        setTrainerVerifyStatus(true);
        setLoader(false);
      } else if(response?.status === "Trainer doesn't exist"){
        setLoader(false);
        toast.error(response?.status);
      }else{
        setLoader(false);
        toast.error(response?.status);
      }
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });

  return (
    <div>
      {trainerVerifyStatus ? (
        <div>
          <TrainerVerificationModal modalShow={setTrainerVerifyStatus} />
        </div>
      ) : (
        <div></div>
      )}
      {loader ? (
        <div className="spinnerouter flex justify-center align-middle">
          <Loading />
        </div>
      ) : (<></>)}
        <div className="login-form">
          <div className="lottie-container relative flex flex-col justify-center min-h-screen overflow-hidden outer">
            <div className="form-data w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
              <div className="flex justify-around">
                <div
                  className={
                    loginPerson == "user"
                      ? "rounded bg-orange-500 p-5"
                      : "bg-white p-5"
                  }
                  onClick={() => setLoginPerson("user")}
                >
                  <h1
                    className={
                      loginPerson == "user"
                        ? "text-lg md:text-2xl font-bold text-center text-white uppercase md:pl-8 md:pr-8"
                        : "text-lg md:pr-8  md:pl-8 md:text-2xl font-bold text-center text-orange-500 uppercase"
                    }
                  >
                    Login User
                  </h1>
                </div>
                <div
                  className={
                    loginPerson == "trainer"
                      ? "rounded bg-orange-500 p-5"
                      : "bg-white p-5"
                  }
                  onClick={() => setLoginPerson("trainer")}
                >
                  <h1
                    className={
                      loginPerson == "trainer"
                        ? "text-lg md:text-2xl font-bold text-center text-white uppercase  md:pl-5  md:pr-5"
                        : "text-lg md:text-2xl md:pr-5  md:pl-5 font-bold text-center text-orange-500 uppercase"
                    }
                  >
                    Login Trainer
                  </h1>
                </div>
              </div>
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    style={{ WebkitAppearance: "none" }}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label
                    for="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
                <a className="text-xs text-purple-600 hover:underline">
                  Forget Password?
                </a>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-orange-700"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                <div className="absolute px-5 bg-white">Or</div>
              </div>
              <div className="flex mt-8 gap-x-2 items-center justify-center">
                {loginPerson === "user" ? (
                  <div className="w-72 h-20">
                    <GoogleButtonUser
                    loginPerson={loginPerson}
                    setTrainerVerifyStatus={setTrainerVerifyStatus}
                    setLoader={setLoader}
                  />
                  </div>
                ) : (
                  <div className="w-72 h-20">
                    <GoogleButtonTrainer
                    loginPerson={loginPerson}
                    setTrainerVerifyStatus={setTrainerVerifyStatus}
                    setLoader={setLoader}
                  />
                  </div>
                )}
              </div>

              <p className="text-xs font-light text-center text-gray-700">
                Don't have an account?
                {loginPerson === "user" ? (
                  <Link to="/clientregister">
                    <p className="font-medium text-orange-500 hover:underline">
                      Register User
                    </p>
                  </Link>
                ) : (
                  <Link to="/trainerregister">
                    <p className="font-medium text-orange-500 hover:underline">
                      Register Trainer
                    </p>
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default Signin;
