import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatar1 from "../../../assets/images/profileLogo.png";
import { getClients } from "../../../axios/services/adminServices/adminServices";
import { useNavigate } from "react-router-dom";

function UsersList() {

  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  const adminId = AdminDetails?.admin?._id
  const token = AdminDetails?.token

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getClients(token).then((res) => {
      setUsers(res.data);
    });
  }, []);

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    return formated;
  }

  function viewDetails(userId) {
    navigate("/admin/userdetails", { state: { userId: userId } });
  }

  function blockStatus() {
    console.log("block user and unblock");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center md:justify-between p-6 bg-gray-900 dark:bg-gray-900 md:ml-64">
        <h3 className="md:text-3xl text-lg text-white font-bold">Users</h3>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here"
            required
          ></input>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md md:ml-64">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Joined
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Verification Status
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((val) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <img
                          src={val.profile ? val.profile : avatar1}
                          className="object-cover h-12 w-12 rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {val.fname}
                        </div>
                        <div className="font-normal text-gray-500">
                          {val.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{formateDate(val.createdAt)}</td>
                    <td className="px-6 py-4">{val.gender}</td>
                    <td className=" text-center">
                      {val.isVerified ? (
                        <div>
                          <span class="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                            Verified
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-800">
                            Not Verified
                          </span>
                        </div>
                      )}
                    </td>
                    <td className=" text-center">
                      {!val.isBlocked ? (
                        <div>
                          <span class="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-800">
                            Blocked
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {val.isBlocked ? (
                        <button
                          type="button"
                          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          onClick={() => {
                            blockStatus(val.isBlocked, val._id);
                          }}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => {
                            blockStatus(val.isBlocked, val._id);
                          }}
                        >
                          Block
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          viewDetails(val._id);
                        }}
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline border-0"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
