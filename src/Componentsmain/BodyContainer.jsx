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
  
  // 1. Check for the user, accounting for the 'message' wrapper just in case it's still there
  const userdata = useSelector((store) => store.user?.message || store.user);
   
  const fetchUser = async () => {
    // 2. BULLETPROOF CHECK: If user is already in Redux and has an ID, don't fetch again
    if(userdata) return;
   
    try {
      const res = await axios.get(
         "http://localhost:3000/profile/view",
        { withCredentials: true }
      );
      
      // 3. CRITICAL FIX: Dispatch the actual user object (res.data.message) instead of the wrapper
      dispatch(addUser(res.data.message || res.data));
    } catch (err) {
      if(err.response.status === 401) {
        navigate("/login"); // Redirect to login if fetching user fails
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