import React, { useEffect, useState } from "react";

import { FaList } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { GrWheelchairActive } from "react-icons/gr";

import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "Tasks",
      icon: <FaList />,
      link: "/",
    },
    {
      title: "Priority",
      icon: <MdDoubleArrow />,
      link: "/importantTasks",
    },
    {
      title: "Finished",
      icon: <TiTick />,
      link: "/completedTasks",
    },
    {
      title: "Active",
      icon: <GrWheelchairActive />,
      link: "/incompletedTasks",
    },
  ];
  const [Data, setData] = useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${window.location.origin}/api/v2/get-all-tasks`,
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  });

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-800">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div className="">
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-purple-800 p-2 rounded transition-all duration-300"
          >
            {items.icon}&nbsp; {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-teal-800 w-full p-2 rounded hover:bg-teal-700 transition-all duration-300" onClick={logout}>
          Log Out{" "}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
