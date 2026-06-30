import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../lib/feedSlice";
import UserCard from "../Componentsmain/userCard"; 
import { AnimatePresence, motion } from "framer-motion"; // Added 'motion' here! // 1. Import AnimatePresence


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;

      const res = await axios.get("https://devtinder-backend-1-usc5.onrender.com/user/feed", {
        withCredentials: true,
      });
      
      dispatch(addFeed(res.data.message));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const hasUsers = feed && feed.length > 0;

  return (
    // 2. Added overflow-hidden to prevent scrollbars during swipe animations
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)] overflow-hidden">
      
      {/* 3. Wrap the conditional logic in AnimatePresence */}
      <AnimatePresence mode="popLayout">
        {hasUsers ? (
          <UserCard 
            // 4. CRITICAL: The key tells Framer Motion when a specific card is removed
            key={feed[0]._id} 
            user={feed[0]} 
            // 5. Removed onPass and onConnect props since the card now handles its own Redux dispatch
          />
        ) : (
          // 6. Added a motion key to the empty state so it fades in nicely too (optional but recommended)
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl font-bold text-muted-foreground">
              {feed === null ? "Loading..." : "No new developers found!"}
            </h2>
            <p className="text-sm text-muted-foreground">Check back later for new connections.</p>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Feed;