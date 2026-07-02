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
      if (Array.isArray(feed) && feed.length > 0) return;

      const res = await axios.get("https://devtinder-backend-1-usc5.onrender.com/user/feed", {
        withCredentials: true,
      });
      
      const feedData = res?.data?.message;
      
      if (Array.isArray(feedData)) {
        dispatch(addFeed(feedData));
      } else {
        dispatch(addFeed([]));
      }
      
    } catch (err) {
      console.error("Error fetching feed:", err);
      dispatch(addFeed([]));
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const hasUsers = Array.isArray(feed) && feed.length > 0;
  const isLoading = !Array.isArray(feed); 

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)] overflow-hidden">
      <AnimatePresence mode="popLayout">
        {hasUsers ? (
          <UserCard 
            key={feed[0]?._id || "fallback-key"} 
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
              {isLoading ? "Loading..." : "No new developers found!"}
            </h2>
            <p className="text-sm text-muted-foreground">Check back later for new connections.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feed;