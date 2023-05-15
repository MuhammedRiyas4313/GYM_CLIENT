import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getTrainerDetails,
  getTrainerCourseList,
} from "../../axios/services/clientServices/clientServices";
import { createConversation } from '../../axios/services/chat/clientChat'
import TrainerCourseList from "./TrainerCourseList";
import { useSelector } from "react-redux";

function TrainerDetail() {  


  const location  = useLocation()
  const navigate = useNavigate()


  const Trainer = useSelector((state) => state.trainerReducer.trainer);

  const trainerId = location.state?.trainerId
  const UserDetails = useSelector((state) => state.userReducer.user);

  const clientId = UserDetails?.user?._id

  const viewTop = useRef()

  const [option, setOption] = useState(false);
  const [trainerDetails, setTrainerDetails] = useState({});
  const [courseList, setCourseList] = useState([]);

  function options() {
    setOption((state) => !state);
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    return formated;
  }

  useEffect(() => {
  }, [option]);

  useEffect(()=>{
    viewTop?.current?.scrollIntoView()
  },[])

  useEffect(() => {
    getTrainerDetails(trainerId).then((res) => {
      setTrainerDetails(res?.data);
    });
    getTrainerCourseList(trainerId).then((res) => {
      setCourseList(res?.data);
    });
  }, []);
  
  async function message() {
    console.log("message calling");
    const response = await createConversation(trainerId,clientId)
    navigate('/client/chat',{state:{trainerId:trainerId,clientId:clientId}}) 
  }



  return (
    <div ref={viewTop}>
      
      <div className="pb-10 mb-10">
        <div className="container ">
          <div className="md:flex no-wrap md:-mx-2 pt-24 md:pt-24 md:p-10">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-gray-100 p-3">
                <div className="image overflow-hidden flex align-middle justify-center mt-10">
                  <img
                    className="rounded w-64 h-72 "
                    src={trainerDetails?.profile}
                    alt="Extra large avatar"
                  ></img>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 mt-3 mb-3 flex justify-center uppercase">
                  {trainerDetails?.fname}&nbsp;
                </h1>
                <h3 className="text-gray-600 font-lg text-center text-semibold leading-6">
                  Trainer at GYM FITNESS Company Inc.
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  {/* <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                    </span>
                  </li> */}
                  <li className="flex items-center py-3">
                    <span>Rating </span>
                    <span className="ml-auto">⭐⭐⭐⭐</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {formateDate(trainerDetails?.createdAt)}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span className="mr-5">Email</span>
                    <span className="ml-auto break-words">
                      {trainerDetails?.email}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Gender</span>
                    <span className="ml-auto">{trainerDetails?.gender}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
              {!Trainer?.trainer ? (
                <div className="bg-gray-100 shadow-sm rounded-sm md:p-5">
                  <div className="flex flex-wrap justify-end font-semibold text-gray-900">
                    <div className="dropouter flex justify-end">
                      <div className="dropdown md:dropdown-end  ">
                        <label
                          tabIndex={1}
                          className="btn m-1 btn-circle swap swap-rotate bg-orange-500"
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            onClick={options}
                          />

                          <svg
                            className="swap-off fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512"
                          >
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                          </svg>

                          <svg
                            className="swap-on fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512"
                          >
                            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                          </svg>
                        </label>
                        {option ? (
                          <div className="dropdownlist">
                            <ul
                              tabIndex={1}
                              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li onClick={message}>
                                <a className="text-black">Message</a>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="my-4"></div>

              <div className="bg-gray-100">
                <div className="flex justify-between align-middle font-bold text-3xl p-8">
                  Courses
                </div>
                <TrainerCourseList courseList={courseList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetail;
