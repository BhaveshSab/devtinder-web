import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../lib/feedSlice";
// Ensure this path matches your actual folder structure exactly!
import UserCard from "../Componentsmain/userCard"; 

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;

      const res = await axios.get("http://localhost:3000/user/feed", {
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

  // Check if feed is null/undefined or empty array
  const hasUsers = feed && feed.length > 0;

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
      {hasUsers ? (
        // Use optional chaining just in case
        <UserCard 
          user={feed[0]} 
          onPass={() => console.log("Passed")}
          onConnect={() => console.log("Connected")}
        />
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-muted-foreground">
            {feed === null ? "Loading..." : "No new developers found!"}
          </h2>
          <p className="text-sm text-muted-foreground">Check back later for new connections.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;