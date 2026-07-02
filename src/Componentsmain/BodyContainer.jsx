import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../lib/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BodyContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userdata = useSelector((store) => store.user?.message || store.user);
    
  const fetchUser = async () => {
    if(userdata) return;
    
    try {
      const res = await axios.get(
         "https://devtinder-backend-1-usc5.onrender.com/profile/view",
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data.message || res.data));
    } catch (err) {
      if(err.response.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user:", err);
    }
  };
   
  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <NavBar />
      <main className="flex-1 flex items-center justify-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BodyContainer;