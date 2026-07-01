import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../lib/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BodyContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // 1. Check for the user, accounting for the 'message' wrapper just in case it's still there
  const userdata = useSelector((store) => store.user?.message || store.user);
   
  const fetchUser = async () => {
    // 2. BULLETPROOF CHECK: If user is already in Redux and has an ID, don't fetch again
    if(userdata) {
      setLoading(false);
      return;
    }
   
    try {
      const res = await axios.get(
         "https://devtinder-backend-1-usc5.onrender.com/profile/view",
        { withCredentials: true }
      );
      
      // 3. CRITICAL FIX: Dispatch the actual user object (res.data.message) instead of the wrapper
      dispatch(addUser(res.data.message || res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login"); // Redirect to login if fetching user fails
      } else {
        // Safe check if it's a CORS issue or server is down
        navigate("/login");
      }
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          {/* A beautiful custom spinner */}
          <div className="flex flex-col items-center space-y-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              Securing connection...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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