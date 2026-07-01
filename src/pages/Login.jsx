import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../lib/feedSlice";
import UserCard from "../Componentsmain/userCard"; 
import { AnimatePresence, motion } from "framer-motion"; 

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      // Prevent fetching if we already have a valid array of users
      if (Array.isArray(feed) && feed.length > 0) return;

      const res = await axios.get("https://devtinder-backend-1-usc5.onrender.com/user/feed", {
        withCredentials: true,
      });
      
      // CRITICAL FIX 1: Ensure the response is actually an array before putting it in Redux
      const feedData = res?.data?.message;
      if (Array.isArray(feedData)) {
        dispatch(addFeed(feedData));
      } else {
        console.warn("API did not return an array:", feedData);
        dispatch(addFeed([])); // Fallback to an empty array to prevent crashes
      }
      
    } catch (err) {
      console.error("Error fetching feed:", err);
      // Optional: Dispatch an empty array or an error state to stop the loading spinner
      dispatch(addFeed([])); 
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // CRITICAL FIX 2: Strictly verify it is an array before checking length
  const hasUsers = Array.isArray(feed) && feed.length > 0;

  // Determine if we are still waiting for the initial API response
  // Assuming your initial Redux state for feed is null or undefined
  const isLoading = feed === null || feed === undefined;

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)] overflow-hidden">
      
      <AnimatePresence mode="popLayout">
        {hasUsers ? (
          <UserCard 
            // CRITICAL FIX 3: Use optional chaining (?.) just in case the object is malformed
            key={feed[0]?._id || Math.random().toString()} 
            user={feed[0]} 
          />
        ) : (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl font-bold text-muted-foreground">
              {/* Safely check the loading state */}
              {isLoading ? "Loading..." : "No new developers found!"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Fetching potential matches..." : "Check back later for new connections."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Feed;