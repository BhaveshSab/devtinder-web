import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../lib/userSlice";
import EditProfile from '../Componentsmain/editProfile';
import axios from "axios";

const Profile = () => {
  const user = useSelector((store) => store.user?.message || store.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    gender: "",
    about: "",
    skills: "",
    
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        avatar: user.avatar || "",
        gender: user.gender || "",
        about: user.about || "",
        skills: user.skills ? user.skills.join(", ") : "",
      });
    }
  }, [user]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      };

      const res = await axios.patch("https://devtinder-backend-1-usc5.onrender.com/profile/edit", payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
      setMessage(res.data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    }
  };
   
   
  return (
    <div>
      <EditProfile user={user} formData={formData} handleChange={handleChange} handleSave={handleSave} message={message} />
    </div>
  )
}

export default Profile